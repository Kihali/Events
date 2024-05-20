const mongoose = require('mongoose')


const EventsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    maxAttendees: { type: Number, required: true }
}, { timeStamps: true })

module.exports = mongoose.model("Events", EventsSchema)