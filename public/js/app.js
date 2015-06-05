var app = app || {};

$(function() {

  $('#commentModal').on('shown.bs.modal', function(e) {
    autosize.update($('textarea#commentInput'));
  });

  autosize($('textarea#commentInput'));

  $('#logout').on('click', function() {
    debugger;
      $.ajax({
        url: "/api/logout",
      }).done(function() {
        alert('wut');
      });
  });

  $('#addBook').on('click', function() {
    app.LibraryRouter.navigate('library');
  });

});