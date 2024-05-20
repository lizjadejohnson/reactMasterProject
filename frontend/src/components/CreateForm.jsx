import { useState } from 'react';

const CreateForm = ({setNotes}) => {
    const [createForm, setCreateForm] = useState({ title: "", body: "" });

    function handleChange(event) {
        setCreateForm({
            ...createForm,
            [event.target.name]: event.target.value
        })
    }

    //Default form submit behavior is that it sends its request and refreshes the page.
    //We don't want that cause we're dealing with state. We don't want the form to refresh the page by default!
    async function handleSubmit(event){
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/notes', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(createForm)
        })
        const data = await response.json();

        console.log(data)

        //Setting the note
        setNotes(data.notes)

        //Then setting our form to what it was originally
        setCreateForm({ title: "", body: "" })

        } catch(error){
            console.log(error)
        }
    }

    return (
        <div className='formAdmin'>
            <h1>Create Form</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    placeholder="Note Title"
                    value={createForm.title}
                    onChange={handleChange}
                />
                <textarea
                    name="body"
                    cols="20"
                    rows="5"
                    placeholder="Note body"
                    value={createForm.body}
                    onChange={handleChange}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateForm
