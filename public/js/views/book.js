var app = app || {};

(function($) {

  app.BookView = Backbone.View.extend({

    template: _.template( $('#bookTemplate').html() ),

    events: {
      'click .delete': 'delete',
      'starrr:change': 'updateStarrr',
      'click .edit': 'edit',
      'click .comment': 'comment',
    },

    initialize: function() {
      this.listenTo( this.model, 'destroy', this.remove );
      this.listenTo( this.model, 'updateBook', this.update );
      this.listenTo( this.model, 'updateComment', this.updateComment );
      this.listenTo( this.model, 'change', this.render );
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ));

      $(".starrr").starrr();

      var this_ = this;
        $('#commentModal').on('shown.bs.modal', function(e) {
          autosize.update($('textarea#commentInput'));
        });
      
      return this;
    },


    edit: function() {
      var attrs = this.model.attributes;
      $('.updateImage').attr('src', attrs.coverImage);
      $('.update-title').val(attrs.title);
      $('.update-author').val(attrs.author);
      $('.update-dateCompleted').val(moment(attrs.dateCompleted).format('MM/DD/YYYY'));
      var keywords = [];
      _.each( attrs.keywords, function(keyword) {
        if (!_.isEmpty(keyword.keyword)) {
          keywords.push(keyword.keyword);
        }
      });
      $('.update-keywords').val(keywords.join(' '));
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

      $('#editBookModal').modal('hide');
    },

    comment: function() {
      $('#commentInput').val(this.model.attributes.comment);

      app.book = this.model;
    },

    updateComment: function() {
      this.model.set('comment', $('#commentInput').val());
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