;(function($, window, document, undefined) {

console.log('start of file');

    'use strict';

    $.fn.extend({
        // Usage:
        // jQuery(selector).pluginName({property:'value'});
        merryGoSlide : function(settings, variables) {
            // assigned 'this' to plugin
            plugin = this;
            // Carousel Element variables
            plugin.variables = {
                // Title of each Slide - from alt tag of image
                title : $("#o-carousel__title"),
                // Box showing "slide X of Y"
                indicator : $("#o-carousel__slide-indicator"),
                // Left amd right navigation buttons
                left : $(".o-carousel__nav--left"),
                right : $(".o-carousel__nav--right"),
                // Collection of all carousel images
                slides : $(".o-carousel__slides").find("img"),
                // Default setting - display first image on start
                slide_number : 0,
                // UL of dot indicators
                dots : $(".o-carousel__dots")
            };
            // Secondary variables rely on plugin.variables to work
            plugin.secondaryVariables = {
                // Number of images
                amount_of_slides : plugin.variables.slides.length,
                // Selects the current slide from collection of slides
                current_slide : $(plugin.variables.slides[plugin.variables.slide_number]),
                // Collection of dot indicators
                dot : plugin.variables.dots.find("li")
            };

            // Plugin default settings
            plugin.defaults = {
                showDots : false,
                showIndicator: false,
                transition: 'basic',
                theme: 'dark'
            };

            variables = $.extend({}, plugin.variables, plugin.secondaryVariables, variables);
            settings = $.extend({}, plugin.defaults, settings);
            console.log('variables:');
            console.log(variables);
            console.log('settings:')
            console.log(settings)
            // Plugin Functions
            s = settings;
            v = variables;

            // Check for user creating their own settings
            s.showDots ? v.dots.show() : v.dots.hide();
            s.showIndicator ? v.indicator.show() : v.indicator.hide();

            f={ // functions
                getCurrentSlide: function() {
                  return $(v.slides[v.slide_number]);
                },

                getTitle: function() {
                  v.current_slide = f.getCurrentSlide();
                  v.title.text(v.current_slide[0].alt);
                  v.indicator.text((v.slide_number + 1) + " of " + v.amount_of_slides);
                },

                changeSlide: function(direction) {
                  console.log("## Changing Slides ##");
                  console.log("starting on slide: " + v.slide_number);

                  if ((direction == "right") && (v.slide_number < v.amount_of_slides -1)) {
                    v.slide_number += 1;
                  }
                  else if ((direction == "left") && (v.slide_number > 0)) {
                    v.slide_number -= 1;
                  }
                  else if ((direction == "right") && (v.slide_number == v.amount_of_slides - 1)) {
                    console.log('-- gone too far right --');
                    v.slide_number = 0;
                  }
                  else if ((direction == "left") &&(v.slide_number == 0)) {
                    console.log('-- gone too far left --');
                    v.slide_number = v.amount_of_slides -1 ;
                  }
                  else if (direction == "none") {
                    console.log('clicked on dot:' + v.slide_number);
                  };
                  v.next_slide = $(v.slides[v.slide_number]);
                  f.transition('start', direction);
                  v.current_slide.removeClass('selected');
                  f.getTitle();
                  v.current_slide.addClass('selected');
                  console.log("finishing on slide: " + v.slide_number);
                  console.log('');
                  f.transition('finish', direction);
                  f.changeDots();
                  console.log(v.current_slide)
                },

                changeDots: function() {
                  $(".current").removeClass('current');
                  v.dot.eq(v.slide_number).addClass('current');
                },

                transition: function(stage, direction) {
                  switch (s.transition) {
                    case 'basic':
                      stage == 'start' ? v.current_slide.hide() : v.current_slide.show();
                      break;
                    case 'vertical':
                      stage == 'start' ? v.current_slide.slideUp(600) : v.current_slide.slideDown(600);
                      break;
                    case 'slide':
                      (stage == 'start' && direction == 'right') ?
                      (v.current_slide.show().animate({marginLeft: '-=100%'}, 600, function(){v.current_slide.hide()})
                                             .animate({marginLeft: '+=100%'}, 0)
                      )
                           : (v.current_slide.animate({marginLeft: '+=100%'}, 0).animate({marginLeft: '-=100%'}, 600))
                      break;
                    case 'fade':
                      stage == 'start' ? v.current_slide.fadeOut('slow') : v.current_slide.show();
                      break;
                  };
                }

            };
              // Left nav button clicked
              v.left.click(function(event) {
                f.changeSlide("left");
              });

              // Right nav button clicked
              v.right.click(function(event) {
                f.changeSlide("right");
              });

              // Nav dot clicked
              v.dot.click(function(event) {
                var current_dot = $(".current");
                var selected_dot = $(event.target);
                if (selected_dot.hasClass('current') ||
                    selected_dot.hasClass('o-carousel__dots')) {
                }
                else{
                  selected_dot.addClass('current');
                  current_dot.removeClass('current');
                };
                v.slide_number = selected_dot.index();
                f.changeSlide("none");
              });

            // Run on plugin creation
            f.getTitle();
            v.current_slide.addClass('selected');
            v.dot.eq(0).addClass('current');
            f.changeDots();
            return $(plugin).each(function() {

                // Plugin logic
                // Calling the function:
                // jQuery(selector).pluginName(options);
            });
        }
    });
})(jQuery, window, document);

$(document).ready(function() {
  // User passes in their settings here
  var carousel__settings = {
    showDots: true,
    showIndicator: true,
    transition: 'fade'

  };
  $(".o-carousel")
  .merryGoSlide(carousel__settings);

console.log('end of file');
});
