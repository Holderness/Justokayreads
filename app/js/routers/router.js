var app = app || {};

(function () {

  var LibraryRouter = Backbone.Router.extend({
    
    routes: {
      '*filter': 'setFilter'
    },

    setFilter: function(param) {
      app.BookFilter = param || '';
      debugger;
    }
  });



})();