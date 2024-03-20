// Import mongoose
const mongoose = require('mongoose')

// Schema
const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        require: true,
        unique: true
    }
})

// Create modal
const departments = mongoose.model("departments", departmentSchema)

// Export modal
module.exports = departments
