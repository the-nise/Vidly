const { Customer } = require('../../models/customers')
const router = require('../router')

router.delete('/api/customers/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)

    if (!customer) return res.status(404).send('The customer with the given ID was not found.')

    res.send(customer)
})

