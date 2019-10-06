const initialState = null;

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      return action.authToken;
    case 'DESTROY_SESSION':
      return initialState;
    default:
      return state;
  }
};

// Selectors

export const selectIsSignedIn = (state) => {
  return Boolean(state.session);
};
