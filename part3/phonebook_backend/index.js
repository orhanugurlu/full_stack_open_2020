const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('jsonBody', (req, res) => JSON.stringify(req.body))

const morgenLogger = morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens['jsonBody'](req, res)
    ].join(' ')
  })
app.use(morgenLogger)

let persons = [  
    { 
        name: "Arto Hellas", 
        number: "040-123456",
        id: 1
    },
    { 
        name: "Ada Lovelace", 
        number: "39-44-5323523",
        id: 2
    },
    { 
        name: "Dan Abramov", 
        number: "12-43-234345",
        id: 3
    },
    { 
        name: "Mary Poppendieck", 
        number: "39-23-6423122",
        id: 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Phonebook backend server</h1><p>Use /api/persons for REST interface</p>')
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people.</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)  
    res.status(204).end()
})

const generateId = () => {
    let randomId = () => Math.floor(Math.random() * 1000);
    let id = randomId(); 
    while (persons.some((p) => p.id === id)) {
        id = randomId();
    }
    return id
}  

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ 
            error: 'Name and/or number missing' 
        })
    }
  
    if (persons.some((p) => p.name === body.name)) {
        return res.status(400).json({ 
            error: 'Name must be unique' 
        })    
    }

    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)

    res.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})