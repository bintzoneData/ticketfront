const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
  category: {
    type: String,
    required: [true, 'please add category'],
  },
});
module.exports = mongoose.model('Category', categorySchema);
