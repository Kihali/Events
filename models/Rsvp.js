const mongoose = require('mongoose')


const RsvpSchema = new mongoose.Schema({
    title: { type: String, required: true },
    attendee: { type: Array, required: true },
    events: { type: String, required: true },

}, { timeStamps: true })

module.exports = mongoose.model("Rsvp", RsvpSchema)