(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  window.onload = function () {
    /* Vivus.js | Анимирование рисования логотипа */
    var _vivus = new Vivus('logo_svg', {
      file: '../img/user.svg',
      type: 'scenario-sync',
      duration: 20,
      start: 'autostart',
      dashGap: 20,
      forceRender: false
    }, function () {
      document.getElementById('logo_svg').classList.add('painted');
      document.getElementById('main_logo').classList.add('show');
      document.getElementById('main_subnav').classList.add('show');
    });
    /* Particles.js | Background */


    particlesJS.load('particles-js', '../css/particles.json', function () {
      console.log('callback - particles.js config loaded');
    });
  };

}));
