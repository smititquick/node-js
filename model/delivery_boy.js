const mongoose = require('mongoose');

const DeliveryBoy = mongoose.Schema({
    "delivery_boy_name" : { type : String },
    "email" : { type : String },
    "mobile" : { type : String },
    "address" : { type : String },
    "city" : { type : String },
    "state" : { type : String },
})

module.exports = mongoose.model("DeliveryBoy" , DeliveryBoy);