import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'


import NotesPage from './pages/NotesPage'
import CreateForm from './components/CreateForm'


function App() {
  const [notes, setNotes] = useState([]);

  const [updateForm, setUpdateForm] = useState({ title: "", body: "" });

  //------------------------------------------[State]-----------------------------------------------------

  //------------------------------------------[CRUD Operations]-------------------------------------------

  //------------------------------------------[Create]------------------------------------------------------


  const createNote = async (e) => {
    e.preventDefault();
    // 1. Make a request to the server
    const response = await axios({
      method: "POST",
      url: "/notes",
      data: createForm,
    });
    // 2. Set the state
    setNotes([...notes, response.data.note]);
    setCreateForm({ title: "", body: "" });
    
  }
  
  //------------------------------------------[Read]--------------------------------------------------------

  useEffect(() => {
    const getNotes = async () => {
      try{
        const response = await fetch('http://localhost:3000/notes')
        const data = await response.json()
        console.log(data)
        setNotes(data.notes)
      } catch (error){
        console.log(error)
        }
    }
    getNotes()
  }, [] )



  //------------------------------------------[Update]------------------------------------------------------

  function handleChange(event){
    setUpdateForm({
      ...updateForm,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event){
    event.preventDefault();
    try {
      const response = await fetch (`http://localhost:3000/notes/${updateForm._id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updateForm)
      })
      console.log(response)
      setUpdateForm({ _id: null, title: "", body: "" })
    } catch(error) {
      console.log(error)
    }
  }


  //------------------------------------------[FORM HANDLING]------------------------------------------------------



  //------------------------------------------[Delete]------------------------------------------------------
  async function handleClick(_id){
    try {
      await fetch (`http://localhost:3000/notes/${_id}`, {
        method: "DELETE",
      })

      const newNotes = notes.filter(note => note._id !== _id)

      setNotes([...newNotes])
      
    } catch(error) {
      console.log(error)
    }
  }

  //------------------------------------------[useEffect]-----------------------------------------------------


  return (
    <div className="App">

      <CreateForm setNotes={setNotes}/>

      <div className='formAdmin'>
            <h1>Update Form</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    placeholder="Note Title"
                    value={updateForm.title}
                    onChange={handleChange}
                />
                <textarea
                    name="body"
                    cols="20"
                    rows="5"
                    placeholder="Note body"
                    value={updateForm.body}
                    onChange={handleChange}
                />
                <button type="submit">Update</button>
            </form>
        </div>



      <NotesPage notes={notes} setUpdateForm={setUpdateForm} handleClick={handleClick}/>
    </div>
  );
}

export default App;