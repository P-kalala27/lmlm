import { createSlice } from "@reduxjs/toolkit";
import noteService from "../service/notes";
// const initialState = {
//   notes : [
//     {
//       content:'the app state is in redux store',
//       important: true,
//       id:1
//     },
//     {
//       content: 'reducer define how redux store works',
//       important: false,
//       id:2
//     }
//   ],
//   filter: 'IMPORTANT'
// }


const generatedId = ()=>{
  return Number((Math.random() *1000000).toFixed(0))
}

const noteSlice = createSlice({
  name:'notes',
  initialState:[],
  reducers:{
    createNote(state, action){
      state.push(action.payload)
    },
    toggleImportanceOf(state, action){
      const id = action.payload
      const noteToChange =state.find(n => n.id ===id)
      const changedNote = {
        ...noteToChange,
        important:!noteToChange.important
      }
      console.log(state);
      return state.map(note => note.id !== id ? note: changedNote)
    },
    appendNote(state, action){
      state.push(action.payload)
    },
    setNotes(state, action){
      return action.payload
    }
  }
})

export const {toggleImportanceOf, appendNote, setNotes} = noteSlice.actions

export const initializeNote = () => {
  return async dispatch => {
    const note = await noteService.getAll()
    dispatch(setNotes(note))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote))
  }
}
export default noteSlice.reducer

//  const noteReducer = (state = initialState.notes, action) =>{
//   switch(action.type){
//     case 'NEW_NOTE' : 
//       return [...state, action.payload]
//     case 'TOGGLE_IMPORTANT' : {
//       const id = action.payload.id
//       const noteChange = state.find(n => n.id === id);
//       const changedNote = {
//         ...noteChange,
//         important:!noteChange.important
//       }
//       return state.map(note => note.id !== id ?  note : changedNote)
//     }
//     default: return state
//   }
// }



// export const createNote = (content) =>{
//   return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       important: false,
//       id: generatedId()
//     }
//   }
// }

// export const toggleImportanceOf = (id) =>{
//   return {
//       type: 'TOGGLE_IMPORTANCE',
//       payload:{id}
//   }
// }

// export default  noteReducer