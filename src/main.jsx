/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import noteReducer from './reducers/noteReducers';

const store = createStore(noteReducer)


      
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)