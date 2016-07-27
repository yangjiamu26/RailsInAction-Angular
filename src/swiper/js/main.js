;
(function() {
  function lazyLoadImages() {
    var st = $(window).scrollTop();
    $('img.lazy').each(function() {
      var img = $(this);
      if (img.attr('src')) return;
      if (img.offset().top < $(window).height() + st) {
        img.attr('src', img.data('src'));
      }
    });
  }
  if ($('img.lazy').length > 0) {
    $(window).scroll(function() {
      lazyLoadImages();
    });
  }
  if (window.hljs) {
    hljs.configure({
      tabReplace: '    '
    });
    hljs.initHighlightingOnLoad();
  }
  var swiperBack2 = new Swiper('.header-swiper-back-2', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 100,
    onlyExternal: true,
    effect: 'coverflow',
    direction: 'vertical',
    speed: 600,
    coverflow: {
      slideShadows: false
    }
  });
  var swiperBack1 = new Swiper('.header-swiper-back-1', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 300,
    effect: 'coverflow',
    speed: 600,
    coverflow: {
      slideShadows: false
    }
  });
  var swiperFront = new Swiper('.header-swiper-front', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 100,
    effect: 'coverflow',
    speed: 600,
    coverflow: {
      slideShadows: false
    },
    pagination: '.header-swiper-front .swiper-pagination',
    paginationClickable: true,
    nextButton: '.header-swiper-front .swiper-button-next',
    prevButton: '.header-swiper-front .swiper-button-prev',
    control: [swiperBack1, swiperBack2],
    controlBy: 'container',
    keyboardControl: true,
    a11y: true,
    onSlideChangeStart: function(s) {
      if (s.activeIndex === $('.swiper-slide-gallery').index()) {
        $(s.container[0]).find('.swiper-pagination').hide();
      } else {
        $(s.container[0]).find('.swiper-pagination').show();
      }
    }
  });
  $(".swiper-slide-gallery").each(function(index, item){
      var galleryTopSwiper = new Swiper("#"+item.id+' .swiper-gallery-top', {
        slidesPerView: 1,
        spaceBetween: 10,
        nested: true,
        resistanceRatio: 0,
        preloadImages: false,
        lazyLoading: true,
      });
      var galleryThumbsSwiper = new Swiper("#"+item.id+' .swiper-gallery-thumbs', {
        slidesPerView: 5,
        spaceBetween: 10,
        centeredSlides: true,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        nested: true,
        resistanceRatio: 0,
      });
      galleryTopSwiper.params.control = galleryThumbsSwiper;
      galleryThumbsSwiper.params.control = galleryTopSwiper;    
  })


  function lazyLoadDemos() {
    $('.demo').each(function() {
      var frameHolder = $(this).find('.demo-iframe');
      if (frameHolder.hasClass('loaded')) return;
      var frame = frameHolder.find('iframe');
      var src = frame.attr('data-src');
      if (frameHolder.offset().top < ($(window).scrollTop() + $(window).height() + 50)) {
        frameHolder.addClass('loaded');
        frame.attr('src', src);
      }
    });
  }
  if ($('.demo').length > 0) {
    $('.demo').each(function() {
      var t = $(this);
      var demoFile = t.find('iframe').attr('data-src');
      t.find('.demo-link-new-window').attr('href', demoFile);
      t.find('.demo-link-source').attr('href', 'https://github.com/nolimits4web/Swiper/blob/master/demos/' + demoFile);
    });
    $(window).on('scroll resize', function() {
      lazyLoadDemos();
    });
    lazyLoadDemos();
  }
})();