const router = require('express').Router()
const Event = require('../models/Events')
const User = require('../models/Users')

// get all events in the database
router.get('/', async (req, res) => {
    try{
        const events = Event.find()

        res.status(200).json(events)
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

// get events based on category
router.get('/:category', async (req, res) => {
    try{
        const category = req.params.category

        const events = Event.find({ category: category })
        if(!events) {
            return res.status(404).json({ message: 'There are no events under this category' })
        }

        res.status(200).json({ events })

    } catch (err) {
        res.status(500).json({ message: err })
    }
})

// get events based on id
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id

        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid event ID' });
        }

        // find the event with the specified id
        const event = Event.findOne({ _id: id })

        //check if event was found
        if(!event) {
            return res.status(404).json({ message: 'Event not found' })
        }

        res.status(200).json({ event })// respond with the event found

    } catch (err) {
        res.status(500).json({ message: err })
    }
})

// get events based on title
router.get('/:title', async (req, res) => {
    try{
        const title = req.params.title

        const events = Event.findOne({ title: title })
        if(!events) {
            return res.status(404).json({ message: 'Event not found' })
        }

        res.status(200).json({ events })

    } catch (err) {
        res.status(500).json({ message: err })
    }
})



// Endpoints to create update and delete
// Create new event
router.post('/create-event', async (req, res) => {
    try{
        const { title, description, image, maxAttendees, price, link, location, date, startTime, endTime } = req.body

        const newEvent = new Event ({ title, description, image, maxAttendees, price, link, location, date, startTime, endTime })

        // save the event in the database
        const savedEvent = await newEvent.save()

        res.status(200).json({ event: savedEvent })

    } catch (err) {
        res.status(500).json({ message: err })
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const eventId = req.params.id

        // extract the user Id from the JWT token request header
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodeToken._id;

        //find the event by ID
        const event = await Event.findById(eventId);

        //check if the event exists
        if(!event){
            res.status(404).json({ message: "Event not found " })
        }

        // check if the user id matches the creators id of the event
        if(event.creator.toString() !== userId) {
            return res.status(403).json({ message: "Only the creator can update the event" })
        }

        // Update the event within the new date
        event.title = req.body.title || event.title;
        event.description = req.body.description || event.description;
        event.image = req.body.image || event.image;
        event.maxAttendees = req.body.maxAttendees || event.maxAttendees;
        event.price = req.body.price || event.price;
        event.link = req.body.link || event.link;
        event.location = req.body.location || event.location;
        event.date = req.body.date || event.date;
        event.startTime = req.body.startTime || event.startTime;
        event.endTime = req.body.endTime || event.endTime;

        // save the updated event
        const updatedEvent = await event.save()

        // respond with the updated event
        res.status(200).json({ message: err.message })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


// endpoint to delete the events
router.delete('/delete/:id', async (req, res) => {
    try {
        const eventId = req.params.id

        // Extract the userID from jwt token in the request header
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken._id;

        // Find event by ID
        const event = await Event.findById(eventId)

        //check if event exists
        if(!event) {
            return res.status(403).json({ message: 'Only the creator can delete the event' });
        }

        // delete the event
        await event.remove()

        //respond with a success message
        res.status(200).json({ message: 'Event deleted successfully' })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router