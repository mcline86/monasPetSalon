const mongoose = require('mongoose');

var logonSchema = new mongoose.Schema({
  name: String,
  password: String,
  last: Date
});

module.exports = mongoose.model("Logon", logonSchema);
