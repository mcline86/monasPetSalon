var images = [];

var currentSlide = 0;
const pause = 5000; //pause between slides
var timer;


function sliderInit(array){
  images = array;
  setSlide(0);
  if(array.length > 1){ buildControls(); }
  slideLoop();
}


function setSlide (i) {  //set slide as current
  var paws = $('.paw');            // Grab all paws
  paws.removeClass('current');     // clear current class from all
  $(paws[i]).addClass('current');  // set current class on new slide paw
  //currentSlide = i;
  $('#slide2').hide();
  $('#slide2').attr('src', images[i]);
  $('#slide2').fadeIn(1400, function() {
    $('#slide1').attr('src', images[i]);
    $('#slide2').hide();
  });
}

function slideLoop () {
  setSlide(currentSlide);
  timer = window.setTimeout(function() {
    currentSlide++;
    if(currentSlide >= images.length) currentSlide = 0;
    slideLoop();
  }, pause);
}


function nextSlide() {
  clearTimeout(timer);
  currentSlide++;
  if(currentSlide >= images.length) currentSlide = 0;
  slideLoop();
}

function prevSlide() {
  clearTimeout(timer);
  currentSlide--;
  if(currentSlide < 0) currentSlide = images.length - 1;
  slideLoop();
}

function buildControls() {
  var prev = "<span id='prev' class='fa fa-arrow-left'></span>";
  var next = "<span id='next' class='fa fa-arrow-right'></span>";
  $('.controls').append(prev);
  for(var i = 0; i < images.length;i++){
    var paw = "<span class='paw fa fa-paw' data-img='" + i +"'></span>";
    $(".controls").append(paw);
  }
  $('.controls').append(next);
  
  $('#prev').on('click', function (e) {  prevSlide();  });
  $('#next').on('click', function (e) {  nextSlide();  });

  $('.paw').on('click', function (e) {
    window.clearTimeout(timer);
    var num = $(this).data('img');
    currentSlide = num;
    slideLoop();
  });
}
