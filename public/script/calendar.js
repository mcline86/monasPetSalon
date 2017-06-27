
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
          Day = "<div class='calDay calLeft disabled'> &nbsp; </div>";
          if(row == 5){
            Day = "<div class='calDay calLeft botLeft disabled'> &nbsp; </div>";
          }
        }
        else {
          Day = "<div class='calDay disabled'> &nbsp; </div>";
        }
        cal.append(Day);
        //console.log("[ " + row + " : " + col + " ]");
    }
  }

  fillCal();
}

function fillCal(){
  let days = $('div.calDay');
  let today = moment(new Date()).date();
  let start = moment().startOf('month').date();
  let end = moment().endOf('month').date();
  let firstBox = moment().startOf('month').day();
  let tempData = moment(new Date()).set({date: 1});
  for(let day = firstBox; day < end + firstBox; day++){
    if((day - firstBox)+1 == today){   $(days[day]).addClass("today");   }
    $(days[day]).removeClass('disabled');
    $(days[day]).attr('data-date', tempData.format("DD/MM/YYYY"));
    $(days[day]).html((day - firstBox)+1);
    tempData.add(1, "day");
  }
  $("div.calDay").on("click", (e) => {
    if($(this).hasClass("disabled") == false){

      let date = $(e.target).data('date');
      buildForm(date);
    }
  });
}


function buildForm(date){
  let pBody = $(".panel-body");
  pBody.html("");
  var timeSlots = "<ul class='nav nav-pills tSlots'>" +
                    "<li data-slot='0' class='active'><a href='#'>8:00</a></li>" +
                    "<li data-slot='1'><a href='#'>10:00</a></li>" +
                    "<li data-slot='2'><a href='#'>12:00</a></li>" +
                    "<li data-slot='3'><a href='#'>2:00</a></li>" +
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
