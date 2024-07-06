const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  countdown: {
    type: Number,
    default: 86400, 
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
