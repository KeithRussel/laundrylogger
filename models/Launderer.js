const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LaundererSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('launderer', LaundererSchema);
