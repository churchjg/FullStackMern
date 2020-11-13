const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "have to put in a name"]
    },
    email:{
        type: String,
        required: [true, "need a valid email"],
        unique: [true, "cannot repeat emails"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "a password is required"],
        minlength: 8,
        select: false
    }
})

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.comparePasswords = async function(candidate, userPassword){
    return await bcrypt.compare(candidate, userPassword)
}

const User = mongoose.model("User", userSchema)

module.exports = User;
