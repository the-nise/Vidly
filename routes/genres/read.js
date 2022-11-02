const { Genre } = require('../../models/genres')
const router = require('../router')

router.get('/api/genres', async (req, res) => {
    const genres = await Genre.find().sort('name')
    res.send(genres)
}) 

router.get('/api/genres/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)

    if (!genre) return res.status(404).send('The genre with the given ID was not found.')
    
    res.send(genre)
})