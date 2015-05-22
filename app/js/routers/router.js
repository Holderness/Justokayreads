var app = app || {};

(function () {

  var LibraryRouter = Backbone.Router.extend({
    
    routes: {
      '*filter': 'setFilter'
    },

    setFilter: function(param) {
      app.BookFilter = param || '';

      app.booklist.trigger('filter');
    }
  });


  app.LibraryRouter = new LibraryRouter();
  Backbone.history.start();

})();