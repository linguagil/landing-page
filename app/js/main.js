/* globals alert */
(function($) {
  'use strict';

  /**
   *  Calling fastclick in application
   */
  var FastClick = window.FastClick || {},
      GMaps = window.GMaps || {},
      $window = $(window)
  ;

  FastClick.attach(document.body);

  //  Add target blank in realtime for htmllint validation
  $('a[rel="external"], .external').attr('target','_blank');

  $('#menu-close, #menu-toggle, .sidebar-nav li a[data-animation="scroll"]').click(function(e) {
    e.preventDefault();
    $('#sidebar-wrapper').toggleClass('active');
  });

  if ( $('.nav-tabs')[0] ) {
    var date = new Date(),
      month = date.getMonth(),
      day = date.getDate(),
      $navTabs = $('.nav-tabs')
    ;
    if (month === 2 && day <= 13) {
      $navTabs.find('a[href="#tab1"]').trigger('click');
    } else if (month === 2 && day === 14) {
      $navTabs.find('a[href="#tab2"]').trigger('click');
    } else {
      $navTabs.find('a[href="#tab3"]').trigger('click');
    }
  }

  /**
   * Sponsors
   */
  if ( $window.width() >= 886) {
    $('.thumbnail').hover(
      function(){
        $(this).find('.caption').slideDown(250); //.fadeIn(250)
      },
      function(){
        $(this).find('.caption').slideUp(250); //.fadeOut(205)
      }
    );
  }

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
    $('.close').on('click', function(e){
      e.preventDefault();
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

  $('a[href*=#][data-animation="scroll"]:not([href=#])').click(function() {
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
   * Render video
   */
  //  Calling video target
  $('.video-target').on('click', function(e){
    e.preventDefault();
    var $videoTarget = $(this),
        targetID = $videoTarget.data('target'),
        targetVideo = $videoTarget.data('video-src'),
        videoWidth = $videoTarget.data('width'),
        videoHeight = $videoTarget.data('height')
    ;

    if ( $window.width() <= 600) {
      var $imgResponsive = $('.img-responsive');
      videoWidth = $imgResponsive.width();
      videoHeight = $imgResponsive.height();
    }
    getVideoFileFromPlayer(targetID, {
      'videoPath': targetVideo,
      'width': videoWidth,
      'height': videoHeight
    });
  });

  /**
   * Render Video player
   * @param  {[type]} target  DOMElement target
   * @param  {[type]} options Array options
   * @return {[void]}
   */
  function getVideoFileFromPlayer(target, options) {

    var type = '',
        $target = $(target);

    if( options.videoPath.indexOf('vimeo') !== -1 ) {
      type = 'type="video/vimeo"';
    }
    if( options.videoPath.indexOf('youtube') !== -1) {
      type = 'type="video/youtube"';
    }

    options.count = $('.video-player').size() + 1;

    /**
     *   Width and height verification
     *   If you want get container width and height
     */
    $target.html('<video class="video-player" autoplay="true" width="'+options.width+'" height="'+options.height+'" id="player'+ options.count +'" src="' + options.videoPath + '" ' + type + ' /></video>');

    $('#player'+ options.count).mediaelementplayer({
      //enableAutosize: true,
      // if the <video width> is not specified, this is the default
      //defaultVideoWidth: 500,
      // if the <video height> is not specified, this is the default
      //defaultVideoHeight: 400,
      // if set, overrides <video width>
      /*videoWidth: -1,
      // if set, overrides <video height>
      videoHeight: -1,*/
      // show framecount in timecode (##:00:00:00)
      showTimecodeFrameCount: true,
      // used when showTimecodeFrameCount is set to true
      framesPerSecond: 25,
      // Hide controls when playing and mouse is not over the video
      alwaysShowControls: true,
      // force iPad's native controls
      iPadUseNativeControls: true,
      // force iPhone's native controls
      iPhoneUseNativeControls: true,
      // force Android's native controls
      AndroidUseNativeControls: true,
      // when this player starts, it will pause other players
      pauseOtherPlayers: true,
      // allows testing on HTML5, flash, silverlight
      // auto: attempts to detect what the browser can do
      // auto_plugin: prefer plugins and then attempt native HTML5
      // native: forces HTML5 playback
      // shim: disallows HTML5, will attempt either Flash or Silverlight
      // none: forces fallback view
      mode: 'auto',
      // remove or reorder to change plugin priority and availability
      plugins: ['vimeo', 'youtube', 'native', 'flash', 'silverlight']
    });
    //  Removing controls if video == vimeo
    if( options.videoPath.indexOf('vimeo') !== -1 ) {
      $target.find('.mejs-controls').remove();
    }

  }

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
    //  Clean oldest routes
    map.cleanRoute();

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
    error: function() {
      /*  Add Salvador Location*/
      mapOpts.origin = {
        lat: -12.971606,
        lng: -38.501587
      };
    },
    always: function() {
      if ( !navigator.geolocation ) {
        alert('Your browser does not support geolocation');
      }
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
        title: 'LinguÁgil 2014 - UNIFACS ( 13 e 14 de março ).'
      };

      map.addMarker({
        lat:  mapOpts.destination.lat,
        lng:  mapOpts.destination.lng,
        title:  mapOpts.destination.title,
        icon: mapOpts.destination.icon,
        infoWindow: {
          content: '<p>' + mapOpts.destination.title + '</p>' +
                  '<p><a id="draw-destination-route" data-talk="false">Como chegar</a></p>' +
                  '<p><a href="http://www.unifacs.br" target="_blank" >Website</a></p>'
        },
      });

      mapOpts.destinationTalks = {
        lat: -12.979808,
        lng: -38.458562,
        icon: '/img/pin.png',
        title: 'LinguÁgil 2014 - Empresarial Thomé de Souza ( 15 de março ).'
      };

      map.addMarker({
        lat:  mapOpts.destinationTalks.lat,
        lng:  mapOpts.destinationTalks.lng,
        title:  mapOpts.destinationTalks.title,
        icon: mapOpts.destinationTalks.icon,
        infoWindow: {
          content: '<p>' + mapOpts.destinationTalks.title + '</p>' +
                  '<p><a id="draw-destination-route" data-talk="true">Como chegar</a></p>' +
                  '<p><a href="http://www.empresarialthomedesouza.com.br/localizacao.cfm" target="_blank" >Website</a></p>'
        },
      });

      $(document).on('click', '#draw-destination-route', function(e) {
        e.preventDefault();
        var destinationTalk = $(this).data('talk');
        var opts = {
            origin: mapOpts.origin,
            destination : (destinationTalk ? mapOpts.destinationTalks : mapOpts.destination)
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
        content: 'Local do evento dias 13 e 14 de março',
        events: {
          click: function(){
            map.setCenter(mapOpts.destination.lat, mapOpts.destination.lng);
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
        content: 'Local do evento dia 15 de março',
        events: {
          click: function(){
            map.setCenter(mapOpts.destinationTalks.lat, mapOpts.destinationTalks.lng);
          },
        }
      });

      map.fitZoom();
    }
  });

  $window.load( function(){
    if ( $window.width() <= 600 ) {
      $('.video-target').trigger('click');
    }
  });


})(jQuery);
