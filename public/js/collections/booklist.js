var app = app || {};


(function() {

  app.BookList = Backbone.Collection.extend({
    model: app.Book,
    url: '/api/books',

    initialize: function() {

    },

    sort_key: 'id',

    comparator: function(book) {
      return book.get(this.sort_key);
    },

    sortByField: function(fieldName) {
      this.sort_key = fieldName;
      this.sort();
    },

  });

  app.booklist = new app.BookList();

})();