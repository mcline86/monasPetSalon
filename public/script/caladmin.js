
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
      window.location = "/admin/pending";
    }
  });
}
