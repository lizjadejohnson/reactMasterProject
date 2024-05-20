import React from 'react'
import Note from '../components/Note'


//The note._id is provided by Mongo
const NotesPage = ({notes, setUpdateForm, handleClick}) => {
  return (
    <div className='notesPage'>
      {notes.map(note => {
        return (
            <Note key={note._id} note={note} setUpdateForm={setUpdateForm} handleClick={handleClick}/>
        )
      })}
    </div>
  );
}

export default NotesPage
