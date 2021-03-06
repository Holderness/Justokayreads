var app = app || {};

(function($) {

  app.LoginView = Backbone.View.extend({
    el: '#please-login',
    template: _.template($('#login').html()),
    events: {
      "click #signUpBtn": "signUp"
    },
    initialize: function(options) {
      this.render();
    },
    render: function() {
      this.$el.html(this.template());
      return this;
    },
    signUp: function() {
      // var username = $('#usernameText').val();
      // var password = $('#passwordText').val();

      // $.ajax({
      //   url: '/api/users',
      //   method: 'POST',
      //   data: {username: username, password: password}
      // }).done(function(data) {
      //   console.log(data);
      // });

      // app.LibraryRouter.navigate('library', {trigger: true});
    }
  });

})(jQuery);



// var app = app || {};

// (function($) {

//   app.LoginView = Backbone.View.extend({
//     el: '#page-content',
//     template: _.template($('#login').html()),
//     events: {
//       "click #signUpBtn": "signUp"
//     },
//     initialize: function(options) {
//     },
//     render: function() {
//       this.$el.html(this.template());
//       return this;
//     },
//     signUp: function() {
//       var username = $('#usernameText').val();
//       var password = $('#passwordText').val();

//       $.ajax({
//         url: '/api/users',
//         method: 'POST',
//         data: {username: username, password: password}
//       }).done(function(data) {
//         console.log(data);
//       });

//       app.LibraryRouter.navigate('library', {trigger: true});
//     }
//   });

// })(jQuery);