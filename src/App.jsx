import { useState, useEffect } from "react"
import axios from 'axios'
import Note from './components/Note'
import NoteServices from './services/notes'
import Footer from './components/Footer'

const Notification = ({message}) => {
  if (message === null){
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}
const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error occurred')
  useEffect(()=> {
    NoteServices.getAll().then(initialNotes => setNotes(initialNotes))
  },[])
  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  const addNote = (event) =>{
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }
    NoteServices.create(noteObject).then(returnedNote => {setNotes(notes.concat(returnedNote))
  setNewNote('')})
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    NoteServices.update(id, changedNote).then(returnedNote => setNotes(notes.map(note => note.id === id ? returnedNote : note))).catch(error => {setErrorMessage(`Note ${note.content} was already removed from server.`)
    setTimeout(() => {
      setErrorMessage(null)      
    }, 5000);
  setNotes(notes.filter(n => n.id !== id))})
    console.log(notes)
  }
  
  console.log('render', notes.length, 'notes')
  return(
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => {setShowAll(!showAll)}}>{showAll? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map((note)=>{return <Note key = {note.id} note = {note} toggleImportance={() => {toggleImportanceOf(note.id)}}/>})}
      </ul>
      <form onSubmit={addNote}>
        <input value = {newNote} onChange={handleNoteChange}/>
        <button type="submit">Save</button>
      </form>
      <Footer/>
    </div>            
  )
  
}

export default App
