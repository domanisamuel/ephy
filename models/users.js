// model
const mongoose = require('mongoose');

// schema setup
const userSchema = mongoose.Schema({
    username: { type:String, required: true},
    email: { type:String, required: true, unique:true },
    phone: { type:String, required: true },
    auth_date: { type:Date, default: Date.now }
})

// export user model
const User = mongoose.model(`User`, userSchema)
module.exports = User;