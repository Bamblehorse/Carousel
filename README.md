# Carousel :cookie:
This project is a Carousel.

View here:
* [Carousel - version 1.0 - 14/10/2016](https://jonathandwood.github.io/Carousel/dist/)

It's purpose is to display technical skill in HTML, CSS and Javascript.

I will be using:
* [JQuery](http://api.jquery.com/) to animate the slides.
* [Gulp](http://gulpjs.com/) as the taskrunner.
* [SCSS/SASS](http://sass-lang.com/) as a pre-processor for the CSS.
* [Inuitcss](https://github.com/inuitcss/inuitcss) as a Sass framework.

The goals are:
* To have fun.
* Learn.
* Produce something I can be proud of.

:smiley:.

## Adding The Carousel Into Your Project
Before you can use the Carousel in your project, you will need to add it into your HTML, CSS and JavaScript files and folders.

### Load the plugin files into your project
Add the plugin files into the relevant folders in your distribution and then link to them in your html.
```html
<!-- Carousel plugin styles -->
<link rel="stylesheet" href="css/styles.min.css">
<!-- Carousel plugin -->
<script src="js/main.min.js"></script>
```

## Set up your HTML
Add the following HTML code into the body of the HTML file you want the carousel to appear on. Comments have been added for understandings sake - you may remove them.
```html
<!-- The two outer divs contain the carousel -->
<div class="o-carousel__container">
  <div class="o-carousel">
    <!-- Left navigation button -->
    <button class="o-carousel__nav--left"><</button>
    <!-- Indicates current slide number and total number of slides -->
    <div id="o-carousel__slide-indicator"></div>
    <!-- Unordered list containing the 'slides' -->
    <ul class="o-carousel__slides">
      <!-- Add new slides as follows -->
      <li>
        <h1>First slide</h1>
        <img src="img/1.png" alt="image 1" class="o-carousel__img">
      </li>
      <li>
        <h1>Second slide</h1>
        <img src="img/2.png" alt="image 2" class="o-carousel__img">
    </ul>
    <!-- Right navigation button -->
    <button class="o-carousel__nav--right">></button>
    <!-- Dot indicators - add one li for each image -->
    <ul class="o-carousel__dots">
      <li class=''></li>
      <li></li>
    </ul>
  </div>
</div>
```
## Create Settings and Call Plugin
Below are the default settings for the plugin. You can override these by passing in a JavaScript object into the plugin when you call it.

```javascript
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
```
Here we create an example object variable *carouselSettings*. We then call the plugin on the div with the class "o-carousel".
```javascript
  var carouselSettings = {
    showDots: true,
    showIndicator: true,
    transition: "slide",
    loop: true,
    autoScroll: false,
    transitionSpeed: 1000

  };
  $(".o-carousel").merryGoSlide(carouselSettings);
```

## Getting Started Offline
Below you will find instructions for setting the project up on your local machine.

### Prerequisities
You will need the following tools to run the project:
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Node.js and Npm](https://nodejs.org/en/download/)

### Installing
Navigate to a folder on your machine where you are happy to place the project folder.

Open up your command-line interface and type:
```
git clone https://github.com/JonathanDWood/Carousel/
```
Now change directories into the project directory:
```
cd Carousel
```
Install the project dependencies with Npm:
```
npm install
```
Run the Gulp default task:
```
gulp
```
If the project hasn't automatically opened in your browser, [click here.](http://localhost:3000)

## Built With
* [Sublime Text 3](https://www.sublimetext.com/3)
* [Npm Gulp](https://www.npmjs.com/package/gulp) and related packages - listed in [package.json](package.json)
* [Npm/Node.js](https://nodejs.org/en/download/) and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) - As above

## Author
* **Jonathan Wood** - [Github](https://github.com/JonathanDWood/)

## License
See the [license](LICENSE) file for details
