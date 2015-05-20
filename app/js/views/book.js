var app = app || {};

app.BookView = Backbone.View.extend({
	classname: 'bookContainer',
	template: _.template( $('#bookTemplate').html() ),

	events: {
    'click .delete': 'deleteBook'
	},

	initialize: function() {
    this.listenTo( this.model, 'destroy', this.remove );
	},

	render: function() {
    this.$el.html( this.template( this.model.toJSON() ));

    return this;
	},
  
  deleteBook: function () {
    this.model.destroy();
	}

});