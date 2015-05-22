var app = app || {};


(function() {

  app.BookList = Backbone.Collection.extend({
    model: app.Book,
    url: '/api/books'
  });

})();