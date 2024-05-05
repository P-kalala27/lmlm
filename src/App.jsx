/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Note from './components/Note';


const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState();
  const [showAll, setShowAll] = useState(false);

  const hook = ()=>{
    axios
         .get('http://localhost:3001/notes')
         .then(res => {
          console.log('success of promise');
          setNotes(res.data);
         })
  }
  useEffect(hook,[]);

  console.log('render', notes.length, 'notes');

  const noteToShow = showAll ? notes : notes.filter(n => n.important);

  const addNote = (e) =>{
    e.preventDefault();
    const noteObj ={
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    }
    setNotes(notes.concat(noteObj));
    setNewNote('add new note');
  }

  
  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  }

  return (
    <div className="container">
      <h1 className="title">Note app</h1>
      <ul className="notes">
        {noteToShow.map((note) => (
          <Note note={note} key={note.id} />
        ))}
      </ul>
      <form className='hero' onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>Save</button>
      </form>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
    </div>
  )
}

export default App