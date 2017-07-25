var Appointment   = require("../models/appointment"),
    Image         = require("../models/image"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    mongoose      = require("mongoose"),
    Logon         = require("../models/logon");



exports.cp = function (req, res, next) {
  //TODO: load data for cp
  res.render("admin/index");
};

exports.calPage = function (req, res, next) {
  res.render("admin/calendar");
};

exports.gallery = function (req, res, next) {
  res.render("admin/gallery");
};

exports.pending = function(req, res, next) {
  res.render("admin/pending");
};
