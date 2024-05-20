require("dotenv").config()
//Allows .env

const express = require("express")
const path = require('path');

const app = express()

const PORT = process.env.PORT || 3000;
//User port specified in env or 3000

const connectToDb = require("./config/connectToDb")
//Pulls Mongoose connection into main application

const cors = require("cors");

//Pull in Note things:
const Note = require("./models/note");
const notesController = require("./controllers/notesController.js");

//Pull in Todo Things:
const Todo = require("./models/todo");
const todosController = require("./controllers/todosController.js");

//Pull in User Things:
const User = require("./models/user");
const usersController = require("./controllers/usersController.js");

// Receiving reqs on cross-origins

app.use(express.json())
//Express doesn't naturally convert our data to json

app.use(cors())

connectToDb()
//This initializes our connectToDb function
// ---------------------------------------------reQs
// ---------------------------------------------Routing

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));


app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
})


//-----Objective: We want to establish CRUD routes for our Notes model-----
//Always use res.json as opposed to res.send when responding back to the client with json data
//These routes are defined in our controllers>notesController.js file, notice how the methods are specified here

//NOTES ROUTES
// -----Get ALL Notes (GET):
app.get("/notes", notesController.fetchAllNotes)


// -----Get specific Notes by ID (GET):
app.get("/notes/:id", notesController.fetchNote)

// -----Create a Note (POST):
app.post("/notes/", notesController.createNote)


// -----Update a specific note (PUT):
app.put("/notes/:id", notesController.updateNote)


// -----Delete a specific note (DELETE):
app.delete("/notes/:id", notesController.deleteNote)

//------------

//TODO ROUTES
// -----Get ALL Todos (GET):
app.get("/todos", todosController.fetchAllTodos)


// -----Get specific Todos by ID (GET):
app.get("/todos/:id", todosController.fetchTodo)

// -----Create a Todo Item (POST):
app.post("/todos/", todosController.createTodo)


// -----Update a specific Todo Item (PUT):
app.put("/todos/:id", todosController.updateTodo)


// -----Delete a specific todo item (DELETE):
app.delete("/todos/:id", todosController.deleteTodo)


//USER ROUTES
// -----Get ALL users (GET):
app.get("/users", usersController.fetchAllUsers)


// -----Get specific users by ID (GET):
app.get("/users/:id", usersController.fetchUser)

// -----Create a user (POST):
app.post("/users/", usersController.createUser)


// -----Update a specific user (PUT):
app.put("/users/:id", usersController.updateUser)


// -----Delete a specific user (DELETE):
app.delete("/users/:id", usersController.deleteUser)



// -------------
app.listen(PORT, () => {
    console.log(`Express server listening on port number ${PORT}`)
})



// -------------------------------- [Databse Connection]