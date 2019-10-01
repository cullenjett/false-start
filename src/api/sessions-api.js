const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const sessionsApi = (http) => {
  return {
    signIn: ({ email, password }) => {
      return sleep(1000).then(() => 'ABC_123');
    },
  };
};
