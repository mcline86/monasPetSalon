const mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  name: String,
  about: String,
  file: String,
  thumb: String,
  inSlider: Boolean,
  inGallery: Boolean
});

module.exports = mongoose.model("Image", imageSchema);
