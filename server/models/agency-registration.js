const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const agencySchema = new Schema({
  name:{
    type: String,
    unique: true
  },
  description:{
    type: String
  },
  address: {
    type: String
  },
  long: {
    type: String
  },
  lat: {
    type: String
  },
  status: Boolean
});

// Create a model
const Agency = mongoose.model('agency', agencySchema);

// Export the model
module.exports = Agency;