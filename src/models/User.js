const mongoose = require("mongoose");

const UserSchema =  new mongoose.Schema({
    name : { type: String, required: true },
    email: { type:String, required: true, unique: true},
    password: {type: String, required: true },},
    { timestamps: true});

    UserSchema.pre('save', async function (next) {
        if (this.isModified('password')) {
          this.password = await bcrypt.hash(this.password, 8);
        }
        next();
      });

module.exports = mongoose.model("User", UserSchema);