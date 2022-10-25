const { validateCustomer, Customer } = require('../../models/customers')
const router = require('../router')

router.post('/api/customers', async (req, res) => {
    const { error } = validateCustomer(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let customer = new Customer({
        customer: req.body.customer
    })
    customer = await customer.save()
    res.send(customer)
})

