const router = require('express').Router()
const User = require('../models/Users')
const bcrypt = require('bcrypt')


// User registration route
router.post('/register', async (req, res) => {
    try { 
        // Extract email and password from body
        const { name, role, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            role,
            password: hashedPassword
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Respond with the saved user (excluding the password)
        res.status(200).json({
            _id: savedUser._id,
            name: savedUser.name,
            role: savedUser.role,
            email: savedUser.email,
        });

    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// user login route
router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body

        // find the user by email
        const existingUser = await User.findOne({ email })
        if(!existingUser) {
            return res.status(404).json({ mesaage: "User does not exist" });
        }

        // compare the password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        // create a session
        req.session.userId = existingUser._id

        // successful user login message
        res.status(200).json({ message: `${req.body.email} successfully logged in` })

    } catch (err) {
        res.status(500).json(err)
    }
})

// User logout route
router.post('/logout', async (req, res) => {
    try{
        req.session.destroy((err) => {
            if(err) {
                return res.status(500).json({ message: 'Failed to logout' })
            }
            res.clearCookie('connect.sid'); // 
            res.status(200).json({ message: 'Logged out successfully' })
        })

    } catch (err) {
        res.status(500).json({ message: err })
    }
})

module.exports = router