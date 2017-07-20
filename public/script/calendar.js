
buildCal()

function buildCal (){
  let cal = $("#calBox");
  cal.html("<h1>" +moment().format("MMM YYYY") + "</h1>");
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
  fillCal();
}

function fillCal(){
  let days = $('div.calDay');
  let today = moment(new Date());
  let current = moment(new Date()).date(1);
  let firstBox = moment().startOf('month').day();
  current.add((firstBox * -1), 'd');
  for(let day = 0; day < days.length; day++){
    if(current.isSame(today)){   $(days[day]).addClass("today");   }
    if(current.month() == today.month()) {
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
}


function buildForm(date){
  let pBody = $(".panel-body");
  $('.panel-title').find("span").html(moment(date, "MM/DD/YYYY").format("MMMM Do, YYYY"));
  pBody.html("");
  var timeSlots = "<ul class='nav nav-pills tSlots'>" +
                    "<li data-slot='0' class='active'><a href='#'>8:00a</a></li>" +
                    "<li data-slot='1'><a href='#'>10:00a</a></li>" +
                    "<li data-slot='2'><a href='#'>12:00p</a></li>" +
                    "<li data-slot='3'><a href='#'>2:00p</a></li>" +
                  "</ul><br>";
  pBody.append("Please select a time and fill out the contact form. <hr>");
  pBody.append("<label>Available Times: </label>");
  pBody.append(timeSlots);

  $('ul.tSlots li').on("click", (e) => {
    let tmp = $(e.target).parent()
    $('ul.tSlots li.active').removeClass('active');
    $(tmp).addClass("active");
    $("#aptSlot").val($(tmp).data('slot'));
  });

  pBody.append("<form id='aptFrm' action='/newAppointment' method='POST'>" +
                  "<input id='aptSlot' type='hidden' name='apt[timeSlot]' value='0'>" +
                  "<input type='hidden' name=apt[status] value='pending'>" +
                  "<input type='hidden' name='apt[date]' value='" + date + "'>" +
                  "<div class='form-group'>" +
                    "<label> Owner's Name: </label>" +
                    "<input class='form-control' type='text' name='apt[owner]'>" +
                  "</div><div class='form-group col-xs-6'>" +
                    "<label> Pet's Name: </label>" +
                    "<input class='form-control' type='text' name='apt[pet]'>" +
                  "</div><div class='form-group col-xs-6'>" +
                    "<label> Breed: </label>" +
                    "<input class='form-control' type='text' name='apt[breed]'>" +
                  "</div><div class='form-group col-xs-6'>" +
                    "<label> Phone: </label>" +
                    "<input class='form-control' type='text' name='apt[phone]'>" +
                  "</div><div class='form-group col-xs-6'>" +
                    "<label> Email: </label>" +
                    "<input class='form-control' type='text' name='apt[email]'>" +
                  "</div><textarea class='form-control' name='apt[about]' placeholder='Notes. . .'></textarea>");
    pBody.append("<br><input id='aptSubmit' type='submit' class='btn btn-primary' value='Submit'></form><br><br>");
    $('#aptSubmit').on('click', (e) => {
      $('#aptFrm').submit();
      pBody.html("Thank you, we will be in touch to confirm your appointment. . . <hr>");
    });
}
