/* eslint-disable func-names */
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  firstCommand: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Команда 1',
  },
  secondCommand: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Команда 2',
  },
  isRunning: {
    type: Boolean,
    default: false,
  },
  isPaused: {
    type: Boolean,
    default: false,
  },
  period: {
    type: Number,
    default: 1,
  },
  seconds: {
    type: Number,
    default: 0,
  },
  minutes: {
    type: Number,
    default: 12,
  },
  firstCommandScore: {
    type: Number,
    default: 0,
  },
  secondCommandScore: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('match', matchSchema);
