const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email field is required'],
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // restricts the role to either 'user' or 'admin'
    default: 'user',
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;