// Import mongoose
const mongoose = require('mongoose')

// Schema
const patientSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number,
    },
    mobilenumber: {
        type: Number
    },
    profile: {
        type: String
    }
})

// Create modal
const patients = mongoose.model("patients", patientSchema) // "the collection to which this modal is created","schema - structure of database"

// Export modal
module.exports = patients