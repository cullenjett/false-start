import { api } from '../../api';
import { storage } from '../../utils/storage';

export const signIn = ({ email, password }) => async (dispatch) => {
  const authToken = await api.sessions.signIn({ email, password });

  dispatch({
    type: 'CREATE_SESSION',
    authToken,
  });

  return storage.set('AUTH_TOKEN', authToken);
};
