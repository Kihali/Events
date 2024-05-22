const mongoose = require('mongoose')


const UsersSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    phoneNumber: { type: String },
    poBox: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timeStamps: true })

module.exports = mongoose.model("Users", UsersSchema)