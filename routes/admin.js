var Appointment = require("../../models/appointment"),
    Image       = require("../../models/image"),
    Logon       = require("../../models/logon");

exports.cp = function (req, res, next) {
  //TODO: load data for cp
  res.render("admin/index");
};