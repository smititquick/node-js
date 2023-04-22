const mongoose = require('mongoose');

const model = new mongoose.Schema({
    "fName": { type: String, default: null },
    "lName": { type: String, default: null },
    "email": { type: String, unique: true }
})