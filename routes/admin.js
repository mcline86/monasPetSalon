var Appointment   = require("../models/appointment"),
    Image         = require("../models/image"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    mongoose      = require("mongoose"),
    Logon         = require("../models/logon"),
    gm            = require('gm'),
    _             = require('lodash'),
    formidable    = require('formidable'),
    path          = require('path'),
    fs            = require('fs'),
    async         = require('async'),
    util          = require('util'),
    spawn         = require('child_process').spawn;


exports.cp = function (req, res, next) {
  res.render("admin/index");
};

exports.calPage = function (req, res, next) {
  res.render("admin/calendar");
};

exports.gallery = function (req, res, next) {
  Image.find({}, function(err, images) {
    if(err){
      console.log(err);
    }else {
      res.render("admin/gallery", {images: images});
    }
  });
};

exports.pending = function(req, res, next) {
  res.render("admin/pending");
};


// Image Upload Route
exports.upload = function(req, res) {
  var form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, "../public/images/uploads");
  form.on('file', function(field, file) {

  });

  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  form.on('end', function(fields, files) {
    _.each(this.openedFiles, function(file) {
      let thumbDir = path.join(__dirname, "../public/images/thumbnails/");
      Image.create({}, function(err, img) {
        img.name = file.name;
        let tmp = file.name.split('.');
        let newName = img._id + '.' + tmp[tmp.length -1];
        img.file = "/images/uploads/" + newName;
        img.thumb = "/images/thumbnails/" + newName;
        img.inGallery = true;
        img.save();
        fs.rename(file.path, path.join(form.uploadDir, newName), function() {
          gm(path.join(form.uploadDir, newName)).identify(function(err, data) {
            if(err) {
              console.log(err);
            }
            let w = data.size.width;//   Width
            let d = w / 150; //          Divisor
            let h = data.size.height;//  Height
            gm(data.path).resize(w / d, h / d).write(thumbDir + newName, (err) => {
              if(err) console.log(err);
            });
          });
        });
      });
    });
    res.end('success');
  });

  form.parse(req, function(err, fields, files) {
  });
  res.send("finished");
};


exports.getImageInfo = function(req, res){
  Image.findOne({_id: req.params.id}, function(err, image){
    if(err){
      console.log(err);
    }else {
      res.json(image);
    }
  });
};

exports.updateImage = function(req, res){
  let formData = req.body.image;
  Image.findByIdAndUpdate(req.params.id, req.body.image, function(err, image) {
    if(err) {
      res.redirect("/admin");
    }else {
      image.inSlider = false;
      image.inGallery = false;
      if(formData.inSlider) { image.inSlider = true;  }
      if(formData.inGallery){ image.inGallery = true; }
      image.save();
      res.redirect("/admin/gallery");
    }
  });
};

exports.removeImage = function(req, res){
  var ID = req.params.id;
  Image.findOne({_id: ID}, function(err, img){
    if(err){
      console.log(err);
    } else {
      let publicDir = path.join(__dirname, "../public");
      fs.unlinkSync(publicDir + img.file);
      fs.unlinkSync(publicDir + img.thumb);
      Image.remove({_id: ID}, function(err){  if(err){ console.log(err); }  });
      res.redirect("/admin");
    }
  });
};


exports.GallerySizeOnDisk = function(req, res, next){
  let u = path.join(__dirname, "../public/images/uploads/");
  let t = path.join(__dirname, "../public/images/thumbnails/");
  var total = 0;
  getTotalSize(u, function(tot){
    total = tot;
    getTotalSize(t, function(thumbTot){
      res.json(total + thumbTot);
    });
  });
};

function getTotalSize(folder, cb){
  let fileArray = fs.readdirSync(folder, function(err, files) {
    if(err) throw err;
    return files;
  });
  var totalSizeBytes = 0;
  var sizeOfFile = function(index){
    fs.stat(folder + fileArray[index], function(err, stats){
      if(err) throw err;
      if(stats.isFile()) { totalSizeBytes += stats.size; }
      if(index == fileArray.length - 1){
        return cb(totalSizeBytes);
      }else {
        return sizeOfFile(index + 1);
      }
    });
  };
  sizeOfFile(0);
}
