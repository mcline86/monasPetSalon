var images = [  //List of images  (maybe grabbed from DB later to allow admin to change)
  "Banner.jpg",
  "Mona1.jpg",
  "Mona2.jpg",
  "Mona3.jpg"
];

var currentSlide = 0;
const pause = 5000; //pause between slides
var timer;
setSlide(0);
buildControls();
slideLoop();


function setSlide (i) {  //set slide as current
  var paws = $('.paw');            // Grab all paws
  paws.removeClass('current');     // clear current class from all
  $(paws[i]).addClass('current');  // set current class on new slide paw

  //currentSlide = i;
  $('#slide2').hide();
  $('#slide2').attr('src', 'images/' + images[i]);
  $('#slide2').fadeIn(1000, function() {
    $('#slide1').attr('src', 'images/' + images[i]);
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
  setSlide(currentSlide);
  slideLoop();
}

function prevSlide() {
  clearTimeout(timer);
  currentSlide--;
  if(currentSlide < 0) currentSlide = images.length - 1;
  setSlide(currentSlide);
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
    var num = $(this).data('img');
    currentSlide = num;
    setSlide(num);
    clearTimeout(timer);
    slideLoop();
  });
}
