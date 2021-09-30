const { Schema, Mongoose } = require('mongoose');

module.exports = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: String,
  author: String,
  completed: Boolean,
  category: String

}, { timestamps: true });

