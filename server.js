const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./devServer/routes');
const app = express();

// Setup logger
app.use(morgan('dev'));

// Use bodyParser to get all data/stuff from a POST
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// Serve static assets
const staticDir = process.env.NODE_ENV === 'production' ? 'dist.prod' : 'dist.dev'; // get static files dir
app.use(express.static(__dirname + '/' + staticDir)); // set the static files location, /public/img will be /img for users

// configure routes
routes(app);

// Set up port
const PORT = process.env.PORT || 3000;

// start app
app.listen(PORT, function() {
  console.log('Listening on port ' + PORT + '!');
});

module.exports = app;
