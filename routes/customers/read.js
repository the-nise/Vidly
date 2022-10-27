const { Customer } = require('../../models/customers')
const router = require('../router')

router.get('/api/customer', async (req, res) => {
    const customer = await Customer.find().sort('name')
    res.send(customer)
}) 

router.get('/api/customer', async (req, res) => {
    const customer = await Customer.findById(req.params.id)

    if (!customer) return res.status(404).send('The customer with the given ID was not found.')
    
    res.send(customer)
})