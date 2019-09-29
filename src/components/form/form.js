import React, { useContext, useMemo, useReducer, useRef } from 'react';

const FormContext = React.createContext();

const initialState = {
  isSubmitting: false,
  submitFailed: false,
  formValues: {},
  formErrors: {},
};

const reducer = (validate) => (state, action) => {
  console.log({ state, action });
  switch (action.type) {
    case 'CHANGE_FIELD':
      const newFormValues = {
        ...state.formValues,
        [action.name]: action.value,
      };

      return {
        ...state,
        formValues: newFormValues,
        formErrors: validate(newFormValues),
      };
    case 'SUBMIT_START':
      return {
        ...state,
        isSubmitting: true,
      };
    case 'SUBMIT_FAILED':
      return {
        ...state,
        submitFailed: true,
        isSubmitting: false,
        formErrors: {
          ...state.formErrors,
          ...action.errors,
        },
      };
    case 'SUBMIT_SUCCESSFUL':
      return {
        ...state,
        submitFailed: false,
        isSubmitting: false,
      };
    default:
      throw new Error(
        `Forgot to handle ${action.type} actions in form reducer`
      );
  }
};

const Form = ({ onSubmit, validate, children }) => {
  /**
   * We use a ref to hold the composed validate function to prevent
   * odd re-renders during the first dispatched event
   */
  const formReducer = useRef(reducer(validate));
  const [state, dispatch] = useReducer(formReducer.current, {
    ...initialState,
    formErrors: validate(initialState.formValues),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: 'SUBMIT_START' });

    for (const fieldName in state.formErrors) {
      if (Boolean(state.formErrors[fieldName])) {
        dispatch({ type: 'SUBMIT_FAILED' });
        return;
      }
    }

    const result = onSubmit(state.formValues);

    if (result && result.then) {
      result.then((errors) => {
        if (errors) {
          dispatch({ type: 'SUBMIT_FAILED', errors });
        } else {
          dispatch({ type: 'SUBMIT_SUCCESSFUL' });
        }
      });
    } else {
      dispatch({ type: 'SUBMIT_SUCCESSFUL' });
    }
  };

  const ctx = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state]);

  return (
    <FormContext.Provider value={ctx}>
      <form onSubmit={handleSubmit} noValidate>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;

export const Field = (props) => {
  const {
    name,
    type,
    component: Component,
    disabled,
    label,
    autoComplete,
  } = props;
  const { state, dispatch } = useContext(FormContext);

  const value = state.formValues[name] || '';
  const error = state.formErrors[name];
  const submitFailed = state.submitFailed;
  const dataTestID = props['data-testid'];

  const component = useMemo(() => {
    const componentProps = {
      label,
      input: {
        type,
        name,
        value,
        disabled,
        autoComplete,
        id: name,
        'data-testid': dataTestID,
        onChange: (e) => {
          dispatch({
            type: 'CHANGE_FIELD',
            name,
            value: e.target.value,
          });
        },
      },
      meta: {
        error,
        submitFailed,
      },
    };

    return <Component {...componentProps} />;
  }, [
    name,
    type,
    dispatch,
    value,
    error,
    submitFailed,
    disabled,
    dataTestID,
    label,
    autoComplete,
  ]);

  return component;
};
