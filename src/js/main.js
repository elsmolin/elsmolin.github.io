const main = () => {
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

  // $('#slider-works').slick({
  //   dots: false,
  // })

  $('.user--close').on('click', function() {
    $('.user--about').toggleClass('show--modal');
  })

  $('.navigation--user .btn-link').on('click', function() {
    $('.user--about').toggleClass('show--modal');
  })

  $('.navigation--menu').on('click', function() {
    $(this).toggleClass('show--menu')
    $('.onepage-wrapper').toggleClass('show--menu')
    $('.main--menu').toggleClass('show--menu')
  })

  $('.customselect').selectize({
    onItemAdd(value, $item) {
      const group = $('.customselect .selected').parent().data('group')
      
      $(`[id*="examples--"]`).hide()

      $(`#examples--${group.toLowerCase()}`).toggleClass()
      $(`#examples--${group.toLowerCase()}`).addClass(`examples--${group.toLowerCase()} ${value.toLowerCase()}`).show()
    }
  })
  
  if ($('#map').length > 0) {
    ymaps.ready(init);

    function init() {
      // Создаем карту.
      const myMap = new ymaps.Map("map", {
        center: [45.976865, 39.360798],
        zoom: 12,
        controls: []
      }, {
        searchControlProvider: 'yandex#search'
      });

      // Стилизуем контент на иконке
      // const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      //   '<div style="color: #FFFFFF; font-weight: bold; text-align: center; width: 36px;">$[properties.iconContent]</div>'
      // );

      // Создаем точку на карте
      const point = new ymaps.Placemark([45.976865, 39.360798], {
        hintContent: 'Собственный значок метки',
        balloonContentHeader: 'Метка № 1',
        balloonContentBody: 'Не мысля гордый свет забавить,</br>' +
          'Вниманье дружбы возлюбя,</br>' +
          'Хотел бы я тебе представить</br>' +
          'Залог достойнее тебя,',
        // iconContent: '15'
      },{
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
  }
}

export default main
