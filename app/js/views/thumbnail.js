app.ThumbnailView = Backbone.View.extend({
  
  events: {
   'change #coverImageUpload': 'renderThumb',
   'submit #uploadCoverForm': 'upload'
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
    this.$form.submit();
  },

  upload: function() {
    var _this = this;
    this.$form.ajaxSubmit({
      error: function( xhr ) {
        _this.renderStatus('Error: ' + xhr.status);
      },
      success: function( response ) {
        _this.trigger('image-uploaded', response.path);
        _this.clearField();
      }
    });
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