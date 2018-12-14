const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const incidentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  details: {
    type: String
  },
  image: {
    type: String
  }
});

// Create a model
const Incident = mongoose.model('incident', incidentSchema);

// Export the model
module.exports = Incident;