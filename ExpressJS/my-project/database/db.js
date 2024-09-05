const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/my_db')

const db = mongoose.connection

db.on('error',(err) => console.log('MongoDB Connection Error: ',err))

db.once('open', () => {
    console.log('Connected to MongoDB')
})

module.exports = db