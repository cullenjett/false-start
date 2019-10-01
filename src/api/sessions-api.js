export const sessionsApi = (http) => {
  return {
    signIn: ({ email, password }) => {
      return http.get(`/user?email=${email}`);
    },
  };
};
