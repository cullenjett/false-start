import { combineReducers } from 'redux';

import { sessionReducer } from './features/session/session-reducer';

const appReducer = combineReducers({
  session: sessionReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === 'DESTROY_SESSION') {
    state = undefined;
  }

  return appReducer(state, action);
};
