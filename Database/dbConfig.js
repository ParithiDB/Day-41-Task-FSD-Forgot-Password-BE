const mongoose = require('mongoose');
const BASE_URL = `${process.env.DATABASE_CONNECTION_URL}`;


mongoose.connect(BASE_URL)
.then(response => {
    console.log("DATABASE CONNECTION SUCCESSFULL");
})
.catch(err => {
    console.log("DATABASE CONNECTION FAILED");
})