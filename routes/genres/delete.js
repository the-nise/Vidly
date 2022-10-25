const { Genre } = require('../../models/genres')
const router = require('../router')

router.delete('/api/genres/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)

    if (!genre) return res.status(404).send('The genre with the given ID was not found.')

    res.send(genre)
})

