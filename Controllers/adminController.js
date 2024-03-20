// Import model
const admins = require('../Modals/adminSchema')
const appointments = require('../Modals/appointmentSchema')
const departments = require('../Modals/departmentSchema')
const doctors = require('../Modals/doctorSchema')
const patients = require('../Modals/patientSchema')

// Import JWT
const jwt = require('jsonwebtoken')

// Register function
exports.registerAdmin = async (req, res) => {
    console.log('Inside adminController register function');

    const { username, email, password } = req.body

    try {
        const existingAdmin = await admins.findOne({ email })
        if (existingAdmin) {
            res.status(406).json('Your email is already registered, please login')
        }
        else {
            // Create object for the model - to add data
            const newAdmin = new admins({
                username,
                email,
                password
            })
            await newAdmin.save()
            res.status(200).json(newAdmin)
        }
    } catch (err) {
        res.status(401).json('Register request failed due to ', err)
    }
}

// Login function
exports.loginAdmin = async (req, res) => {
    console.log('Inside adminController login function');
    const { email, password } = req.body

    try {
        const existingAdmin = await admins.findOne({ email, password })
        console.log(existingAdmin);

        if (existingAdmin) {
            const token = jwt.sign({ userId: existingAdmin._id }, "supersecretkey12345")
            res.status(200).json({
                existingAdmin,
                token
            })
        }
        else {
            res.status(406).json('Incorrect email or password')
        }

    } catch (err) {
        res.status(401).json(`Login failed due to ${err}`)
    }

}

// Add department function
exports.addDepartment = async (req, res) => {
    console.log('Inside addDepartment function');

    const userId = req.payload
    console.log(userId);

    const { departmentName } = req.body

    try {
        const existingDepartment = await departments.findOne({ departmentName })
        console.log(existingDepartment);
        if (existingDepartment) {
            res.status(406).json('This department is already added')
        }
        else {
            const newDepartment = new departments({
                departmentName
            })
            await newDepartment.save()
            res.status(200).json(newDepartment)
        }
    } catch (err) {
        res.status(401).json(`Adding failed due to `, err)
    }
}

// Add doctor function
exports.addDoctor = async (req, res) => {
    console.log('Inside addDoctor function');

    const userId = req.payload
    console.log(userId);

    const { doctorName, department, age, mobnum } = req.body

    try {
        const existingDoctor = await doctors.findOne({ doctorName, department })
        console.log(existingDoctor);

        if (existingDoctor) {
            res.status(406).json('This doctor under this department is already added')
        }
        else {
            const newDoctor = new doctors({
                doctorName,
                department,
                age,
                mobnum,
            })
            await newDoctor.save()
            res.status(200).json(newDoctor)
        }
    } catch (err) {
        res.status(401).json(`Adding failed due to `, err)
    }
}

// Get departments function
exports.getDepartments = async (req, res) => {
    try {
        const allDepartments = await departments.find()
        res.status(200).json(allDepartments)
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}

// Get doctors function
exports.getDoctors = async (req, res) => {
    try {
        const allDoctors = await doctors.find()
        res.status(200).json(allDoctors)
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}

// Edit department
exports.editDepartment = async (req, res) => {
    const { id } = req.params
    const userId = req.payload
    const { departmentName } = req.body

    try {
        const updateDepartment = await departments.findByIdAndUpdate({ _id: id }, { departmentName, userId }, { new: true })
        await updateDepartment.save()
        res.status(200).json(updateDepartment)
    } catch (err) {
        res.status(401).json(err)
    }
}

// Edit doctor
exports.editDoctor = async (req, res) => {
    const { id } = req.params
    const userId = req.payload
    const { doctorName, department, age, mobnum } = req.body

    try {
        const updateDoctor = await doctors.findByIdAndUpdate({ _id: id }, { doctorName, department, age, mobnum, userId }, { new: true })
        await updateDoctor.save()
        res.status(200).json(updateDoctor)
    } catch (err) {
        res.status(401).json(err)
    }
}

// Edit appointments
exports.editAppointment = async (req, res) => {
    const { id } = req.params
    const userId = req.payload
    const { pName, pAge, pGender, pDate, pSlot, pMobNum, pEmail, pDept, pDoc } = req.body

    try {
        const updateAppointment = await doctors.findByIdAndUpdate({ _id: id }, { pName, pAge, pGender, pDate, pSlot, pMobNum, pEmail, pDept, pDoc, userId }, { new: true })
        await updateAppointment.save()
        res.status(200).json(updateAppointment)
    } catch (err) {
        res.status(401).json(err)
    }
}

// Delete departments
exports.deleteDepartment = async (req, res) => {
    const { id } = req.params
    try {
        const removeDept = await departments.findByIdAndDelete({ _id: id })
        res.status(200).json(removeDept)
    } catch (err) {
        res.status(401).json(err)
    }
}

// Delete doctor
exports.deleteDoctor = async (req, res) => {
    const { id } = req.params
    try {
        const removeDoc = await doctors.findByIdAndDelete({ _id: id })
        res.status(200).json(removeDoc)
    } catch (err) {
        res.status(401).json(err)
    }
}

// Delete patient
exports.deletePatient = async (req, res) => {
    const { id } = req.params
    try {
        const removePatient = await patients.findByIdAndDelete({ _id: id })
        res.status(200).json(removePatient)
    } catch (err) {
        res.status(401).json(err)
    }
}

// Accept appointment function
exports.acceptAppointment = async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    try {
        const acceptAppointment = await appointments.findByIdAndUpdate({ _id: id }, { status: 'approved' }, { new: true })
        await acceptAppointment.save()
        res.status(200).json(acceptAppointment)
    } catch (err) {
        res.status(401).json(err)
    }
}

// Reject appointment function
exports.rejectAppointment = async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    try {
        const rejectAppointment = await appointments.findByIdAndUpdate({ _id: id }, { status: 'rejected' }, { new: true })
        await rejectAppointment.save()
        res.status(200).json(rejectAppointment)
    } catch (err) {
        res.status(401).json(err)
    }
}

// Get doctors of selected department function
exports.getDocOfDept = async (req, res) => {
    try {
        const { pDept } = req.body
        console.log(req.body);
        const docOfDept = await doctors.find({ department: pDept })
        res.status(200).json(docOfDept)
        console.log(docOfDept);
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}