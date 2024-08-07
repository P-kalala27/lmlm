import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FilterComponents from './components/FilterComponents';
import Notes from './components/Note';
import NoteComponents from './components/NoteComponents';
import { initializeNote } from './reducers/noteReducers';

const App = () => {
    const filterSelected = (value) =>{
    console.log(value);
    }
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(initializeNote())}, [])
  return (
    <div>
       <NoteComponents />
       <FilterComponents />
       <Notes />
    </div>
  )
}

export default App