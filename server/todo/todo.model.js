const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    isCompleted: {
      type: Boolean,
      default: false
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: [true, 'User is required']
    }
  },
  { timestamps: true }
);
const Todo = mongoose.model('Todos', todoSchema);
module.exports = Todo;
