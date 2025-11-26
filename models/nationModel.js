const mongoose = require("mongoose");

const nationSchema = new mongoose.Schema({
    name:String,
    isocode3:String,
    flagURL:String
})

const Nation = mongoose.model("Nation" , nationSchema);

module.exports = { Nation }