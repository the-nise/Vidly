const { validateGenre, Genre } = require('../../models/genres')
const router = require('../router')

router.put('/api/genres/:id', async (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(
        req.params.id,
        { 
            name: req.body.name 
        }, {
        new: true
    })
    
    if (!genre) return res.status(404).send('The genre with the given ID was not found.')
    res.send(genre)
})

