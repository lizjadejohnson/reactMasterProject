import React from 'react'

const Note = ({note, setUpdateForm, handleClick}) => {
  return (
    <div className='a-note'>
      <h1>{note.title}</h1>
      <p>{note.body}</p>
      <button onClick={() => setUpdateForm({...note})}>Edit</button>
      <button onClick={() => handleClick(note._id)}>Delete</button>
    </div>
  )
}

export default Note
