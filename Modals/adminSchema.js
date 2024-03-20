// Import mongoose
const mongoose = require('mongoose')

// Schema
const adminSchema = new mongoose.Schema({
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
    }
})

// Create modal
const admins = mongoose.model("admins", adminSchema) // "the collection to which this modal is created","schema - structure of database"

// Export modal
module.exports = admins