/* eslint-disable linebreak-style */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState } from 'react';
import './App.css';
import Footer from './components/Footer.jsx';
import LoginForm from './components/LoginForm.jsx';
import Note from './components/Note';
import NoteForm from './components/NoteForm.jsx';
import Togglabel from './components/Togglabel.jsx';
import login from './service/login.js';
import notesService from './service/notes.js';
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState()
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState('some error happened')
  const [username, setUserName]= useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [logginVisible, setLoginVisible] = useState(false)
  const noteFormRef = useRef()

  useEffect(() => {
    notesService
      .getAll()
      .then(initNote => {
        setNotes(initNote)
      })
  },[])

  useEffect(() => {
    const loggedUserJson = localStorage.getItem('loggedInUser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      notesService.setToken(user.token)
    }
  }, [])

  const noteToShow = showAll ? notes : notes.filter(n => n.important)

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    notesService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const toogleImportant = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    notesService
      .update(id,changedNote)
      .then(updateNote => {
        setNotes(notes.map(n => n.id !==id ? n : updateNote))
      })
      .catch(err => {
        setErrorMessage(`the note '${note.content}' was  deleted from server`)
        setTimeout(() => {
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
    setNewNote(e.target.value)
  }



  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await login.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      notesService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
    } catch (error) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  //login form
  const loginForm = () => {
    const hidenWhenVisible = { display: logginVisible ? 'none': '' }
    const shownWhenVisible = { display: logginVisible? '': 'none' }
    return(
      <div>
        <div style={hidenWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={shownWhenVisible}>
          <LoginForm username={username}
            password={password}
            handleUsernameChange={({ target }) => setUserName(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )}

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      localStorage.removeItem('loggedInUser')
      setUser(null)
      notesService.setToken(null)
      setUserName('')
      setPassword('')
    } catch (error) {
      console.log(error.message)
    }
  }

  const noteForm = () => (
    <Togglabel buttonLabel='new Note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglabel>
  )

  return (
    <div className="container">
      <div className="title">
        <h1 className="title">Note app</h1>
      </div>

      {!user && loginForm()}
      {
        user && <div>
          <Togglabel buttonLabel= "New Note" ref={noteFormRef}>
          <NoteForm createNote={addNote} />
        </Togglabel>
        <p>{user.name} logged in</p>
        </div>
      }
      <div className="hero-section">
        <ul className="notes">

          {noteToShow.map((note) => (
            <Note note={note} key={note.id}
              toggleImportant={() => toogleImportant(note.id) } />
              
          ))}
        </ul>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
          </button>

          {user &&  <button onClick={handleLogout}>log out</button>}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App