require('./routes')
const mongoose = require('mongoose')
const router = require('./routes/router')
const express = require('express')
const app = express()

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...'))

app.use(express.json())
app.use(router)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
