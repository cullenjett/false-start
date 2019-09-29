import React, { useContext } from 'react';

import { FormContext } from './form';

const Field = ({ name, label, component: Component, ...rest }) => {
  const { state, dispatch } = useContext(FormContext);

  const value = state.formValues[name] || '';
  const error = state.formErrors[name];
  const submitFailed = state.submitFailed;

  const componentProps = {
    label,
    input: {
      ...rest,
      name,
      value,
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
};

export default Field;
