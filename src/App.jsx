import React from 'react';
import FilterComponents from './components/FilterComponents';
import Notes from './components/Note';
import NoteComponents from './components/NoteComponents';

const App = () => {
    const filterSelected = (value) =>{
    console.log(value);
    }
  return (
    <div>
       <NoteComponents />
       <FilterComponents />
       <Notes />
    </div>
  )
}

export default App