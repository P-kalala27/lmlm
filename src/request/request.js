import axios from "axios";

const baseUrl = "http://localhost:3001/notes"
export const getNotes = () => {
    axios.get(baseUrl).then( res => res.data)
}

export const createNewNote = (note) => {
    axios.post(baseUrl, note).then(res => res.data)
}


export const updateNote = note =>{
    axios.put(`${baseUrl}/${note.id}`, note).then(res => res.data)
}