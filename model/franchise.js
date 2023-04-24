const mongoose = require('mongoose');

const Franchise = mongoose.Schema({
    "franchise_name" : { type : String },
    "email" : { type : String },
    "mobile" : { type : String },
    "address" : { type : String },
    "city" : { type : String },
    "state" : { type : String },
})

module.exports = mongoose.model("Franchise" , Franchise);