var app = app || {};


(function($) {

  app.ThumbnailView = Backbone.View.extend({
  
    events: {
      'change #coverImageUpload': 'renderThumb',
      'attachImage #uploadCoverForm': 'upload'
    },

    render: function() {
      this.renderThumb();
    },

    renderThumb: function() {
      var input = this.$('#coverImageUpload');
      var img = this.$('#uploadedImage')[0];
      if(input.val() !== '') {
        var selected_file = input[0].files[0];
        var reader = new FileReader();
        reader.onload = (function(aImg) {
          return function(e) {
            aImg.src = e.target.result;
          };
        })(img);
        reader.readAsDataURL( selected_file );
      }
    },

    submit: function() {
      this.$form = this.$('#uploadCoverForm');
      this.$form.trigger('attachImage');
    },

    upload: function() {
      var _this = this;
      if (this.$('#coverImageUpload')[0].files.length > 0) {
        this.$form.ajaxSubmit({
          error: function( xhr ) {
            _this.renderStatus('Error: ' + xhr.status);
            alert('Your image is either too large or it is not a .jpeg, .png, or .gif.');
          },
          success: function( response ) {
            console.log('imgUpload response: ', response);
            _this.trigger('image-uploaded', [response.url]);
            console.log('imgUpload path ', response.path);

            _this.clearField();
          }
        });
      } else {
       this.trigger('image-uploaded');
      }
      return false;
    },

    renderStatus: function( status ) {
      $('#status').text(status);
    },

    clearField: function() {
      this.$('#uploadedImage')[0].src = '';
      this.$('#coverImageUpload').val('');
    }

  });

})(jQuery);