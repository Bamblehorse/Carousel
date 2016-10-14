// ;(function ( $, window, document, undefined ) {
$(document).ready(function(){
  // Carousel variable declarations
  var title = $("#o-carousel__title");
  var indicator = $("#o-carousel__slide-indicator");
  var left = $(".o-carousel__nav--left");
  var right = $(".o-carousel__nav--right");
  var slides = $(".o-carousel__slides").find("img");
  var amount_of_slides = slides.length;
  var slide_number = 0;
  var current_slide = $(slides[slide_number]);
  var dots = $(".o-carousel__dots");
  var dot = dots.find("li");

  // ## Carousel Settings ##
  var transition_type = 'basic';
  // Get the current slide
  function getCurrentSlide() {
    return $(slides[slide_number]);
  };

  // Get title from alt tag of image
  function getTitle() {
    current_slide = getCurrentSlide();
    title.text(current_slide[0].alt);
    indicator.text((slide_number + 1) + " of " + amount_of_slides);

  };

  // Run following on load
  getTitle();
  current_slide.addClass('selected');
  dot.eq(0).addClass('current')
  changeDots();

  // Change slides
  function changeSlide(direction) {
    console.log("## Changing Slides ##");
    console.log("starting on slide: " + slide_number);
    current_slide.hide();

    if ((direction == "right") && (slide_number < amount_of_slides -1)) {
      current_slide.removeClass('selected');
      slide_number += 1;
      getTitle();
      current_slide.addClass('selected');
    }
    else if ((direction == "left") && (slide_number > 0)) {
      current_slide.removeClass('selected');
      slide_number -= 1;
      getTitle();
      current_slide.addClass('selected');
    }
    else if ((direction == "right") && (slide_number == amount_of_slides - 1)) {
      console.log('-- gone too far right --');
      current_slide.removeClass('selected');
      slide_number = 0;
      getTitle();
      current_slide.addClass('selected');
    }
    else if ((direction == "left") &&(slide_number == 0)) {
      console.log('-- gone too far left --');
      current_slide.removeClass('selected');
      slide_number = amount_of_slides -1 ;
      getTitle();
      current_slide.addClass('selected');
    }
    else if (direction == "none") {
      console.log('clicked on dot:' + slide_number);
      current_slide.removeClass('selected');
      getTitle();
      current_slide.addClass('selected');
    };
    console.log("finishing on slide: " + slide_number);
    console.log('');
    current_slide.show();
    changeDots();
  };

  // Sync dots with main navigation
  function changeDots() {
    $(".current").removeClass('current');
    dot.eq(slide_number).addClass('current');
  };

  // Left nav button clicked
  left.click(function(event) {
    changeSlide("left");
  });

  // Right nav button clicked
  right.click(function(event) {
    changeSlide("right");
  });

  // Nav dot clicked
  dot.click(function(event) {
    var current_dot = $(".current");
    var selected_dot = $(event.target);
    if (selected_dot.hasClass('current') ||
        selected_dot.hasClass('o-carousel__dots')) {
    }
    else{
      selected_dot.addClass('current');
      current_dot.removeClass('current');
    };
    slide_number = selected_dot.index();
    changeSlide("none");
  });


});
// })( jQuery, window, document );
