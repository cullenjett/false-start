import { api } from '../api';

export const signIn = ({ email, password }) => (dispatch) => {
  return api.sessions.signIn({ email, password }).then((authToken) => {
    dispatch({
      type: 'CREATE_SESSION',
      authToken,
    });
  });
};
