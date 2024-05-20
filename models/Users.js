const mongoose = require('mongoose')


const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["Event Attendee", "Event Organizer"] },
    password: { type: String, required: true }
}, { timeStamps: true })

module.exports = mongoose.model("Users", UsersSchema)