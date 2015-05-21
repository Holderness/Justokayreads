var app = app || {};

$(function() {
  $("#releaseDate").datepicker();
  var appView = new app.LibraryView();
	appView.start();


  $('#add').on('click', function() {
    $('#addBookModal').modal('hide');
  });
});