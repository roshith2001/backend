const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express()
const Note = require('./models/phonebookdb')


app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let phone = [
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

const date = new Date()
morgan.token('content', function(req,res){
  if(req.method === 'POST'){
    return JSON.stringify(req.body)
  }
  return null
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))


app.get('/info', (req,res) => {
    res.send(`
        Phonebook have details for ${phone.length} peoples
        <br/>
        ${date.toString()}
        `)
})

app.get('/api/persons', (req,res) => {
    Note.find({}).then(result => {
      res.json(result)
    })
})

app.get('/api/persons/:id', (req,res) => {
    Note.findById(req.params.id).then(result => {
      res.json(result)
    })
    .catch(error => {
      console.log('No match found', error.message)
      res.json(`No match found ${error.message}`)
    })
})

app.post('/api/persons', (req,res) => {
  const body = req.body
    if(!body.name || !body.number){
      res.status(400).json({error: 'Content Missing'})
    }
  
    const newEntry = new Note({
      name: body.name,
      number: body.number || null
    })
    newEntry.save().then(result => {
      console.log(result)
      Note.find({}).then(items => {
        res.json(items)
      })
    })
})

app.delete('/api/persons/:id', (req,res) => {
    Note.findByIdAndDelete(req.params.id).then(result => {
      res.json(result)
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT)
console.log(`Server is running successfully on Port ${PORT}`)
