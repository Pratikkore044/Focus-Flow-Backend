
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },

    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false
    }
  },
    {
  timestamps: true
    
});


module.exports = mongoose.model('User', userSchema);