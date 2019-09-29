import React, { useContext } from 'react';

import { FormContext } from './form';

const Field = ({ name, label, disabled, component: Component, ...rest }) => {
  const { state, dispatch } = useContext(FormContext);

  const value = state.formValues[name] || '';
  const error = state.formErrors[name];

  const componentProps = {
    label,
    input: {
      ...rest,
      name,
      value,
      disabled: disabled || state.isSubmitting,
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
      submitFailed: state.submitFailed,
    },
  };

  return <Component {...componentProps} />;
};

export default Field;
