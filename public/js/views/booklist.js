var app = app || {};


(function($) {

  app.BookListView = Backbone.View.extend({

    el: '#bookList',
  
    initialize: function() {
      // this.listenTo(this.collection, 'add', this.renderBook);
      // this.listenTo(this.collection, 'reset', this.render);
      // this.listenTo(this.collection, 'sort', this.render);
      this.listenTo(this.collection, 'change', this.render);
      var this_ = this;

      this.el = '#bookList';

      this.collection.on('reset', function() {
        // How do I know what event was triggered?
       console.log('fortheloveofgodreset', arguments);
       console.log(this);
       this_.render();
       
      });
      
      this.collection.on('add', function() {
        // How do I know what event was triggered?
       console.log('add', arguments);
       this_.renderBook(arguments[0]);
      });
      

      var paginator = new Backgrid.Extension.Paginator({
        renderIndexedPageHandles: false,
        collection: this.collection,
        controls: {
          rewind: null,
          fastForward: null
        }
      });
      $("#paginator").empty().append(paginator.render().$el);

    },

    render: function() {
      this.remove();
      $(this.el).empty();
      console.log('render each');
      this.collection.each(function (item) {
        this.renderBook(item);
      }, this);
      if (this.collection.length === 0) { $('.add-a-book-pig-container').show(); }
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
      if ($('.add-a-book-pig-container')) { $('.add-a-book-pig-container').remove(); }
      $(bookView.render().el).appendTo($(this.el));
    }

  });

})(jQuery);