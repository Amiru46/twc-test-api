const mongoose = require("mongoose");

const ContactShema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    name: {type: String, required : true },
    phone: {type: String, required: true},
    emale: {type: String, required: true},
    gender: {type:String, required:true, enum: ["Male", "Female"]},
});

model.exports = mongoose.model("Contact", ContactShema);