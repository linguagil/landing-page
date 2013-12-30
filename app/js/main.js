(function($) {
  'use strict';
  /**
   *  Calling fastclick in application
   */
  var FastClick = window.FastClick || {};
  FastClick.attach(document.body);

  //  Add target blank in realtime for htmllint validation
  $('a[rel="external"]').attr('target','_blank');

  $('#menu-close, #menu-toggle, .sidebar-nav li a').click(function(e) {
    e.preventDefault();
    $('#sidebar-wrapper').toggleClass('active');
  });

  /**
   * Sponsors
   */
  $('.corner-description').hide();

  $('.sponsors-item').on({
    mouseover: function(){
      $(this).find('.corner-description').show();
    },
    mouseout: function(){
      $(this).find('.corner-description').hide();
    }
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

  /**
   * Location
   */
  var map,
      mapOpts = {}
  ;
  /**
   * Draw route
   * @param  {[type]} opts [description]
   * @return {[type]}      [description]
   */
  var drawRouteInMaps = function(opts) {
    map.drawRoute({
      origin: [opts.origin.lat , opts.origin.lng ],
      destination: [opts.destination.lat, opts.destination.lng],
      travelMode: 'driving',
      strokeColor: '#131540',
      strokeOpacity: 0.6,
      strokeWeight: 6
    });
  };


  GMaps.geolocate({
    success: function(position) {
      mapOpts.origin = {
        lat: position.coords.latitude.toFixed(6),
        lng: position.coords.longitude.toFixed(6)
      };
    },
    error: function(error) {
      /*  Add Salvador Location*/
      mapOpts.origin = {
        lat: -12.971606,
        lng: -38.501587
      };
    },
    not_supported: function() {
      alert("Your browser does not support geolocation");
    },
    always: function() {
      /* Init Gmaps class*/
      map = new GMaps({
        div: '#contact',
        lat: mapOpts.origin.lat,
        lng: mapOpts.origin.lng,
        zoomControl : true,
        zoomControlOpt: {
            style : 'SMALL',
            position: 'TOP_LEFT'
        }
      });

      map.addMarker({
        lat:  mapOpts.origin.lat,
        lng:  mapOpts.origin.lng,
        color: 'blue',
        title: 'Você está aqui ',
        infoWindow: {
          content: '<p>Você está aqui </p>'
        },
        verticalAlign: 'top',
        horizontalAlign: 'center'
      });

      /* Set user location for center map*/
      map.setCenter(mapOpts.origin.lat, mapOpts.origin.lng);

      mapOpts.destination = {
        lat: -12.961174,
        lng: -38.432032,
        icon: '/img/pin.png',
        title: 'LinguÁgil 2014 - UNIFACS.'
      };

      map.addMarker({
        lat:  mapOpts.destination.lat,
        lng:  mapOpts.destination.lng,
        title:  mapOpts.destination.title,
        icon: mapOpts.destination.icon,
        infoWindow: {
          content: '<p>' + mapOpts.destination.title + '</p>' +
                  '<p><a id="draw-destination-route">Como chegar</a></p>'
        },
      });

      var $document = $(document);

      $document.on('click', '#draw-destination-route', function(e) {
        e.preventDefault();
        var opts = {
            origin: mapOpts.origin,
            destination : mapOpts.destination
          }
        ;
        drawRouteInMaps(opts);
      });

      map.addControl({
        position: 'top_right',
        style: {
          margin: '5px',
          padding: '1px 6px',
          border: 'solid 1px #717B87',
          background: '#fff'
        },
        content: 'Minha localização',
        events: {
          click: function(){
            map.setCenter(mapOpts.origin.lat, mapOpts.origin.lng);
          },
        }
      });

      map.addControl({
        position: 'top_right',
        style: {
          margin: '5px',
          padding: '1px 6px',
          border: 'solid 1px #717B87',
          background: '#fff'
        },
        content: 'Local do evento',
        events: {
          click: function(){
            map.setCenter(mapOpts.destination.lat, mapOpts.destination.lng);
          },
        }
      });

      map.fitZoom();
    }
  });
})(jQuery);
