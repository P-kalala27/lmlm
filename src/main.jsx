/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App2 from './App2';



// const store = configureStore({
//   reducer:{
//     notes: noteReducer,
//     filter: filterReducer 
//   }
// })

// noteService.getAll().then(notes => notes.forEach(note =>{
//   store.dispatch(setNotes(note))
// }))
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App2 />
  </QueryClientProvider>
)
