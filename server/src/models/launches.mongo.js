const mongoose = require('mongoose')

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    customers: [ String ],
    upcoming: {
        type: boolean,
        required: true,
    },
    success: {
        type: boolean, 
        required: true,
        default: true
    }
})

// Connects launchesSchema with the 'launches' collection
module.exports = mongoose.model('Launch', launchesSchema)

