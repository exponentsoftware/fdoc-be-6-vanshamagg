const { Schema } = require('mongoose');

const StatSchema = new Schema({
  todo: {
    type: Schema.Types.ObjectId,
    ref: 'Todo',
    required: true
  },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 }
});

module.exports = StatSchema