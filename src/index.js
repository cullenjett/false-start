import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { configureStore } from './utils/configure-store';

import './index.css';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
