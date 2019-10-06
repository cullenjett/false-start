import { sessionReducer } from '../session-reducer';

describe('sessionReducer', () => {
  it('returns the correct initial state', () => {
    expect(sessionReducer(undefined, {})).toEqual(null);
  });

  it('handles CREATE_SESSION', () => {
    const action = {
      type: 'CREATE_SESSION',
      authToken: 'ABC',
    };

    expect(sessionReducer(undefined, action)).toEqual('ABC');
  });
});
