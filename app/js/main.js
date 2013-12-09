( function(window, document, $, undefined) {
  'use strict';

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
    var send_mail_items = $('#send-mail').serializeArray(),
        $send_mail_message = $('.send-mail-message'),
        el = {},
        message = []
    ;
    $.each( send_mail_items, function(i, field) {
      el[field.name] = field.value;
    });
    if (el.nome === '' || el.nome === 'Seu nome (obrigatório)') {
      message.push('Nome é obrigatório');
    }
    if (el.email === '' || el.email === 'Seu nome (obrigatório)') {
      message.push('Email é obrigatório');
    }
    //  Return message for user
    if( message.length !== 0) {
      $send_mail_message.html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><p>' + message.join('<br/>') + '</p></div>' )
                        .slideDown('fast');
      activeScrollTop($send_mail_message.offset().top - 100 );
      //  Activate alert close click
      activeCloseAlertMessage();
      return;
    }

    $.post('save_email.php', el, function(data) {
      $send_mail_message.html(data);
      activeScrollTop($send_mail_message.offset().top - 100);
      //  Activate alert close click
      activeCloseAlertMessage();
    });
  })

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

