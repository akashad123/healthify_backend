// Import mongoose
const mongoose = require('mongoose')

// Schema
const appointmentSchema = new mongoose.Schema({
    pName: {
        type: String,
        require: true
    },
    pAge: {
        type: Number,
        require: true
    },
    pGender: {
        type: String,
        require: true
    },
    pDate: {
        type: String,
        require: true
    },
    pSlot: {
        type: String,
        require: true
    },
    pMobNum: {
        type: Number,
        require: true
    },
    pEmail: {
        type: String,
        require: true
    },
    pDept: {
        type: String,
        require: true
    },
    pDoc: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
})

// Create modal
const appointments = mongoose.model("appointments", appointmentSchema)

// Export model
module.exports = appointments