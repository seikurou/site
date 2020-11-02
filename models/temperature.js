const mongoose = require('mongoose')

const temperatureSchema = new mongoose.Schema({
    celsius: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Temperature', temperatureSchema)