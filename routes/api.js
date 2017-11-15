var Appointment = require("../models/appointment"),
    Image       = require("../models/image"),
    Logon       = require("../models/logon");


exports.updateApt = function (req, res, next) {

};

exports.removeApt = function (req, res, next) {

};

exports.getPending = function (req, res, next) {

};

exports.getApt = function (req, res, next) {

};


exports.getImageInfo = function(req, res, next) {
  Image.findById(req.params.id, function(err, image){
    if(err){
      console.log(err);
      return next();  // ??
    }else {
      res.json(image);
      return next();
    }
  });
};
