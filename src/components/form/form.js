import React, { useMemo, useReducer, useRef } from 'react';

export const FormContext = React.createContext();

const initialState = {
  isSubmitting: false,
  submitFailed: false,
  formValues: {},
  formErrors: {},
};

const reducer = (validate) => (state, action) => {
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

const Form = ({ onSubmit, validate, children, ...rest }) => {
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

    onSubmit(state.formValues).then((errors) => {
      if (errors) {
        dispatch({ type: 'SUBMIT_FAILED', errors });
      } else {
        dispatch({ type: 'SUBMIT_SUCCESSFUL' });
      }
    });
  };

  const ctx = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state]);

  return (
    <FormContext.Provider value={ctx}>
      <form noValidate {...rest} onSubmit={handleSubmit}>
        {children(state)}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
