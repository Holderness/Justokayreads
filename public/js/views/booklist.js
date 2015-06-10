var app = app || {};


(function($) {

  app.BookListView = Backbone.View.extend({

    el: '#booksss',
  
    initialize: function() {
      this.listenTo(this.collection, 'add', this.renderBook);
      this.listenTo(this.collection, 'reset', this.render);
      // this.listenTo(this.collection, 'sort', this.render);
      // this.on('reset', function() {
      //   // How do I know what event was triggered?
      //  console.log('reset', arguments);
      // });
      // this.on('sort', function() {
      //   // How do I know what event was triggered?
      //  console.log('sort', arguments);
      // });
    },

    render: function() {
      // this.$el.empty().off();
      this.remove();
      console.log('render each');
      this.collection.each(function (item) {
        this.renderBook(item);
      }, this);
      $(".starrr").starrr();
      autosize($('textarea#commentInput'));
      

      // var this_ = this;
        // $('#commentModal').on('shown.bs.modal', function(e) {
        //   $(this).on('click', '#comment-update-btn', function() {
        //     this_.collection.trigger('update-Comment');
        //     $('#commentModal').modal('hide');
        //   });
        //   autosize($('textarea#commentInput'));
        // });
     
    },

    renderBook: function(item) {
      var bookView = new app.BookView({
        model: item
      });
      $(bookView.render().el).appendTo('#bookList');
    }

  });

})(jQuery);