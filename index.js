const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));

let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScript", important: false },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const contacts = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:noteId", (request, response) => {
  const noteId = Number(request.params.noteId);
  const note = notes.find((note) => note.id === noteId);
  if (note) {
    response.json(note);
  } else {
    response.statusMessage = "Note not found, idiot";
    response.status(404).end();
  }
});

app.delete("/api/notes/:noteId", (request, response) => {
  const noteId = Number(request.params.noteId);
  notes = notes.filter((note) => note.id !== noteId);
  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const newNote = request.body;
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  newNote.id = maxId + 1;
  notes = [...notes, newNote];
  response.status(201).json(newNote);
});

app.get("/api/info", (request, response) => {
    //Get the time of the request
    const date = new Date();
    const timeOfRequest = date.toDateString();
    const numberOfContacts = contacts.length;
    if(numberOfContacts !== 0) {
        response.send(`<p>Phonebook has info for ${numberOfContacts} people</p> <br/> <p>${timeOfRequest}</p>`)
    } else {
        response.status(202).end();
    }
}
    )

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
