var app = app || {};


(function($) {

  app.BookListView = Backbone.View.extend({

    el: '#booksss',
  
    initialize: function() {
      this.listenTo(this.collection, 'add', this.renderBook);
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'change', this.render);
      // this.listenTo(this.collection, 'sort', this.render);
      var this_ = this;
      this.collection.on('add', function() {
        // How do I know what event was triggered?
       console.log('add', arguments);
       this_.renderBook(arguments[0]);
      });
    },

    render: function() {
      this.remove();
      console.log('render each');
      this.collection.each(function (item) {
        this.renderBook(item);
      }, this);
      $(".starrr").starrr();
      autosize($('textarea#commentInput'));
      

      var this_ = this;
      // $('#addBookModal').on('shown.bs.modal', function(e) {
      //   $(this).on('click', '#addbook-btn', function() {
      //     this_.render()
      //   });
      // });

        $('#commentModal').on('shown.bs.modal', function(e) {
          $(this).on('click', '#comment-update-btn', function() {
            this_.trigger('update-Comment');
            $('#commentModal').modal('hide');
          });
          autosize($('textarea#commentInput'));
        });

     
    },

    renderBook: function(item) {
      var bookView = new app.BookView({
        model: item
      });
      $(bookView.render().el).appendTo('#bookList');
    }

  });

})(jQuery);