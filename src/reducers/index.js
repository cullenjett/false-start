import { combineReducers } from 'redux';

import { sessionReducer } from './session-reducer';

const appReducer = combineReducers({
  session: sessionReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'SIGN_OUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
