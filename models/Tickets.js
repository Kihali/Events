const mongoose = require('mongoose')


const ticketsSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true },
    ticketNumber: { type: String, required: true },
    event: { type: String, required: true },
    qrCode: { type: String, required: true }

}, { timeStamps: true })

module.exports = mongoose.model("Tickets", ticketsSchema)