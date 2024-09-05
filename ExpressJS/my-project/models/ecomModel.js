const mongoose = require('mongoose')

const ecomModel = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    price: Number,
})

const Product = mongoose.model('Product',ecomModel)

module.exports = Product