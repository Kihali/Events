const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const MongoStore = require('connect-mongo');
const { fileURLToPath } = require('url');
const jwt = require('jsonwebtoken');

// Import routes
const authRoute = require("./routes/auth");
const eventsRoute = require("./routes/events");
const usersRoute = require("./routes/users");
const ticketsRoute = require("./routes/tickets");


dotenv.config(); // Load the environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL)
.then(() => console.log('Connected to MongoDB...'))
.catch((err) => console.log(err));

app.use(express.json());



// Serve static files
const staticFilesDirectory = path.join(__dirname, 'static');
app.use(express.static(staticFilesDirectory));


// Middlware
// JWT middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


// // Redirect to login page for unauthorized access
// app.use((req, res, next) => {
//     res.status(403).sendFile(path.join(__dirname, 'pages', 'login.html'));
// });



// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages','home.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'register.html'));
});
//========== Protected Routes
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'profile.html'));
});
app.get('/create-event', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'create-event.html'));
});
app.get('/my-events', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'my-events.html'));
});
app.get('/event', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'event.html'));
});



// API routes
app.use("/api/auth", authRoute);
app.use("/api/events", eventsRoute);
app.use("/api/users", usersRoute);
app.use("/api/tickets", ticketsRoute);


// Running PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});