export const valid = (...validatorFuncs) => (value) => {
  const errorString = validatorFuncs.reduce((error, validatorFunc) => {
    return error || validatorFunc(value) || '';
  }, '');

  return errorString !== '' ? errorString : undefined;
};

export const email = (customMsg) => (value) => {
  const emailRegex = new RegExp(/.+@.+\..+/);

  if (!emailRegex.test(value)) {
    return customMsg || 'Invalid email format';
  }
};

export const required = (customMsg) => (value) => {
  let error;

  if (value === undefined || value === null || value === '') {
    error = customMsg || 'Required';
  }

  return error;
};
