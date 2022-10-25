const { validateGenre, Genre } = require('../../models/genres')
const router = require('../router')

router.post('/api/genres', async (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let genre = new Genre({
        genre: req.body.genre
    })
    genre = await genre.save()
    res.send(genre)
})

