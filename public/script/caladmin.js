var pendingArray = [];
var openArray = [];
var archivedArray = [];



var status = [
  'Pending',
  'Open',
  'Canceled',
  'Closed'
];



//======================================================
//============    Utility Functions  ===================
//======================================================

function addToPending(appt){
  pendingArray.push(appt);

  let li = "<a href='#' data-id='" + appt._id + "' class='list-group-item list-group-item-action" +
                                                " list-group-item-info flex-column align-items-start'>" +
              "<div class='d-flex w-100 justify-content-between'>" +
                "<h5 class='mb-1 text-truncate'>" + appt.pet + "</h5>" +
                "<small>" + appt.date + " </small>" +
              "</div>" +
              "<p class='mb-1 text-truncate'>" + appt.about + "</p>" +
            "</a>";
  $('#pendGroup').append(li);
}

function addToOpen(appt){
  openArray.push(appt);
  let color = "list-group-item-"
  color += colorByDate(appt.date);
  let li = "<a href='#' data-id='" + appt._id + "' class='list-group-item list-group-item-action " +
                                                 color + " flex-column align-items-start'>" +
              "<div class='d-flex w-100 justify-content-between'>" +
                "<h5 class='mb-1 text-truncate'>" + appt.pet + "</h5>" +
                "<small>" + appt.date + " </small>" +
              "</div>" +
              "<p class='mb-1'>" + appt.about + "</p>" +
            "</a>";

  $(li).data('id', appt._id);
  $('#openGroup').append(li);
}

function addToClosed(appt){
  archivedArray.push(appt);
  let color = "list-group-item-";
  if(appt.status == "closed"){
     color += "secondary";
   }else {
     color += "danger";
   }

  let li = "<a href='#' data-id='" + appt._id + "' class='list-group-item list-group-item-action " +
                                              color + " flex-column align-items-start'>" +
              "<div class='d-flex w-100 justify-content-between'>" +
                "<h5 class='mb-1 text-truncate'>" + appt.pet + "</h5>" +
                "<strong>" + appt.date + " </strong>" +
              "</div>" +
            "</a>";
  $('#closedGroup').append(li);
}


//  Add event listeners to appointment cards
function refreshHook(){
  $('.list-group-item').on('click', function(e){
    let id = $(e.target).data('id');
    openModal(id);
  });
}



function openModal(id){
  $.ajax({
    url: "/api/getAptInfo/" + id,
    success: function(data){

      let status = "<select class='form-control' id='statusSel' name='apt[status]' form='apptForm' style='color:#fff;'>" +
                  "<option value='pending'> Pending </option>" +
                  "<option value='open'> Open </option>" +
                  "<option value='closed'> Closed </option>" +
                  "<option value='canceled'> Canceled </option>" +
                  "</select>";
      $('#aptStatus').html(status);
      $('#statusSel').addClass(colorSelect(data.status));

      $('#apptOwner').val(data.owner);
      $('#apptPet').val(data.pet);
      $('#apptBreed').val(data.breed);
      $('#apptPhone').val(data.phone);
      $('#apptEmail').val(data.email);
      $('#apptAbout').html(data.about);
      $('#apptDate').val(data.date);
      $('#statusSel').val(data.status);
      $('#apptForm').attr('action', '/api/updateAppointment/' + data._id);
      $('#apptModal').modal().show();

      $('#statusSel').on('click', function(e){
        console.log("CHANGE");
        $('#statusSel').removeClass("bg-success bg-info bg-danger bg-secondary");
        $('#statusSel').addClass(colorSelect($(this).val()))
      });
    }
  })
}

function colorByDate(date){
  let today = moment(new Date());
  let apt = moment(date);
  console.log(apt.diff(today, 'days'));
  if(apt.isAfter(today) && apt.diff(today, "days") > 7){
    return "success";
  }else if(apt.isAfter(today)){
    return "warning";
  }else if(apt.isSame(today, 'date')) {
    return "primary";
  } else {
    return "danger";
  }
}

function colorSelect(status){
  switch(status){
    case "pending":
      return "bg-info";
      break;
    case "open":
      return "bg-success";
      break;
    case "closed":
      return "bg-secondary";
      break;
    case "canceled":
      return "bg-danger";
      break;
    default:
      return "";
  }
}
