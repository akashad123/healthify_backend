// Import mongoose
const mongoose = require('mongoose')

// Schema
const doctorSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    mobnum: {
        type: Number,
        require: true
    }
})

const doctors = mongoose.model("doctors", doctorSchema)

module.exports = doctors