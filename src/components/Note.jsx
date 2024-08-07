import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducers';

const Note = ({note, handleCLick}) =>{
    return (
        <li onClick={handleCLick}>
            {note.content} 
            <strong>
                {
                    note.important ?' important' : ''
                }
            </strong>
        </li>
    )
}


const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(({filter, notes}) =>{
        if(filter === 'ALL') {return notes}
        return filter === 'IMPORTANT'
        ? notes.notes.filter(note => note.important)
        : notes.notes.filter(note =>!note.important)
          // not important notes  // non important notes  // non important notes  // non important notes  // non important notes  // non important notes  // non important notes  // non important notes  // non important notes  // non important notes  // non important notes  // non important notes  // non important notes  // non important notes  // non important notes  // non important notes  // non important notes  // non
    })
console.log(notes);
  return (
    <div>
        <ul>
            {notes.map(note => {
                return (
                    <Note key={note.id} note={note} handleCLick={() => dispatch(toggleImportanceOf(note.id))} />
                )
            })}
        </ul>
    </div>
  )
}

export default Notes