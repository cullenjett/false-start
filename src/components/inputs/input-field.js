import React from 'react';

const InputField = (props) => {
  const hasError = props.meta.submitFailed && props.meta.error;

  return (
    <div>
      <label htmlFor={props.input.name}>{props.label}</label>
      <br />
      <input
        id={props.input.name}
        {...props.input}
        style={{ borderColor: hasError && 'tomato' }}
      />
      {hasError && <p style={{ color: 'tomato' }}>{props.meta.error}</p>}
    </div>
  );
};

export default InputField;
