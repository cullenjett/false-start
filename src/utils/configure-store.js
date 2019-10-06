import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../root-reducer';

export const configureStore = (initialState) => {
  const middleware = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    const { createLogger } = require('redux-logger');
    middleware.push(
      createLogger({
        collapsed: true,
      })
    );
  }

  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
};
