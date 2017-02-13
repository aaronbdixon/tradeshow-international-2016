(function() {
    var state = {
      mode: 'pause',
      captionState: 'closed'
    };

    Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
        get: function(){
            return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
        }
    });

    $(document).ready(function(e) {
      $('#carousel').carousel({
        interval: 5000,
        pause: null
      });

      $('#carousel').carousel('pause');

      $('a.thumbnail').on('click', function(e) {
        e.preventDefault();

        var slideIndex = $(this).data('index');
        $('#carousel').carousel(slideIndex);
        $('#slide-selector').modal('hide');
      });

      $('video').on('click', function() {
          var video = $(this)[0];

          if(video.playing) {
            video.pause();
            return;
          }

          video.play();
      });
    });

    $('button#slide-mode').click(function(e) {
      e.preventDefault();

      if (state.mode === 'pause') {
        state.mode = 'play';
        $('button#slide-mode span')
          .removeClass('glyphicon-play')
          .addClass('glyphicon-pause');
        $('#carousel').carousel('cycle');
      } else {
        state.mode = 'pause';
        $('button#slide-mode span')
          .removeClass('glyphicon-pause')
          .addClass('glyphicon-play');
        $('#carousel').carousel('pause');
      }
    });

    $('#carousel').on('slide.bs.carousel', function(e) {
      if (state.mode === 'pause') {
        $(this).carousel('pause');
      }

      $('.caption-content').hide('fast', function(e) {
        state.captionState = 'closed';
      });

      $.each($('video'), function(index, value) {
        value.pause();
      });

      $.each($('.more-info').find('span.glyphicon'), function(index, value) {
        $(value).removeClass('glyphicon-remove-sign')
          .addClass('glyphicon-info-sign');
      });
    });

    $('.more-info').on('click', function(e) {
      e.preventDefault();

      if (state.captionState === 'closed') {
        state.captionState = 'open';
        $(this).parent().find('.caption-content').show('slow', function(e) {

        });
        $(this).find('span.glyphicon').removeClass('glyphicon-info-sign')
          .addClass('glyphicon-remove-sign');
      } else {
        state.captionState = 'closed';
        $(this).parent().find('.caption-content').hide('slow', function(e) {

        });
        $(this).find('span.glyphicon').removeClass('glyphicon-remove-sign')
          .addClass('glyphicon-info-sign');
      }
    });
})();