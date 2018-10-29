// Imports express into our app and sets it up for use
const express = require('express');
const path = require('path');

const app = express();

// Defines a PORT for the server to listen for requests
const PORT = 5000;

// Sets up our server to parse our request body for usage
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets our server to use the public directory for static assets
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// -----------------
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

// Starts our server on the predefined PORT
app.listen((process.env.PORT || 5000), () => {console.log(`App is now listening on PORT ${PORT}`)});//for deploy on heroku
