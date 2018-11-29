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

var carouselLinks = $('.index__carousel--links');
var carouselImages = $('.index__carousel--images');
var mapContainer = $('#map');
var myMap = {};

var main = function main() {

  $('html').on('mousewheel DOMMouseScroll', function (e) {
    var isToDown = e.originalEvent.deltaY > 0;
    var idInit = document.URL.split('/');
    var id = idInit.pop();
    console.log(isToDown, id.indexOf('#') == 0);
    var listLinks = ['#top', '#mytools', '#contacts'];

    if (isToDown && (id.indexOf('#') == 0 || !id) && id != '#contacts') {
      if (!id) {
        id = listLinks[1];
      } else {
        id = listLinks[listLinks.indexOf(id) + 1];
      }
      $('.header__navigation--link').removeClass('active');
      $('.header__navigation--link[data-id="' + id + '"]').addClass('active');
      toggleScreens(id);
      window.history.pushState("", "", './' + id);
    }
    if (!isToDown && id.indexOf('#') == 0 && id != '#top') {
      id = listLinks[listLinks.indexOf(id) - 1];
      $('.header__navigation--link').removeClass('active');
      $('.header__navigation--link[data-id="' + id + '"]').addClass('active');
      toggleScreens(id);
      window.history.pushState("", "", './' + id);
    }
  });

  $('.header__logo').on('click', function () {
    $(this).toggleClass('style-compact');
  });
  $('.header__navigation--link').on('click', function () {
    $('.header__navigation--link').removeClass('active');
    $(this).addClass('active');
    var id = $(this).data('id');
    toggleScreens(id);
  });
  // config tooltip
  // $('.onepage-pagination a').attr('data-toggle', 'tooltip')
  // $('.one_page_love > section').each(function(key, value) {
  //   const title = $(value).attr('data-title');

  //   $('.onepage-pagination a').eq(key).text(title)
  // })

  // init tooltip
  // $('[data-toggle="tooltip"]').tooltip({
  //   template: `
  //   <div class="tooltip" role="tooltip">
  //     <div class="arrow"></div>
  //     <div class="tooltip-inner"></div>
  //   </div>
  //   `,
  //   placement: 'right'
  // })

  carouselLinks.slick({
    infinite: false,
    dots: false,
    arrows: false,
    vertical: true,
    centerMode: true,
    centerPadding: 100,
    adaptiveHeight: true,
    slidesToShow: 1,
    swipeToSlide: true,
    verticalSwiping: true,
    focusOnSelect: true,
    asNavFor: carouselImages
  });
  initCarouselLinks(carouselLinks.slick('slickCurrentSlide'));
  carouselLinks.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    if (currentSlide == nextSlide) return;
    initCarouselLinks(nextSlide);
  });

  carouselImages.slick({
    infinite: false,
    dots: false,
    arrows: false,
    centerMode: true,
    variableWidth: true,
    adaptiveHeight: true,
    asNavFor: carouselLinks
  });

  $('.user--close').on('click', function () {
    $('.user--about').toggleClass('show--modal');
  });

  $('.navigation--user .btn-link').on('click', function () {
    $('.user--about').toggleClass('show--modal');
  });

  $('.navigation--menu').on('click', function () {
    $(this).toggleClass('show--menu');
    $('.onepage-wrapper').toggleClass('show--menu');
    $('.main--menu').toggleClass('show--menu');
  });

  $('.customselect').selectize({
    onItemAdd: function onItemAdd(value, $item) {
      var group = $('.customselect .selected').parent().data('group');

      $('[id*="examples--"]').hide();

      $('#examples--' + group.toLowerCase()).toggleClass();
      $('#examples--' + group.toLowerCase()).addClass('examples--' + group.toLowerCase() + ' ' + value.toLowerCase()).show();
    }
  });

  if (mapContainer.length > 0) {
    ymaps.ready(initMap);
  }

  var loadedUrl = document.URL.split('/').pop();
  $('.header__navigation--link').removeClass('active');
  $('.header__navigation--link[data-id="' + loadedUrl + '"]').addClass('active');
  toggleScreens(loadedUrl);
};

function initMap() {
  // Создаем карту.
  myMap = new ymaps.Map("map", {
    center: [45.976865, 39.360798],
    zoom: 14,
    controls: ['zoomControl'],
    behaviors: ["drag", "dblClickZoom", "rightMouseButtonMagnifier", "multiTouch"]
  }, {
    searchControlProvider: 'yandex#search'
  });

  // Стилизуем контент на иконке
  // const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
  //   '<div style="color: #FFFFFF; font-weight: bold; text-align: center; width: 36px;">$[properties.iconContent]</div>'
  // );

  // Создаем точку на карте
  var point = new ymaps.Placemark([45.976865, 39.360798], {
    hintContent: 'Собственный значок метки',
    balloonContentHeader: 'Метка № 1',
    balloonContentBody: 'Не мысля гордый свет забавить,</br>' + 'Вниманье дружбы возлюбя,</br>' + 'Хотел бы я тебе представить</br>' + 'Залог достойнее тебя,'
    // iconContent: '15'
  }, {
    // iconLayout: 'default#imageWithContent',
    // iconLayout: 'default#image',
    // iconImageHref: '../img/icon-placemark.png',
    // iconImageSize: [30, 42],
    // iconImageOffset: [-15, -42],
    // iconContentOffset: [0, 10],
    // iconContentLayout: MyIconContentLayout,
  });

  // Добавляем точку на карту
  myMap.geoObjects.add(point);
}

function toggleScreens(id) {
  if (!id) {
    id = '#top';
  }
  $('.index__section').hide();
  $('' + id).show();
  carouselImages.slick('setPosition');
  carouselLinks.slick('setPosition');
  setTimeout(function () {
    myMap.container.fitToViewport();
  }, 1000);
  if (id == '#top' || id == '') {
    $('.header').removeClass('style-ontop');
  } else {
    $('.header').addClass('style-ontop');
  }
}

function initCarouselLinks(slide) {
  $('.index__carousel--links [data-slick-index]').removeClass('style-sm style-md');
  $('.index__carousel--links [data-slick-index="' + (slide - 2) + '"],.index__carousel--links [data-slick-index="' + (slide + 2) + '"]').addClass('style-sm');
  $('.index__carousel--links [data-slick-index="' + (slide - 1) + '"],.index__carousel--links [data-slick-index="' + (slide + 1) + '"]').addClass('style-md');
}

// import './js/jquery.onepage-scroll';

$(document).ready(function () {
  head();
  main();
});

})));
