import React from 'react';
import cx from 'classnames';

import styles from './input-field.module.css';

const InputField = (props) => {
  const hasError = props.meta.submitFailed && props.meta.error;

  return (
    <div>
      <label htmlFor={props.input.name} className={styles.label}>
        {props.label}
      </label>

      <input
        {...props.input}
        id={props.input.name}
        className={cx(styles.input, props.input.className, {
          [`${styles.inputError}`]: hasError,
        })}
      />
      {hasError && <p className={styles.errorMsg}>{props.meta.error}</p>}
    </div>
  );
};

export default InputField;
