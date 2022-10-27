const mongoose = require('mongoose')
const Joi = require('joi')

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false,
    }
}))

function validateCustomer(customer) {
    const customerSchema = {
        customer: {
            name: Joi.string().min(5).max(50).required(),
            phone: Joi.string().min(5).max(50).required(),
            isGold: Joi.boolean()        
        }
    }
    return Joi.validate(customer, customerSchema)
}

module.exports = { Customer, validateCustomer }