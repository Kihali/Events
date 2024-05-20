const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
// import of routes
const authRoute = require("./routes/auth")
const eventsRoute = require("./routes/events")
const usersRoute = require("./routes/users")

dotenv.config(); // Load the environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL)
.then(console.log('connected to MongoDB...'))
.catch((err) => console.log(err))

app.use(express.json())

// configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URL }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))


// Basic route
app.get('/', (req, res) => {
    res.send('Hello world');
});

// api routes
app.use("/api/auth", authRoute)
app.use("/api/events", eventsRoute)
app.use("/api/users", usersRoute)

// Running PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
