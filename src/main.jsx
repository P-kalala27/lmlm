/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import filterReducer from './reducers/filterReducer';
import noteReducer, { setNotes } from './reducers/noteReducers';
import noteService from './service/notes';



const store = configureStore({
  reducer:{
    notes: noteReducer,
    filter: filterReducer 
  }
})

noteService.getAll().then(notes => notes.forEach(note =>{
  store.dispatch(setNotes(note))
}))

console.log(store.getState());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
