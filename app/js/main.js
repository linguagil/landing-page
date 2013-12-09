(function($) {
  'use strict';
  /**
   *  Calling fastclick in application
   */
  var FastClick = window.FastClick || {};
  FastClick.attach(document.body);

  //  Add target blank in realtime for htmllint validation
  $('a[rel="external"]').attr('target','_blank');

  $('#menu-close, #menu-toggle').click(function(e) {
    e.preventDefault();
    $('#sidebar-wrapper').toggleClass('active');
  });

  /**
   * Active scroll to top of target element
   * @param  {[type]} scrollHeight height to scroll EX: activeScrollTop( $('div').offset )
   * @return {void}
   */
  function activeScrollTop( scrollHeight ) {
    $('html, body').animate({ scrollTop: scrollHeight }, 'fast');
  }

  /**
   * Active scroll to top of target element
   * @param  {[type]} scrollHeight height to scroll EX: activeScrollTop( $('div').offset )
   * @return {void}
   */
  function activeCloseAlertMessage( ) {
    $('.close').on('click', function(){
      $(this).parents('.send-mail-message').slideUp('fast').html('');
    });
  }

  //  FORM VALIDATION SEND EMAIL
  $('#send-mail').submit( function(event){
    event.preventDefault();
    var sendMailItems = $('#send-mail').serializeArray(),
        $sendMailMessage = $('.send-mail-message'),
        el = {},
        message = []
    ;
    $.each( sendMailItems, function(i, field) {
      el[field.name] = field.value;
    });
    if (el.nome === '') {
      message.push('Nome é obrigatório');
    }
    if (el.email === '') {
      message.push('Email é obrigatório');
    }
    //  Return message for user
    if( message.length !== 0) {
      $sendMailMessage.html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><p>' + message.join('<br/>') + '</p></div>' )
                        .slideDown('fast');
      activeScrollTop($sendMailMessage.offset().top - 100 );
      //  Activate alert close click
      activeCloseAlertMessage();
      return;
    }

    $.post('save_email.php', el, function(data) {
      $sendMailMessage.html(data);
      activeScrollTop($sendMailMessage.offset().top - 100);
      //  Activate alert close click
      activeCloseAlertMessage();
    });
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
})(jQuery);
