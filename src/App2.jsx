import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { createNewNote, getNotes, updateNote } from './request/request';



const App2 = () => {
    const queryClient = useQueryClient()
    const newNote = useMutation({mutationFn: createNewNote, onSuccess: ()=> {
        queryClient.invalidateQueries({queryKey: ['notes']});
    }})
    const addNote = async (e) =>{
        e.preventDefault();
        const content = e.target.note.value
        e.target.note.value = '';
        newNote.mutate({content, important:true})
    }
    const updateNoteMutation = useMutation({
        mutationFn: updateNote,
        onSuccess: ()=> {
            queryClient.invalidateQueries('notes')
        }
    })

    const toggleImportant = note =>{
        updateNoteMutation.mutate({...note, important : !note.important})
    }

    const result = useQuery({
        queryKey: ['notes'],
        queryFn: getNotes
    })
    console.log(JSON.parse(JSON.stringify(result)));

    if(result.isLoading) return <div>Loading...</div>
    
    const notes = result.data
    
  return (
    <div>
        <h2>Note App </h2>
        <form onSubmit={addNote}>
            <input type="text" name='note' />
            <button type='submit'>Add</button>
        </form>
        <ul>
            {notes.map(note => {
                return (
                    <li key={note.id} onClick={()=> toggleImportant(note)}>
                        {note.content}
                        <strong> {note.important ? 'important' : ''}</strong>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default App2