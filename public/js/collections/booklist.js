var app = app || {};


(function() {

  app.BookList = Backbone.PageableCollection.extend({
    model: app.Book,
    url: '/api/books',
    mode: "client",
    state: {
      firstPage: 0,
      currentPage: 0,
      pageSize: 10,
    },

    queryParams: {

    // `Backbone.PageableCollection#queryParams` converts to ruby's
    // will_paginate keys by default.
      currentPage: "current_page",
      pageSize: "page_size"
  },

    initialize: function() {
      this.on('sort', function() {
        // How do I know what event was triggered?
       console.log('sort', arguments);
      });
      this.on('reset', function() {
        // How do I know what event was triggered?
       console.log('booklist reset:   ', arguments);

      });
      this.on('change', function() {
        // How do I know what event was triggered?
       console.log('change', arguments);
      });
      this.on('add', function() {
        // How do I know what event was triggered?
       console.log('add', arguments);
      });
    },

    sort_key: 'id',
    sort_direction: 1,

    comparator: function(book, book2) {

        var a = book.get(this.sort_key);
        var b = book2.get(this.sort_key);

        var sort = this.sort_direction === 1 ?
         ( a > b ?  -1
         : a < b ? 1
         :          0) :
         ( a > b ?  1
         : a < b ? -1
         :          0) ;

      return sort;

    },

    sortByField: function(fieldName) {
      this.sort_key = fieldName;
      this.sort_direction = this.sort_direction === 1 ? -1 : 1;
      this.setSorting(fieldName, this.sort_direction, {full: true});
      this.fullCollection.sort();
    },

  });

  app.booklist = new app.BookList();

})();