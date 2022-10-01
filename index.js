const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const genres = [
    {id: 1, genre: "Horror"},
    {id: 2, genre: "Noir"},
]

function validateGenre(genre) {
    const movieSchema = {
        genre: Joi.string().min(3).max(30).required()
    }
    return Joi.validate(genre, movieSchema)
}

app.get('/', (req, res) => {
    res.send("Sou um mero placeholder de home.")
})

app.get('/api/genres', (req, res) => {
    res.send(genres)
}) 

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(genre => genre.id === req.params.id)
    if (!genre) return res.status(404).send('The genre with the given ID was not found.')
    res.send(genre)
})

app.post('/api/genres', (req, res) => {
    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }
    genres.push(genre)
    res.send(genre)
})