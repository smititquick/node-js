const mongoose = require('mongoose');

const Employee = mongoose.Schema({
    "employee_name" : { type : String },
    "email" : { type : String },
    "mobile" : { type : String },
    "address" : { type : String },
    "city" : { type : String },
    "state" : { type : String },
})

module.exports = mongoose.model("Employee" , Employee);