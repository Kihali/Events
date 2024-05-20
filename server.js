const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const MongoStore = require('connect-mongo');
const { fileURLToPath } = require('url');

dotenv.config(); // Load the environment variables

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_DB_URL)
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch((err) => console.log(err));

app.use(express.json());

// // Configure session middleware
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URL }),
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }));



// Serve static files
const staticFilesDirectory = path.join(__dirname, 'static');
app.use(express.static(staticFilesDirectory));



// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'register.html'));
});
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'profile.html'));
});
app.get('/create-event', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'create-event.html'));
});
app.get('/my-events', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'my-events.html'));
});



// Import routes
const authRoute = require("./routes/auth");
const eventsRoute = require("./routes/events");
const usersRoute = require("./routes/users");

// API routes
app.use("/api/auth", authRoute);
app.use("/api/events", eventsRoute);
app.use("/api/users", usersRoute);

// Running PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});