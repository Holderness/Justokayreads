var app = app || {};


(function () {

    app.Book = Backbone.Model.extend({
      defaults: {
        coverImage: 'img/winnebego.jpg',
        title: 'No title',
        author: 'Unknown',
        dateCompleted: 'Unknown',
        stars: null,
        keywords: 'None'
    },

    parse: function( response ) {
      response.id = response._id;
      return response;
    }
    
  });

})();