// Logic to resolve requests

// Import model
const patients = require("../Modals/patientSchema");

// Import JWT
const jwt = require('jsonwebtoken')

// Register function - logic  
exports.register = async (req, res) => {

    console.log('Inside patientcontroller register function');
    // Extract data from request body, this is possible only because json is converted into js objects in index.js (step no 6)
    const { username, email, password } = req.body

    try {
        const existingUser = await patients.findOne({ email }) // 'patients' here is not collectionName, it is modelName
        if (existingUser) {
            res.status(406).json('Your email is already registered, please login')
        }
        else {
            // Create object for the model - to add data
            const newUser = new patients({
                username,
                email,
                password,
                age: "",
                mobilenumber: "",
                profile: ""
            })
            // Use save function in mongoose - to permanently store data in mongodb
            await newUser.save()
            // Response
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(401).json('Register request failed due to ', err);
    }
}

// Login function
exports.login = async (req, res) => {
    console.log('Inside patientcontroller login function');
    const { email, password } = req.body

    try {
        const existingUser = await patients.findOne({ email, password })
        console.log(existingUser);

        if (existingUser) {

            const token = jwt.sign({ userId: existingUser._id }, "supersecretkey12345") // {data that is sent in token},"key on which token is generated"

            res.status(200).json({
                existingUser,
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

// Edit patient profile
exports.editPatientProfile = async (req, res) => {
    const userId = req.payload
    const { username, email, password, age, mobilenumber, profile } = req.body
    const profileImage = req.file ? req.file.filename : profile

    try {
        const updateDetails = await patients.findByIdAndUpdate({ _id: userId }, { username, email, password, age, mobilenumber, profile: profileImage }, { new: true })

        await updateDetails.save()
        res.status(200).json(updateDetails)

    } catch (err) {
        res.status(401).json(err)
    }
}

// Get patients function
exports.getPatients = async (req, res) => {
    try {
        const allPatients = await patients.find()
        res.status(200).json(allPatients)
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`)
    }
}