( function(window, document, $, undefined) {
  'use strict';

  $('#menu-close, #menu-toggle').click(function(e) {
    e.preventDefault();
    $('#sidebar-wrapper').toggleClass('active');
  });

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') || location.hostname === this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name="' + this.hash.slice(1) +'"]');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
}(this, this.document, this.jQuery));

