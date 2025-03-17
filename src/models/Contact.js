const mongoose = require("mongoose");

const ContactShema = new mongoose.Schema({
    fullName: {type: String,required: true,},
    gender: {type: String,required: true,},
    email: {type: String,required: true,},
    phoneNumber: {type: String,required: true,},
    user: {type: mongoose.Schema.Types.ObjectId,ref: 'User',},
    });

module.exports = mongoose.model("Contact", ContactShema);