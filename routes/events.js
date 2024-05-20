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
router.get('/id/:id', async (req, res) => {
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
router.get('//title/:title', async (req, res) => {
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
router.post('/create', async (req, res) => {
    try{
        const { title, category, description, image, maxAttendees } = req.body

        const newEvent = new Event ({ title, category, description, image, maxAttendees })

        // save the event in the database
        const savedEvent = await newEvent.save()

        res.status(200).json({ event: savedEvent })

    } catch (err) {
        res.status(500).json({ message: err })
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const { title, category, description, image, maxAttendees } = req.body;

        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: 'Invalid event ID' });
        }

        // Find the event by ID and creator
        const event = await Event.findOne({ _id: eventId, createdById: req.user._id });

        // Check if the event exists and the user is the creator
        if (!event) {
            return res.status(403).json({ message: 'Unauthorized: You are not the creator of this event or event not found' });
        }

        // Update the event using findByIdAndUpdate
        const updatedEvent = await Event.findByIdAndUpdate(eventId, {
            title,
            category,
            description,
            image,
            maxAttendees
        }, { new: true });

        // Check if the event was successfully updated
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ event: updatedEvent });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// endpoint to delete the events
router.delete('/delete/:id', async (req, res) => {
    const eventId = req.params.id

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ message: 'Invalid event ID' });
    }


})


module.exports = router