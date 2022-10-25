const { validateCustomer, Customer } = require('../../models/customers')
const router = require('../router')

router.put('/api/customers/:id', async (req, res) => {
    const { error } = validateCustomer(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        { 
            customer: req.body.customer 
        }, {
        new: true
    })
    
    if (!customer) return res.status(404).send('The customer with the given ID was not found.')
    res.send(customer)
})

