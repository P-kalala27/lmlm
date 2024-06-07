/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer.jsx';
import Note from './components/Note';
import login from './service/login.js';
import notesService from './service/notes.js';
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState();
  const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState('some error happened');
  const [username, setUserName]= useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(()=>{
    notesService
                .getAll()
                .then(initNote =>{
                  setNotes(initNote)
                })
  },[]);

  const noteToShow = showAll ? notes : notes.filter(n => n.important);

  const addNote = (e) =>{
    e.preventDefault();
    const noteObj ={
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }
    notesService
                .create(noteObj)
                .then(returnedNote =>{
                  setNotes(notes.concat(returnedNote));
                  setNewNote('');
                })
  }

  const toogleImportant = id =>{
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    notesService
                .update(id,changedNote)
                .then(updateNote => {
                  setNotes(notes.map(n => n.id !==id ? n : updateNote));
                 })
                 .catch(err =>{
                  setErrorMessage(`the note '${note.content}' was  deleted from server`)
                  setTimeout(()=>{
                    setErrorMessage(null)
                  }, 5000)
                  setNotes(notes.filter(n => n.id!== id))
                 })
  }

  // const deleteNotes = id =>{
  //   notesService
  //              .remove(id)
  //              .then(res =>{
  //                 setNotes(notes.filter(n => n.id!== id))
  //               })
  //              .catch(err =>{
  //                 setErrorMessage(`the note '${notes.content}' was  deleted from server`)
  //                 setTimeout(()=>{
  //                   setErrorMessage(null)
  //                 }, 5000)
  //                 setNotes(notes.filter(n => n.id!== id))
  //                })
  // }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  }

  const handleLogin = async (e) =>{
    e.preventDefault();
    try {
      const user = await login.login({
        username, password
      })
      setUser(user)
      setUserName('')
      setPassword('')
    } catch (error) {
      setErrorMessage('wrong credentials')
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
    }
  }
//login form
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div className="container">
      <div className="title">
      <h1 className="title">Note app</h1>
      </div>
      {
        user === null?
        loginForm() :
        noteForm()
      }
      {!user && loginForm()}
      {
        user && <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      }
      <div className="hero-section">
      <ul className="notes">
        
        {noteToShow.map((note) => (
          <Note note={note} key={note.id}
           toggleImportant={()=> toogleImportant(note.id) } />
        ))}
      </ul>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>


      </div>
      </div>
      <Footer />
    </div>
  )
}

export default App