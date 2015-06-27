var app = app || {};

$(function() {

  // $('#commentModal').on('shown.bs.modal', function(e) {
  //   $('#comment-update-btn').on('click', function() {
  //     app.book.trigger('updateBook');
  //   });
  //   autosize.update($('textarea#commentInput'));
  // });

  // autosize($('textarea#commentInput'));

  $('#logout').on('click', function() {
      $.ajax({
        url: "/api/logout",
      }).done(function() {
        alert('wut');
      });
  });






});