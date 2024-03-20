// Import mongoose
const mongoose = require('mongoose')

// Access connectionString
const connectionString = process.env.DATABASE

// Connect server and database
mongoose.connect(connectionString).then(()=>{
    console.log('MongoDB conncected successfully');
}).catch((err)=>{
    console.log(`MongoDB failed to connect due to ${err}`);
})