var app = app || {};


(function () {

    app.Book = Backbone.Model.extend({

      urlRoot: "/api/books",

      defaults: {
        coverImage: '/img/winnebego.jpg',
        title: 'No title',
        author: 'Unknown',
        dateCompleted: 'Unknown',
        created: new Date().toISOString(),
        stars: null,
        keywords: 'None'
    },

    parse: function( response ) {
      response.id = response._id;
      return response;
    }
    
  });

})();