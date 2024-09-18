const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ecomModel = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: [500, 'Name cannot exceed 500 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    }
})

ecomModel.plugin(mongoosePaginate)
const Product = mongoose.model('Product',ecomModel)

module.exports = Product