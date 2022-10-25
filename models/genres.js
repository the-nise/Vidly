const mongoose = require('mongoose')
const Joi = require('joi')

const Genre = mongoose.model('Genre', new mongoose.Schema({
    genre: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}))

function validateGenre(genre) {
    const movieSchema = {
        genre: Joi.string().min(5).max(50).required()
    }
    return Joi.validate(genre, movieSchema)
}

module.exports = { Genre, validateGenre }