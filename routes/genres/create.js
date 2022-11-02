const auth = require('../../middleware/auth')
const { validateGenre, Genre } = require('../../models/genres')
const router = require('../router')

router.post('/api/genres', auth, async (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let genre = new Genre({
        name: req.body.name
    })
    genre = await genre.save()
    res.send(genre)
})

