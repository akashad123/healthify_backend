// Import multer
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './Uploads')
    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null, filename)
    }
})

const fileFilter = (req, file, callback) => {
    // mimetype provides information about the type of file being uploaded
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true)
    }
    else {
        callback(null, false)
        return callback(new Error("Only png,jpg,jpeg files are allowed"))
    }
}

const multerConfig = multer({
    storage,   // specifies the folder at which the files will be stored
    fileFilter // types of files which are allowed to be uploaded
})

module.exports = multerConfig