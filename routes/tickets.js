const router = require('express').Router()
const Ticket = require('../models/Tickets')
const jwt = require('jsonwebtoken')
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');


router.post('/', async (req, res) => {
    const { firstName, secondName, email, event } = req.body

    try{
        // generate a unique ticket number
        const ticketNumber = uuidv4();

        // generate a qrcode for the data
        const qrData = JSON.stringify({ firstName, secondName, email, ticketNumber, event })
        const qrCode = await QRCode.toDataURL(qrData);

        // create a new ticket
        const newTicket = ({ firstName, secondName, email, ticketNumber, event, qrCode })

        // save ticket to the database
        const savedTicket = await newTicket.save();

        // respond with the saved ticket
        res.status(201).json(savedTicket);
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

module.exports = router