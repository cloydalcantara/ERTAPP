const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const incidentSchema = new Schema({
  name: {
    type: Schema.Types.ObjectId,
    ref: 'incident'
  },
  details: {
    type: String
  },
  long: {
    type: Number
  },
  lat: {
    type: Number
  },
  verified: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  address: String,
  verified: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

// Create a model
const Incident = mongoose.model('incidentList', incidentSchema);

// Export the model
module.exports = Incident;