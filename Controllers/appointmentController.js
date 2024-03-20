// Logic to resolve requests

// Import model
const appointments = require("../Modals/appointmentSchema");

// Book appointment
exports.bookAppointment = async(req, res)=>{
    console.log('Inside appointmentController function');
    const userId = req.payload
    console.log(userId);
    // Extract data from request body, this is possible only because json is converted into js objects in index.js (step no 6)
    const {pName,pAge,pGender,pDate,pSlot,pMobNum,pEmail,pDept,pDoc} = req.body

    try {
        const existingAppointment = await appointments.findOne({pMobNum,pDept})
        if(existingAppointment){
            res.status(406).json('You have already registered an appointment with this mobile number under this department')
        }
        else{
            // Create object for the model - to add data
            const newAppointment = new appointments({
                pName,
                pAge,
                pGender,
                pDate,
                pSlot,
                pMobNum,
                pEmail,
                pDept,
                pDoc,
                userId,
                status: 'pending' // Set the initial status to 'pending'
            })
            // Use save function in mongoose - to permanently store data in mongodb
            await newAppointment.save()
            // Response
            res.status(200).json(newAppointment)
    }
    } catch (err) {
        res.status(401).json('Appointment request failed due to ',err)
    }
}

// Get appointments (user)
exports.getAppointment = async(req, res)=>{
    try {
        const userId = req.payload
        const paientAppointments = await appointments.find({userId}) 
        res.status(200).json(paientAppointments)
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}

// Reschedule appointment
exports.rescheduleAppointment = async(req, res)=>{
    const {id} = req.params
    const userId = req.payload
    const {pName, pAge, pGender, pDate, pSlot, pMobNum, pEmail, pDept, pDoc} = req.body

    try {
        const updateAppointment = await appointments.findByIdAndUpdate({_id:id},{pName, pAge, pGender, pDate, pSlot, pMobNum, pEmail, pDept, pDoc, userId},{new:true})

        await updateAppointment.save()
        res.status(200).json(updateAppointment)
    } catch (err) {
        res.status(401).json(err)
    }
}

// Cancel appointments
exports.cancelAppointment = async(req, res)=>{
    const {id} = req.params
    
    try {
        const removeAppointment = await appointments.findByIdAndDelete({_id:id})
        res.status(200).json(removeAppointment)

    } catch (err) {
        res.status(401).json(err)
    }
}

// Get all appointments (admin)
exports.getAllAppointments = async(req, res)=>{
    try {
        const paientAppointments = await appointments.find() 
        res.status(200).json(paientAppointments)
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}

