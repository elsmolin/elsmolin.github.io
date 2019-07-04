/**
 * Карусели
 */
export const carouselInit = () => {
  if ($('#carousel').length) {
    $('.carousel_item').css({
      height: windowHeight()
    })

    $(window).resize(function() {
      $('.carousel_item').css({
        height: windowHeight()
      })
    })

    $('#carousel').slick({
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      swipeToSlide: true,
      arrows: false,
    })

    $('.carousel_item').popupCustom({})
  }
};

$.fn.popupCustom = function (opts) {

  class popupCustom {
    constructor($btn, opts) {
      this.opts = $.extend({
        // ToDo...
      }, opts);

      this.init($btn);
    }

    init($btn) {
      const _self = this
      
      $btn.parent().css({
        position: 'relative'
      })

      _self.$btn = $btn.addClass('popup-custom-initialized')

      _self.$btn.on('click', function() {
        _self.start()
      })
    }

    start() {
      const _self = this
      const _btn = _self.$btn

      _self.$clone = _btn.clone()
        .addClass('popup-custom-clone')
        .appendTo('body')

      const _clone = _self.$clone

      _clone
        .css({
          width: _btn.width(),
          top: _btn[0].getBoundingClientRect().top,
          left: _btn[0].getBoundingClientRect().left,
        })
        .addClass('opened')
        .animate({
          "margin-left": -30,
          width: _clone.width() + 30 * 2,
        }, 600)
      
        // ToDo loading...
        _self.loading()
    }

    loading() {
      const _self = this
      const _clone = _self.$clone
      const _content = $('#carousel_item_content')

      _self.$content = _content

      _clone.addClass('loading')

      setTimeout(() => {
        _clone.removeClass('loading')
        _clone.addClass('loaded')
        
        _self.open()
      }, 2500);
    }

    open() {
      const _self = this
      const _clone = _self.$clone
      const _content = _self.$content

      _self.$header = $('.header_wrapper_global')

      const _header = _self.$header

      _clone.animate({
        left: 100,
        right: "50vw",
        width: $(window).width() * .5 - 100,
        "margin-left": 0,
      }, 400)

      _header
        .addClass('customshow-content')
        .animate({
          width: 100,
        }, 400)

      _content.addClass('customshow-content')
      _content.on('click', function() {
        _self.close()
      })
    }

    close() {
      const _self = this
      const _clone = _self.$clone
      const _content = _self.$content
      const _btn = _self.$btn
      const _header = _self.$header

      _content.removeClass('customshow-content')
      _header
        .removeClass('customshow-content')
        .animate({
          width: 250,
        }, 400)
      _clone
        .removeClass('loaded')
        .animate({
          width: _btn.width(),
          top: _btn[0].getBoundingClientRect().top,
          left: _btn[0].getBoundingClientRect().left,
        }, 400, function() {
          setTimeout(() => {
            _clone.detach()
          }, 200);
        })
    }
  }

  this.each(function() {
    var $this = $(this);

    if ( !$this.data("morphing") ) {
      $this.data( "morphing", new popupCustom( $this, opts ) );
    }

  });
  
  return this
}

const windowHeight = () => Math.max($(window).height(), window.innerHeight);

export const carousel = {
  
}
