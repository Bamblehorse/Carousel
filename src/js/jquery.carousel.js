;(function($, window, document, undefined) {

  "use strict";


  var getTitle = function() {
    this.currentSlide = getCurrentSlide.call(this);
    if (this.settings.transition == "basic") {
      this.titles.hide();
    } else {
      this.titles.fadeOut(this.settings.transitionSpeed);
    }
    this.indicator.text((this.slideNumber + 1) + " of " + this.amountOfSlides);
  };

  var getCurrentSlide = function() {
    return $(this.slides[this.slideNumber]);
  };

  var pluginName = "merryGoSlide",
    // Plugin default settings
    defaults = {
      loop: false,
      theme: "dark",
      showDots: false,
      autoScroll: false,
      transition: "basic",
      scrollSpeed: 4000,
      showIndicator: false,
      transitionSpeed: 1000
    };

  function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    // Title of each Slide - from alt tag of image
    this.titles = $(".o-carousel__slides h1");
    this.carousel = $(".o-carousel container");
    // Box showing "slide X of Y"
    this.indicator = $("#o-carousel__slide-indicator");
    // Left amd right navigation buttons
    this.buttonLeft = $(".o-carousel__nav--left");
    this.buttonRight = $(".o-carousel__nav--right");
    // Collection of all carousel images
    this.slides = $(".o-carousel__slides").find("img");
    // Default setting - display first image on start
    this.slideNumber = 0;
    // UL of dot indicators
    this.dots = $(".o-carousel__dots");
    // Number of images
    this.amountOfSlides = this.slides.length;
    // Selects the current slide from collection of slides
    this.currentSlide = $(this.slides[this.slideNumber]);
    // Collection of dot indicators
    this.dot = this.dots.find("li");
    // How far to offset slides when sliding horizontally
    this.marginOffset = 0;
    // The slide after current one
    this.nextSlide = $(this.slides[this.slideNumber + 1]);
    // Set a variable for autoscrolling
    this.scroll = undefined;
    this.init();
  }

  $.extend(Plugin.prototype, {
    init: function() {

      // Set this to pluginProxy for click events to access
      var pluginProxy = this;
      this.titles.hide();
      getTitle.call(this);
      this.titles.eq(this.slideNumber).fadeIn(this.settings.transitionSpeed);
      this.slides.css({
        opacity: 0
      });
      this.currentSlide.css({
        opacity: 1,
        "z-index": 1
      }).addClass("selected");
      this.dot.eq(0).addClass("current");
      this.changeDots();
      if (this.settings.loop) {
        this.buttonLeft.show();
      } else {
        this.buttonLeft.css({
          "pointer-events": "none"
        }).hide();
      }
      // Check for user creating their own settings
      if (this.settings.showDots) {
        this.dots.show();
      } else {
        this.dots.hide();
      }

      if (this.settings.showIndicator) {
        this.indicator.show();
      } else {
        this.indicator.hide();
      }

      if (this.settings.autoScroll) {
        this.scroll = setInterval(function() {
          changeSlide("right");
        }, this.settings.scrollSpeed, "linear");
      }

      // Left nav button clicked
      this.buttonLeft.click(function(event) {
        pluginProxy.changeSlide("left");
      });

      // Right nav button clicked
      this.buttonRight.click(function(event) {
        pluginProxy.changeSlide("right");
      });

      // Arrow keys pressed
      $("html").keydown(function(event) {
        if (event.which == 37) {
          pluginProxy.changeSlide("left");
        } else if (event.which == 39) {
          pluginProxy.changeSlide("right");
        }
      });

      // Nav dot clicked
      this.dot.click(function(event) {
        var currentDot = $(".current");
        var selectedDot = $(event.target);
        if (selectedDot.hasClass("current") ||
          selectedDot.hasClass("o-carousel__dots")) {} else {
          selectedDot.addClass("current");
          currentDot.removeClass("current");
        }
        pluginProxy.slideNumber = selectedDot.index();
        pluginProxy.changeSlide("none");
      });
    },

    changeSlide: function(direction) {
      this.buttonLeft.css({
        "pointer-events": "auto"
      }).show();
      this.buttonRight.css({
        "pointer-events": "auto"
      }).show();
      // Change slides in loop
      if ((direction == "right") && (this.slideNumber < this.amountOfSlides - 1)) {
        this.slideNumber += 1;
      } else if ((direction == "left") && (this.slideNumber > 0)) {
        this.slideNumber -= 1;
      } else if ((direction == "right") && (this.slideNumber == this.amountOfSlides - 1)) {
        if (this.settings.autoScroll && !this.settings.loop) {
          clearInterval(this.scroll);
          this.changeSlide("left");
          this.scroll = setInterval(function() {
            this.changeSlide("left");
          }, this.settings.scrollSpeed, "linear");
        } else {
          this.slideNumber = 0;
        }
      } else if ((direction == "left") && (this.slideNumber === 0)) {
        if (this.settings.autoScroll && !this.settings.loop) {
          setTimeout(this.changeSlide("right"), 0);
          clearInterval(this.scroll);
          this.scroll = setInterval(function() {
            this.changeSlide("right");
          }, this.settings.scrollSpeed, "linear");
        } else {
          this.slideNumber = this.amountOfSlides - 1;
        }
      }
      // Add and remove selected class, get title and transition
      this.transition("start", direction);
      this.currentSlide.removeClass("selected");
      getTitle.call(this);
      this.currentSlide.addClass("selected");
      this.transition("finish", direction);
      this.changeDots();
      // Check for user not wanting a loop
      if ((direction == "right" || direction == "none") && (this.slideNumber == this.amountOfSlides - 1) && !this.settings.loop) {
        this.buttonRight.css({
          "pointer-events": "none"
        }).hide();
      } else if ((direction == "left" || direction == "none") && (this.slideNumber === 0) && !this.settings.loop) {
        this.buttonLeft.css({
          "pointer-events": "none"
        }).hide();
      }
    },

    changeDots: function() {
      $(".current").removeClass("current");
      this.dot.eq(this.slideNumber).addClass("current");
    },

    transition: function(stage, direction) {
      switch (this.settings.transition) {
        case "basic":
          if (stage == "start") {
            this.currentSlide.css({
              opacity: 0
            });
          } else {
            this.titles.eq(this.slideNumber).show();
            this.currentSlide.css({
              opacity: 1
            });
          }
          break;
        case "slide":
          $(".o-carousel__slides li").css({
            position: "relative"
          });
          this.slides.css({
            opacity: 1
          });
          switch (stage) {
            case "start":
              this.marginOffset = this.slideNumber * -100 + "%";
              this.slides.animate({
                marginLeft: this.marginOffset
              }, this.settings.transitionSpeed, "linear");
              break;
            case "finish":
              this.titles.eq(this.slideNumber).show().animate({
                  marginTop: "-=100%",
                  marginLeft: this.marginOffset
                }, 0)
                .animate({
                  marginTop: "+=100%"
                }, this.settings.transitionSpeed, "linear");
              break;
          }
          break;
        case "fade":
          if (stage == "start") {
            this.currentSlide.animate({
              opacity: 0
            }, this.settings.transitionSpeed);
          } else {
            this.titles.eq(this.slideNumber).fadeIn(this.settings.transitionSpeed);
            this.currentSlide.animate({
              opacity: 1
            }, this.settings.transitionSpeed);
          }
          break;
      }
    }

  });

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" +
          pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);

$(document).ready(function() {
  // User passes in their settings here
  var carouselSettings = {
    showDots: true,
    showIndicator: true,
    transition: "slide",
    loop: true,
    autoScroll: false,
    transitionSpeed: 1000

  };
  $(".o-carousel")
    .merryGoSlide(carouselSettings);
});
