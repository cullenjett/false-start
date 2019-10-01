import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { signIn } from '../session-actions';
import { api } from '../../api';

jest.mock('../../api');

const makeMockStore = configureStore([thunk]);

const setup = () => {
  const store = makeMockStore();

  api.sessions.signIn.mockResolvedValue('MOCK_AUTH_TOKEN');

  return {
    store,
  };
};

describe('session actions', () => {
  describe('signIn()', () => {
    it('calls api.sessions.signIn with the email and password', async () => {
      const { store } = setup();
      const email = 'test@example.com';
      const password = 'abc123';

      await store.dispatch(signIn({ email, password }));

      expect(api.sessions.signIn).toHaveBeenCalledWith({
        email,
        password,
      });
    });

    it('dispatches CREATE_SESSION', async () => {
      const { store } = setup();
      const email = 'test@example.com';
      const password = 'abc123';

      await store.dispatch(signIn({ email, password }));

      expect(store.getActions()).toMatchInlineSnapshot(`
        Array [
          Object {
            "authToken": "MOCK_AUTH_TOKEN",
            "type": "CREATE_SESSION",
          },
        ]
      `);
    });
  });
});
