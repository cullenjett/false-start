export const valid = (...validatorFuncs) => (value) => {
  const errorString = validatorFuncs.reduce((error, validatorFunc) => {
    return error || validatorFunc(value) || '';
  }, '');

  return errorString !== '' ? errorString : undefined;
};

export const email = (customMsg) => (value) => {
  const emailRegex = new RegExp(/.+@.+\..+/);
  let error;

  if (!emailRegex.test(value)) {
    error = customMsg || 'Invalid email format';
  }

  return error;
};

export const required = (customMsg) => (value) => {
  let error;

  if (value === undefined || value === null || value === '') {
    error = customMsg || 'Required';
  }

  return error;
};
