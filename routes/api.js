var Appointment = require("../models/appointment"),
    Image       = require("../models/image"),
    Logon       = require("../models/logon"),
    fs          = require("fs");


exports.updateApt = function (req, res, next) {
  Appointment.findByIdAndUpdate(req.params.id, req.body.apt, function(err, appt){
    if(err){
      console.log(err);
    }else {
      res.redirect("/admin/calendar");
    }
  });
};

exports.removeApt = function (req, res, next) {

};

exports.getPending = function (req, res, next) {

};

exports.getApt = function (req, res, next) {
  Appointment.findOne({_id: req.params.id}, function(err, apt){
    if(err) throw err;
    res.json(apt);
  });
};

exports.getAllApt = function(req, res, next) {
  Appointment.find({}, function(err, apts){
    if(err) throw err;
    res.json(apts);
  });
};


exports.getImageInfo = function(req, res, next) {
  Image.findById(req.params.id, function(err, image){
    if(err){
      console.log(err);
      return next();  // ???
    }else {
      res.json(image);
      return next();
    }
  });
};

exports.getAllImages = function(req, res, next){
  Image.find({}, function(err, images){
    if(err){
      console.log(err);
    }else {
      res.json(images);
    }
  });
};

exports.getHours = function(req, res, next) {
  fs.readFile('hours.json', function(err, data){
    if(err) throw err;
    res.send(JSON.parse(data));
    return next();
  });
};

exports.setHours = function(req, res, next) {
  let fileData = JSON.stringify(req.body.hourData);
  fs.writeFile('hours.json', fileData, function(err, data){
    if(err) throw err;
    res.send("Hours Updated");
    return next();
  });
}
