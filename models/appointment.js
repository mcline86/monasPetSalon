const mongoose = require('mongoose');

var apptSchema = new mongoose.Schema({
  name: String,
  dog: String,
  breed: String,
  timeSlot: String,
  date: Date,
  about: String
});

module.exports = mongoose.model("Appointment", apptSchema);
