;(function($, window, document, undefined) {

  "use strict";

  $.fn.extend({
    // Usage:
    // jQuery(selector).pluginName({property:'value'});
    merryGoSlide: function(settings) {
      // assigned 'this' to plugin
      var plugin = this;
      // Title of each Slide - from alt tag of image
      var titles = $(".o-carousel__slides h1"),
        // Box showing "slide X of Y"
        indicator = $("#o-carousel__slide-indicator"),
        // Left amd right navigation buttons
        buttonLeft = $(".o-carousel__nav--left"),
        buttonRight = $(".o-carousel__nav--right"),
        // Collection of all carousel images
        slides = $(".o-carousel__slides").find("img"),
        // Default setting - display first image on start
        slideNumber = 0,
        // UL of dot indicators
        dots = $(".o-carousel__dots"),
        // Number of images
        amountOfSlides = slides.length,
        // Selects the current slide from collection of slides
        currentSlide = $(slides[slideNumber]),
        // Collection of dot indicators
        dot = dots.find("li"),
        // How far to offset slides when sliding horizontally
        marginOffset = 0,
        // The slide after current one
        nextSlide = $(slides[slideNumber + 1]);
      // console.log(titles[slideNumber].prop('hidden', true))
      // titles[slideNumber].css(opacity,1);

      // Plugin default settings
      plugin.defaults = {
        loop: false,
        theme: "dark",
        showDots: false,
        autoScroll: false,
        transition: "basic",
        scrollSpeed: 4000,
        showIndicator: false,
        transitionSpeed: 1000
      };

      settings = $.extend({}, plugin.defaults, settings);

      // Check for user creating their own settings
      if (settings.showDots) {
        dots.show();
      } else {
        dots.hide();
      }

      if (settings.showIndicator) {
        indicator.show();
      } else {
        indicator.hide();
      }

      if (settings.autoScroll) {
        setInterval(function() {
          changeSlide("right");
        }, settings.scrollSpeed, "linear");
      }

      function getCurrentSlide() {
        return $(slides[slideNumber]);
      }

      function getTitle() {
        currentSlide = getCurrentSlide();
        titles.fadeOut(settings.transitionSpeed);
        indicator.text((slideNumber + 1) + " of " + amountOfSlides);
      }

      function changeSlide(direction) {
        buttonLeft.css({
          "pointer-events": "auto"
        }).show();
        buttonRight.css({
          "pointer-events": "auto"
        }).show();
        // Change slides in loop
        if ((direction == "right") && (slideNumber < amountOfSlides - 1)) {
          slideNumber += 1;
        } else if ((direction == "left") && (slideNumber > 0)) {
          slideNumber -= 1;
        } else if ((direction == "right") && (slideNumber == amountOfSlides - 1)) {
          slideNumber = 0;
        } else if ((direction == "left") && (slideNumber === 0)) {
          slideNumber = amountOfSlides - 1;
          // } else if (direction == "none")
        }
        // Add and remove selected class, get title and transition
        transition("start", direction);
        currentSlide.removeClass("selected");
        getTitle();
        currentSlide.addClass("selected");
        transition("finish", direction);
        changeDots();
        // Check for user not wanting a loop
        if ((direction == "right" || direction == "none") && (slideNumber == amountOfSlides - 1) && !settings.loop) {
          buttonRight.css({
            "pointer-events": "none"
          }).hide();
        } else if ((direction == "left" || direction == "none") && (slideNumber === 0) && !settings.loop) {
          buttonLeft.css({
            "pointer-events": "none"
          }).hide();
        }
      }

      function changeDots() {
        $(".current").removeClass("current");
        dot.eq(slideNumber).addClass("current");
      }

      function transition(stage, direction) {
        switch (settings.transition) {
          case "basic":
            if (stage == "start") {
              currentSlide.css({
                opacity: 0
              });
            } else {
              titles.eq(slideNumber).fadeIn(settings.transitionSpeed / 2);
              currentSlide.css({
                opacity: 1
              });
            }
            break;
          case "slide":
            $(".o-carousel__slides li").css({
              position: "relative"
            });
            slides.css({
              opacity: 1
            });
            switch (stage) {
              case "start":
                marginOffset = slideNumber * -100 + "%";
                slides.animate({
                  marginLeft: marginOffset
                }, settings.transitionSpeed, "linear");
                titles.eq(slideNumber).slideUp(settings.transitionSpeed);
                break;
              case "finish":
                titles.eq(slideNumber).show().animate({marginTop: "-=100%", marginLeft: marginOffset}, 0)
                .animate({
                  marginTop: "+=100%"
                }, settings.transitionSpeed, "linear");
                break;
            }
            break;
          case "fade":
            if (stage == "start") {
              currentSlide.animate({
                opacity: 0
              }, settings.transitionSpeed);
            } else {
              titles.eq(slideNumber).fadeIn(settings.transitionSpeed);
              currentSlide.animate({
                opacity: 1
              }, settings.transitionSpeed);
            }
            break;
        }
      }
      // Left nav button clicked
      buttonLeft.click(function(event) {
        changeSlide("left");
      });

      // Right nav button clicked
      buttonRight.click(function(event) {
        changeSlide("right");
      });

      // Nav dot clicked
      dot.click(function(event) {
        var currentDot = $(".current");
        var selectedDot = $(event.target);
        if (selectedDot.hasClass("current") ||
          selectedDot.hasClass("o-carousel__dots")) {} else {
          selectedDot.addClass("current");
          currentDot.removeClass("current");
        }
        slideNumber = selectedDot.index();
        changeSlide("none");
      });

      // Run on plugin creation
      titles.hide();
      getTitle();
      titles.eq(slideNumber).fadeIn(settings.transitionSpeed);
      slides.css({
        opacity: 0
      });
      currentSlide.css({
        opacity: 1,
        "z-index": 1
      }).addClass("selected");
      dot.eq(0).addClass("current");
      changeDots();
      if (settings.loop) {
        buttonLeft.show();
      } else {
        buttonLeft.css({
          "pointer-events": "none"
        }).hide();
      }
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
  var carouselSettings = {
    showDots: true,
    showIndicator: true,
    transition: "slide",
    loop: false,
    autoScroll: false,
    transitionSpeed: 1000

  };
  $(".o-carousel")
    .merryGoSlide(carouselSettings);
});
