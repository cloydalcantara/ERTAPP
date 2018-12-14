const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const safetySchema = new Schema({
  name: {
    type: Schema.Types.ObjectId,
    ref: 'incident'
  },
  details: {
    type: String
  },
  image: {
    type: String
  }
});

// Create a model
const Safety = mongoose.model('safety', safetySchema);

// Export the model
module.exports = Safety;