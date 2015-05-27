var app = app || {};

(function($) {

  app.BookView = Backbone.View.extend({

    template: _.template( $('#bookTemplate').html() ),

    events: {
      'click .delete': 'delete',
      'starrr:change': 'updateStarrr',
      'click .edit': 'edit',
    },

    initialize: function() {
      this.listenTo( this.model, 'destroy', this.remove );
      this.listenTo( this.model, 'updateBook', this.update );
      this.listenTo( this.model, 'change', this.render );
      this.listenTo( this.model, 'visible', this.toggleVisible );
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ));

      this.$('.starrr').on('starrr:change', function(e, value){
        alert('new rating is ' + value);
      });

      $(".starrr").starrr()

      return this;
    },

    edit: function() {
      var attrs = this.model.attributes;
      $('.updateImage').attr('src', attrs.coverImage);
      $('.update-title').val(attrs.title);
      $('.update-author').val(attrs.author);
      $('.update-dateCompleted').val(attrs.dateCompleted);
      $('.update-keywords').val(attrs.keywords[0].keyword);
      app.book = this.model;
    },

    parseKeywords: function(keywords) {
      var arr = [];
      _.each( keywords.split( ' ' ), function( keyword ) {
        arr.push({ 'keyword': keyword });
      });
      return arr;
    },

    update: function() {
      this.model.set('author', $('.update-author').val());
      this.model.set('title', $('.update-title').val());
      this.model.set('dateCompleted', $('.update-dateCompleted').val());

      var keywordData = this.parseKeywords($('.update-keywords').val());
      this.model.set('keywords', keywordData);

      this.model.save( null, {
        success: function(response) {
          console.log('successfuly UPDATED blog with _id: ' + response.toJSON()._id);
        },
        error: function() {
          console.log('Failed to update blog!');
        }
      });
    },
  
    delete: function () {
      this.model.destroy();
    },

    updateStarrr: function(e, value) {
      this.model.set('stars', value);
      this.model.save();
    }

  });

})(jQuery);