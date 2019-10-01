const initialState = false;

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      return true;
    case 'DESTROY_SESSION':
      return false;
    default:
      return state;
  }
};
