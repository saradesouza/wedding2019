$(document).ready(() => {
  $('.navigation-bar').hide();
  ///////////
  //SMOOTH SCROLL
  ///////////
  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        let target = $(this.hash);
        target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top,
          }, 1000, () => {
            // Callback after animation
            // Must change focus!
            let $target = $(target);
            $target.focus();
            if ($target.is(':focus')) { // Checking if the target was focused
              return false;
            }
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
      $target.focus(); // Set focus again       
    });
        }
      }
    });
});

///////////
//SLICK.JS
///////////
// $(document).ready(function(){
//   console.log('slick init');
//   $('.img-slick').slick({
//     dots: true,
//     infinite: true,
//     speed: 300,
//     slidesToShow: 1,
//     adaptiveHeight: true,
//     arrows: false,
//     autoplay: true,
//     autoplaySpeed: 2000,
//   });
// });

/////////////////////////////
//DATE CALCULATION
/////////////////////////////

var today = new Date().getTime();
// var today = new Date("December 23, 2019 00:00:00").getTime();
var rsvpDeadline = new Date("November 14, 2019 00:00:00").getTime();
var weddingDay = new Date("December 1, 2019 12:45:00").getTime();

//COUNTDOWN
// Update the count down every 1 second
var x = setInterval(function() {
  // Find the distance between today and the wedding date
  var distance = weddingDay - today;
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // Display the result
  document.getElementById("countdown-clock").innerHTML = "(" + days + " days, " + hours + " hours and "
  + minutes + " minutes left!)";
  // If the count down is finished, leave blank
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown-clock").innerHTML = " ";
  }
}, 1000);

//HIDE/SHOW DIVS BASED ON TIME
window.setInterval(function(){
  if(today>weddingDay){ //after wedding
    $('#cta-before, .prewedding').hide();
    $('#cta-after, .postwedding').show();
  }
  else { //prewedding
    $('#cta-before, .prewedding').show();
    $('#cta-after, .postwedding').hide();
  }

  if (today>rsvpDeadline){ //rsvp deadline
    $('.post-rsvp').show();
    $('.pre-rsvp').hide();
  }
  else {
    $('.post-rsvp').hide();
    $('.pre-rsvp').show();
  }

  clearInterval();
});

///////////////////////////////////////////////////////////
//RSVP FORM
///////////////////////////////////////////////////////////

window.setInterval(function(){
  if(today>rsvpDeadline){ //after deadline
    $('#form-rsvp, #pre-rsvp').hide();
    $('#post-rsvp').show();
  }
  clearInterval();
});

$('[name*=rsvp-attendance]').change(function() {
  //Hidden input
  $('#input-rsvp-attendance').val($(this).val());
  //Show/hide second step based on if they are coming or not
  if ($(this).val() == 'Yes') {
    $('#rsvp-yes').slideDown();
  } else {
    $('#rsvp-yes').slideUp();
  }
  //Hidden value's validation hack
  if ($('#input-rsvp-attendance').val()!="") {
    $('.hidden-validation').hide();
  } else {
    $('.hidden-validation').show();
  }
});
//Check if they have indicated their attendance when trying to submit form
$('.btn-submit').click(function(e){
  if ($('#input-rsvp-attendance').val()!="") {
    $('.hidden-validation').hide();
  } else {
    $('.hidden-validation').show();
    e.preventDefault();
  }
});

