const mongoose = require("mongoose");

require('dotenv').config();

async function connectDB(dbConnected){ 
    if(dbConnected){
        return dbConnected;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB!");
        return true;
        }
    catch (e) {
        console.log("Error connecting to DB");
        console.log(e);
        return false;
    }
    
}

module.exports = { connectDB };