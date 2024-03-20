// Sets the path for resolving requests
// Works based on a class - router()

// 1.Import express
const express = require('express')

// Import controllers
const patientController = require('../Controllers/patientController')
const appointmentController = require('../Controllers/appointmentController')
const adminController = require('../Controllers/adminController')

// Import middleware
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const multerConfig = require('../Middleware/multerMiddleware')

// 2.Create an object for class Router() of express module
const router = new express.Router()

// 3.Path to resolve requests
// Syntax - router.httpreq('path',()=>{how to solve})

// User-side

// a) Register function
router.post('/patient/register', patientController.register)

// b) Login function
router.post('/patient/login', patientController.login)

// c) Appointment booking function 
router.post('/patient/appointment/book', jwtMiddleware, appointmentController.bookAppointment)

// d) Get patient appointment     
router.get('/patient/get-appointments', jwtMiddleware, appointmentController.getAppointment)

// e) Reschedule patient appointment     
router.put('/appointment/reschedule/:id', jwtMiddleware, appointmentController.rescheduleAppointment)

// e) Cancel patient appointment     
router.delete('/appointment/cancel/:id', jwtMiddleware, appointmentController.cancelAppointment)

// e) Update patient details     
router.put('/patient/editDetails', jwtMiddleware, multerConfig.single('profile'), patientController.editPatientProfile)

// e) Get doctor of selected department    
router.get('/department/get-doctor', jwtMiddleware, adminController.getDocOfDept)

// Admin-side

// a) Register function
router.post('/admin/register', adminController.registerAdmin)

// b) Login function
router.post('/admin/login', adminController.loginAdmin)

// c) Add-Department function 
router.post('/admin/department/add', jwtMiddleware, adminController.addDepartment)

// d) Add-Doctor function 
router.post('/admin/doctor/add', jwtMiddleware, adminController.addDoctor)

// e) Get departments    
router.get('/admin/get-departments', jwtMiddleware, adminController.getDepartments)

// f) Get doctors    
router.get('/admin/get-doctors', jwtMiddleware, adminController.getDoctors)

// g) Get patients     
router.get('/admin/get-patients', jwtMiddleware, patientController.getPatients)

// h) Get all appointments     
router.get('/admin/get-appointments', jwtMiddleware, appointmentController.getAllAppointments)

// i) Edit department details     
router.put('/adminedit/department/:id', jwtMiddleware, adminController.editDepartment)

// j) Edit doctor details     
router.put('/adminedit/doctor/:id', jwtMiddleware, adminController.editDoctor)

// k) Delete dept     
router.delete('/department/cancel/:id', jwtMiddleware, adminController.deleteDepartment)

// l) Delete doctors     
router.delete('/doctor/cancel/:id', jwtMiddleware, adminController.deleteDoctor)

// l) Delete patients     
router.delete('/patient/cancel/:id', jwtMiddleware, adminController.deletePatient)

// m) Accept appointment action     
router.put('/adminedit/accept-appointment/:id', jwtMiddleware, adminController.acceptAppointment)

// n) Reject appointment action     
router.put('/adminedit/reject-appointment/:id', jwtMiddleware, adminController.rejectAppointment)

// 4.Export router
module.exports = router 