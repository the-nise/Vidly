const { validateMovie, Movie } = require('../../models/movies')
const { Genre } = require('../../models/genres')
const router = require('../router')

router.post('/api/movies', async (req, res) => {
    const { error } = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send('Invalid genre.')

    let movie = new Movie({
        title: req.body.title,
        genreId: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    movie = await movie.save()
    res.send(movie)
})
