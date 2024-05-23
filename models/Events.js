const mongoose = require('mongoose')


const EventsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    maxAttendees: { type: Number, required: true },
    price: { type: String, required: true },
    link: {type: String },
    // location: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
}, { timeStamps: true })

module.exports = mongoose.model("Events", EventsSchema)