//==================================================
//                  Image Info
//==================================================
var imagesSizeOnDisk;
var images = [];
  $(document).ready(function() {
    $.ajax({
      url: "/admin/gallerySOD",
      success: function(data){
        imagesSizeOnDisk = data / 1024;
        $('#imgSOD').html(imagesSizeOnDisk.toFixed(2) + "KB");
      },
      complete: function(){

      }
    });

    $.ajax({
      url: "/image/all",
      success: function(data){
        parseImageData(data);
      }
    });

  });


  function parseImageData(array){
    var inGallery = [];
    var inSlideShow = [];
    var total = [];
    array.forEach(function(img){
      if(img.inGallery) inGallery.push(img);
      if(img.inSlider) inSlideShow.push(img);
      total.push(img);
    });

    $('#imgTot').html(total.length);
    $('#imgGallery').html(inGallery.length);
    $('#imgSlide').html(inSlideShow.length);
  }

//==================================================
//              Appointment Info
//==================================================
var pendApt = [];
var openApt = [];
var aptToday = [];


$.ajax({
  url: "/api/getAppointments",
  success: function(data){
    for(let i = 0; i < data.length; i++){
      switch(data[i].status){
        case 'pending':
        pendApt.push(data[i]);
        break;
        case 'open':
          openApt.push(data[i]);
          let date = moment(data[i].date);
          let today = moment(new Date());
          if(today.diff(date, 'days') < 1){
            aptToday.push(data[i]);
          }
        break;
        default:
        break;
      }
    }
  },
  complete: function(){
    $('#allOpen').html(openApt.length);
    $('#todayApt').html(aptToday.length);
    $('#pendingApt').html(pendApt.length);
  }
});

//==================================================
//              Hours Info
//==================================================
var hourData;

$.ajax({
  url:"/info_hours",
  success: function(data){
    hourData = data;
    updateHrsPanel(data);
  }
});

function updateHrsPanel(data){
  $('#monInfo').html(hourString(data['Monday']));
  $('#tuesInfo').html(hourString(data['Tuesday']));
  $('#wedInfo').html(hourString(data['Wednesday']));
  $('#thuInfo').html(hourString(data['Thursday']));
  $('#friInfo').html(hourString(data['Friday']));
  $('#satInfo').html(hourString(data['Saturday']));
  $('#sunInfo').html(hourString(data['Sunday']));
}

function hourString(day){
  if(day.open == 'true'){
    return day.start + " - " + day.end;
  }else {
    return "Closed";
  }
}

$('.p-switch').on('click', function(e){
  let row = $(e.target).parent().parent().parent();
  if($(row).find('input').eq(0).prop('checked')){
    $(row).find('input').eq(1).attr('readOnly', false);
    $(row).find('input').eq(2).attr('readOnly', false);
  }else {
    $(row).find('input').eq(1).attr('readOnly', true);
    $(row).find('input').eq(2).attr('readOnly', true);
  }
});

function updateHoursForm() {
  let row = $('.form-row');
  let day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  for(let i = 0; i < row.length; i++){
    if(hourData[day[i]].open == 'true'){
      $(row[i]).find('input').eq(0).prop('checked', true);
      $(row[i]).find('input').eq(1).val(hourData[day[i]].start);
      $(row[i]).find('input').eq(2).val(hourData[day[i]].end);
    }else {
      $(row[i]).find('input').eq(0).prop('checked', false);
      $(row[i]).find('input').eq(1).attr('readOnly', true).val(hourData[day[i]].start);
      $(row[i]).find('input').eq(2).attr('readOnly', true).val(hourData[day[i]].end);
    }
  }
}

$('#saveHours').on('click', function(e){
  let row = $('.form-row');
  let day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  for(let i = 0; i < row.length; i++){
    hourData[day[i]].open = $(row[i]).find('input').eq(0).prop('checked');
    hourData[day[i]].start = $(row[i]).find('input').eq(1).val();
    hourData[day[i]].end = $(row[i]).find('input').eq(2).val();
  }
  $.post({
    url: "/info_hours",
    data:{
      "hourData": hourData
    },
    success: function(data){
        console.log("success");
        location.reload();
    }
  });
});

$('#edHrsBtn').on('click', function(e){
  $('#hoursModal').modal('show');
  updateHoursForm();
});
