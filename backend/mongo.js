const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    Address: String,
    password: String
})

const userModel = mongoose.model('UserInfo', userSchema);

module.exports = {userModel}