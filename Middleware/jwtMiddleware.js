const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {

    console.log('Inside jwt middleware');
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try {
        const jwtRespone = jwt.verify(token, "supersecretkey12345") // Returns an object - data that you've passed secretly, iat
        console.log(jwtRespone);
        req.payload = jwtRespone.userId
        next() // Control is moved to appointmentController only after successful verification of jwt
    } catch (err) {
        res.status(401).json('Authorisation failed , please login')
    }
}

module.exports = jwtMiddleware