var app = app || {};

app.LibraryView = Backbone.View.extend({
	el: '#books',

	events: {
    'click #add': 'addBook',
	},

  initialize: function() {
    this.collection = new app.Library();
    this.thumbnailView = new app.ThumbnailView();
    this.bookListView = new app.BookListView( { collection: this.collection } );

    this.listenTo(this.thumbnailView, 'image-uploaded', this.updateInput);
  },

  render: function() {
    this.thumbnailView.setElement(this.$('#imageCoverUpload')).render();
    this.bookListView.setElement(this.$('#bookList'));
  },

  start: function() {
    this.render();
    this.collection.fetch({ reset: true });
  },

  addBook: function(e) {
    e.preventDefault();
    this.thumbnailView.submit();
  },

  updateInput: function(path) {
    console.log(path);
    $('#coverImage').val(path);
    this.createData();
  },

  createData: function( e ) {

    var formData = {};

    $( '#addBook div' ).children( 'input' ).each( function( i, el ) {
      if ( $(el).val() !== '' ) {
        if ( el.id === 'keywords' ) {
          formData[ el.id ] = [];
          _.each( $( el ).val().split( ' ' ), function( keyword ) {
            formData[ el.id ].push({ 'keyword': keyword });
          });
        } else if ( el.id === 'releaseDate' ) {
          formData[ el.id ] = $( '#releaseDate' ).datepicker( 'getDate' ).getTime();
        } else {
          formData[ el.id ] = $( el ).val();
        }
      }
      $( el ).val('');
    });

    this.collection.create( formData );
    $('#uploadedImage').val('');
  }

});