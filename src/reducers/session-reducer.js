const initialState = false;

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return true;
    case 'SIGN_OUT':
      return false;
    default:
      return state;
  }
};
