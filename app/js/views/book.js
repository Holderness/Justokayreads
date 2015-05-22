var app = app || {};

(function($) {

  app.BookView = Backbone.View.extend({

    template: _.template( $('#bookTemplate').html() ),

    events: {
      'click .delete': 'deleteBook'
    },

    initialize: function() {
      this.listenTo( this.model, 'destroy', this.remove );
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ));

      this.$('.starrr').on('starrr:change', function(e, value){
        alert('new rating is ' + value);
      });

      return this;
    },
  
    deleteBook: function () {
      this.model.destroy();
    }

  });

})(jQuery);