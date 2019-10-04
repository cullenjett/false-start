export const log = (data) => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  const logData = {
    ...data,
    date: new Date().toISOString(),
  };

  if (process.env.NODE_ENV !== 'production') {
    console.log(logData);
    return;
  }
};
