


buildCal(moment(new Date()));

var CalendarDate;

function buildCal (calDate){
  let cal = $("#calBox");
  CalendarDate = calDate.clone();
  cal.html("<h1>" + moment(calDate).format("MMMM, YYYY") +
  "<span id='nextMonth' class='btn btn-outline-primary pull-right'>Next</span>"+
  "<span id='prevMonth' class='btn btn-outline-primary pull-right'>Prev</span> </h1>");

  if(CalendarDate.add(-1, "M").endOf("month").isBefore(moment(new Date()))){
    $('#prevMonth').addClass('disabled');
    CalendarDate.add(1, "M"); //reset CalendarDate Variable
  }else {
    $('#prevMonth').removeClass('disabled');
    CalendarDate.add(1, "M"); //reset CalendarDate Variable
  }


  var days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  for(let i = 0; i < days.length; i++){
    if(i == 0){
      cal.append("<div class='calHead calLeft'><strong>" + days[i] + "</strong></div>");
    }
    else {
      cal.append("<div class='calHead'><strong>" + days[i] + "</strong></div>");
    }
  }
  for(let row = 0; row < 6; row++){
    for(let col = 0; col < 7; col++){
      let Day;
        if(col == 0) {
          Day = "<div class='calDay calLeft disabled'> &nbsp; </div>";  // if is on left add calLeft
          if(row == 5){
            Day = "<div class='calDay calLeft botLeft disabled'> &nbsp; </div>"; // if is at bottom left
          }
        }
        else {
          Day = "<div class='calDay disabled'> &nbsp; </div>";
        }
        cal.append(Day);
    } // col for loop
  }// row for loop


  fillCal(calDate);
}

function fillCal(calDate){
  let days = $('div.calDay');
  let today = moment(new Date());
  let current = moment(calDate).date(1);
  let firstBox = moment(calDate).startOf('month').day();
  current.add((firstBox * -1), 'd');
  for(let day = 0; day < days.length; day++){
    if(current.isSame(today, "date")){   $(days[day]).addClass("today");   }
    if(current.month() == calDate.month()) {
      $(days[day]).removeClass("disabled");
      $(days[day]).attr('data-date', current.format("MM/DD/YYYY"));
    }
    $(days[day]).html(current.date());
    current.add(1, "day");
  }
  $("div.calDay").on("click", (e) => {
    if($(e.target).hasClass("disabled") == false){
      $("div.calDay").removeClass("selected");
      let date = $(e.target).data('date');
      $(e.target).addClass("selected");
      buildForm(date);
    }
  });

  $('#nextMonth').on('click', function(e){
    buildCal(CalendarDate.add(1, "M"));
    console.log(CalendarDate);
  });

  $('#prevMonth').on('click', function(e){
    if(CalendarDate.add(-1, "M").isBefore(moment(new Date()))){
      buildCal(moment(new Date()));
    }else{
      buildCal(CalendarDate);
    }
  });
}


function buildForm(date){
  $('#aptDate').val(moment(date).format("MM/DD/YYYY"));
  $('.new-order').modal().show();
  $('#dateBox').html(date);
  
  if(moment(date).isBefore(moment(new Date()))) {
    $('#aptSubmit').hide();
  }else{
    $('#aptSubmit').show();
  }

  $('#aptSubmit').on('click', (e) => {
    if(moment(date).isAfter(moment(new Date()))){
      $('#aptFrm').submit();
    }
  });
}
