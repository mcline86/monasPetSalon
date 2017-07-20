var Appointment = require("../models/appointment"),
    Image       = require("../models/image"),
    Logon       = require("../models/logon");


exports.newAppointment = function (req, res, next) {
  Appointment.find({date: req.body.apt.date}, function (err, apts) {
    if(err) {
      req.flash("error", err.toString());
      res.redirect("back");
    }
    else {
      let sched = 0;
      let slot = req.body.apt.timeslot;
      for(let i = 0; i < apts.length; i++) {
        if(apts[i].timeslot == slot) sched++;
      }
      if(sched > 1) {
        req.flash("error", "We Appologize, that particular time has already been filled. Please choose another time or day. Thank you.");
        res.redirect("back");
      }
      else {
        Appointment.create(req.body.apt, function (err, apt) {
          if(err) {
            req.flash("error", err.toString());
            res.redirect("back");
          }
          else {
            req.flash("info", "    Your request is being processed, we will contact you using the provided information to confirm your time and date. Thank you for your patience.");
            res.redirect("/calendar");
          }
        });
      }
    }
  });
};

exports.updateAppointment = function (req, res, next) {
  Appointment.findByIfAndUpdate(req.params.id, req.body.apt, function (err, apt) {
    if(err) {
      req.flash("error", err.toString());
      res.redirect("back");
    }
    else {

    }
  });
};
