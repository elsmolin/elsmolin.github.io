(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var mobileWidth = 320;

var head = function head() {

  var viewport = $('meta[name="viewport"]');

  if (screen.width < mobileWidth) {
    viewport.attr('content', 'width=' + mobileWidth + ', user-scalable=no');
  }

  $(window).resize(function () {
    if (screen.width < mobileWidth) {
      viewport.attr('content', 'width=' + mobileWidth + ', user-scalable=no');
    } else {
      viewport.attr('content', 'width=device-width, initial-scale=1');
    }
  });
};

var main = function main() {
  $(".one_page_love").onepage_scroll({
    sectionContainer: "section", // sectionContainer accepts any kind of selector in case you don't want to use section
    easing: "ease-in-out", // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
    // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
    animationTime: 1000, // AnimationTime let you define how long each section takes to animate
    pagination: true, // You can either show or hide the pagination. Toggle true for show, false for hide.
    updateURL: false, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
    beforeMove: function beforeMove(index) {}, // This option accepts a callback function. The function will be called before the page moves.
    afterMove: function afterMove(index) {}, // This option accepts a callback function. The function will be called after the page moves.
    loop: false, // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
    keyboard: true, // You can activate the keyboard controls
    responsiveFallback: false, // You can fallback to normal page scroll by defining the width of the browser in which
    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
    // the browser's width is less than 600, the fallback will kick in.
    direction: "vertical" // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
  });

  // config tooltip
  $('.onepage-pagination a').attr('data-toggle', 'tooltip');
  $('.one_page_love > section').each(function (key, value) {
    var title = $(value).attr('data-title');

    $('.onepage-pagination a').eq(key).attr('title', title);
  });

  // init tooltip
  $('[data-toggle="tooltip"]').tooltip({
    template: "\n    <div class=\"tooltip\" role=\"tooltip\">\n      <div class=\"arrow\"></div>\n      <div class=\"tooltip-inner\"></div>\n    </div>\n    ",
    placement: 'right'
  });

  $('#slider-works').slick({
    dots: false
  });

  $('.user--close').on('click', function () {
    $('.user--about').toggleClass('show--modal');
  });

  $('.navigation--user .btn-link').on('click', function () {
    $('.user--about').toggleClass('show--modal');
  });
};

// import './js/jquery.onepage-scroll';

$(document).ready(function () {
  head();
  main();
});

})));
