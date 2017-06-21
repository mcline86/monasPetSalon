const mongoose = require('mongoose');

var apptSchema = new mongoose.Schema({
  owner: String,
  pet: String,
  breed: String,
  phone: String,
  email: String,
  timeSlot: Number,
  date: String,
  about: String
});

module.exports = mongoose.model("Appointment", apptSchema);
