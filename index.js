// 1.Import dotenv - Loads .env file contents into process.env by default.
require('dotenv').config()

// 2.Import express
const express = require('express')

// 3.Import cors
const cors = require('cors')

    // Import router
    const router = require('./Routing/Router')

    // Import Connection.js
    require('./DB/Connection')

// 4.Create server - Creates an Express application.
const healthiFyServer = express()

// 5.Use of CORS by server
healthiFyServer.use(cors())

// 6.Parsing json (use .json() always after using cors)
healthiFyServer.use(express.json())

    // Use of router by server
    healthiFyServer.use(router)

    // Server using upload folder
    healthiFyServer.use('/Uploads', express.static('./Uploads'))

// 7.Customise port
const PORT = 4000 || process.env

// 8.Run server
healthiFyServer.listen(PORT, () => {
    console.log(`HEALTHIFY SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

// Get request
healthiFyServer.get('/', (req, res) => {
    res.send(`<h1>Healthify server is running succesfully and is ready to accept requests</h1>`)
})

/* // Post request
healthiFyServer.post('/',(req,res)=>{
    res.send(`Post request`)
})

// Put request
healthiFyServer.put('/',(req,res)=>{
    res.send(`Put request`)
}) */