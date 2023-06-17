const express = require('express')
const app = express()

const phone = [
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

app.get('/info', (req,res) => {
    res.send(`
        Phonebook have details for ${phone.length} peoples
        <br/>
        ${date.toString()}
        `)
})

app.get('/api/persons', (req,res) => {
    res.json(phone)
})

app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const phoneNumber = phone.find(item => item.id === id)
    if(phoneNumber){
        res.json(phoneNumber)
    }
    else{
        res.status(404).send('Item is not found')
    }
})

const PORT = 3001

app.listen(PORT)
console.log(`Server is running successfully on Port ${PORT}`)
