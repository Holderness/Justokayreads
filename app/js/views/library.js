var app = app || {};

(function($) {

  app.LibraryView = Backbone.View.extend({
    el: '#page-content',

    events: {
      'click #add': 'addBook',
      'click #update': 'updateBook',
      'click #update-btn': 'updateBookClose',
      'click #comment-update': 'updateComment',
      'click #comment-update-btn': 'updateCommentClose'
    },

    initialize: function() {
      this.thumbnailView = new app.ThumbnailView();
      this.bookListView = new app.BookListView( { collection: app.booklist } );

      this.listenTo(this.thumbnailView, 'image-uploaded', this.updateInput);
      this.listenTo(app.booklist, 'filter', this.filterAll);
    },

    render: function() {
      this.thumbnailView.setElement(this.$('#imageCoverUpload')).render();
      this.bookListView.setElement(this.$('#bookList'));
    },

    start: function() {
      this.render();
      app.booklist.fetch({ reset: true });
    },

    addBook: function(e) {
      e.preventDefault();
      this.thumbnailView.submit();
      $('#addBookModal').modal('hide');
    },

    updateBook: function() {
      app.book.trigger('updateBook');
      // app.booklist.trigger('updateBook');
    },

    updateBookClose: function() {
      $('#editBookModal').modal('hide');
    },

    updateComment: function() {
      debugger;
      // app.book.trigger('updateComment');
    },

    updateCommentClose: function() {
      debugger;
      app.book.trigger('updateComment');
      $('#commentModal').modal('hide');
    },

    filterOne: function(book) {
      book.trigger('visible');
    },

    filterAll: function() {
       app.booklist.each(this.filterOne, this);
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
            } else if ( el.id === 'dateCompleted' ) {
              formData[ el.id ] = $( '#dateCompleted' ).datepicker( 'getDate' ).getTime();
            } else {
              formData[ el.id ] = $( el ).val();
            }
          }
          $( el ).val('');
        });
        app.booklist.create( formData );
        $('#uploadedImage').val('');
      }

  });

})(jQuery);