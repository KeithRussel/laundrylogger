// import moment from 'moment';
const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const d = Date(Date.now());
// let a = d.toString();

const LogSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  message: {
    type: String,
    required: true,
  },
  kilo: {
    type: Number,
    required: true,
  },
  attention: {
    type: Boolean,
    default: false,
  },
  launderer: {
    type: String,
  },
  date: {
    type: String,
    default: Date(Date.now()),
  },
  // date: {
  //   type: Date,
  //   default: Date.now(),
  // },
});

module.exports = mongoose.model('log', LogSchema);
