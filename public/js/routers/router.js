var app = app || {};

(function () {

  var LibraryRouter = Backbone.Router.extend({
    
    routes: {
      '': 'library',
      'signUp': 'login',
      'library': 'library',
      '*filter': 'setFilter'
    },

    login: function() {
      this.loginView = new app.LoginView({model: app.LoginModel});
      this.loginView.render();
    },

    library: function() {
      var appView = new app.LibraryView();
      appView.start();
      $("#dateCompleted").datepicker();
      $('.update-dateCompleted').datepicker();
    },

    setFilter: function(param) {
      app.BookFilter = param || '';

      app.booklist.trigger('filter');
    }
  });


  app.LibraryRouter = new LibraryRouter();
  Backbone.history.start();

})();