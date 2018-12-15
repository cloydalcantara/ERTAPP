const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/ERTAPP', { useMongoClient: true });
} else {
  mongoose.connect('mongodb://localhost/ERTAPP', { useMongoClient: true });
}

const app = express();
app.use(cors());

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

// Routes
app.use('/bfp-api', require('./routes/users'));
app.use('/bfp-api', require('./routes/agency-registration'));
app.use('/bfp-api', require('./routes/incident-management'));
app.use('/bfp-api', require('./routes/safety'));
app.use('/bfp-api', require('./routes/incident'));

module.exports = app;
