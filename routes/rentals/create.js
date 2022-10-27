const { validateRental, Rental } = require('../../models/rentals')
const { Movie } = require('../../models/movies')
const { Customer } = require('../../models/customers')
const router = require('../router')
const Fawn = require('fawn')

Fawn.init('mongodb://localhost/vidly')

router.post('/api/rentals', async (req, res) => {
    const { error } = validateRental(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.rental.customerId)
    if (!customer) return res.status(400).send('Invalid customer.')
    
    const movie = await Movie.findById(req.body.rental.movieId)
    if (!movie) return res.status(400).send('Invalid genre.')
    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.')

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })
    
    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);
})