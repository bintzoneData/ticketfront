const mongoose = require('mongoose');
const itemSchema = mongoose.Schema({
  code: {
    type: String,
    required: [true, 'please add a code'],
  },
  description: {
    type: String,
    required: [true, 'please  add a description'],
  },
  warranty: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    required: [true, 'please add category'],
    enum: ['tv', 'woofer', 'fridge'],
  },
});
module.exports = mongoose.model('Item', itemSchema);
