const config = require('config')
const helmet = require('helmet')
const Joi = require('joi')
const logger = require('./logger')
const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use(logger)
app.use(morgan('tiny'))


console.log(`${process.env.NODE_ENV}`);
// console.log("Application Name: " + config.get('name'));
// console.log("Mail Server: " + config.get('mail.host'));


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

function lookUpGenre(genres, req) {
    return genres.find(genre => genre.id === parseInt(req.params.id))
}

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }
    genres.push(genre)
    res.send(genre)
})

app.get('/', (req, res) => {
    res.send("Sou um mero placeholder de home.")
})

app.get('/api/genres', (req, res) => {
    res.send(genres)
}) 

app.get('/api/genres', (req, res) => {
    const genre = lookUpGenre(genres, req)
    if (!genre) return res.status(404).send('The genre with the given ID was not found.')
    res.send(genre)
})

app.put('/api/genres/:id', (req, res) => {
    const genre = lookUpGenre(genres, req)
    if (!genre) return res.status(404).send('The genre with the given ID was not found.')
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    genre.genre = req.body.genre
    res.send(genre)
})

app.delete('/api/genres/:id', (req, res) => {
    const genre = lookUpGenre(genres, req)
    if (!genre) return res.status(404).send('The genre with the given ID was not found.')
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genre)
})



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))

