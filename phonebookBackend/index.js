const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
morgan.token('content', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :response-time ms - request-content=:content'));


let entries = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request,response) => {
    response.send('<h1>Welcome to phonebook app</h1>')
})
app.get('/api/persons', (request,response) => {
    response.json(entries)
})
app.get('/info', (request,response) => {
    response.send(`<h1>Phonebook has info for ${entries.length} people</h1><br/>
        <h2>${new Date()}</h2>`)
})

app.get('/api/persons/:id', (request,response) => {
    const requestedEntry = entries.find(entry => entry.id === request.params.id)
    if(!requestedEntry){
       response.status(404).end()
    }else{
        response.json(requestedEntry)
    }
})

app.delete('/api/persons/:id', (request,response) => {
    const id = request.params.id
    entries.filter(entry => entry.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request,response) => {
    if(!request.body.name || !request.body.number){
        response.status(404).send({error: `missing name or number`})
    }
    const newObject = {
        id: Math.floor(Math.random()*10000),
        name: request.body.name,
        number: request.body.number
    }
    const existingEntry = entries.find(entry => entry.name === newObject.name)
    if(existingEntry){
        response.status(404).send({error: `there's such an entry present`})
    }else{
        entries = entries.concat(newObject)
        response.json(newObject)
    }}
)

const unknownEndpoint = (request,response) => {
    response.status(404).send({error: `there's no endpoint registering this request.`})
}

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})

