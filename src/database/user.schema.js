const { Schema } = require('mongoose');

module.exports = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: Number, unique: true },
  role: { type: String, default: 'user' },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
}, { timestamps: true });