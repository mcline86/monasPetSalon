
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
  console.log(today);
  let start = moment().startOf('month').date();
  let end = moment().endOf('month').date();
  let firstBox = moment().startOf('month').day();
  for(let day = firstBox; day < end + firstBox; day++){
    if((day - firstBox)+1 == today){   $(days[day]).addClass("today");   }
    $(days[day]).removeClass('disabled');
    $(days[day]).attr('data-dOfM', (day - firstBox)+1);
    $(days[day]).html((day - firstBox)+1);
  }
}
