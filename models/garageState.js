const mongoose = require('mongoose')

const d = new Date()

const garageStateSchema = new mongoose.Schema({
    open: {
        type: Boolean,
        required: true
    },
    time: {
        type: Number,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('GarageState', garageStateSchema)