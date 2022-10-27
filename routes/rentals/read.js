const { Rental } = require('../../models/rentals')
const router = require('../router')

router.get('/api/rentals', async (req, res) => {
    const rental = await Rental.find().sort('name')
    res.send(rental)
}) 

router.get('/api/rentals', async (req, res) => {
    const rental = await Rental.findById(req.params.id)

    if (!rental) return res.status(404).send('The rental with the given ID was not found.')
    
    res.send(rental)
})