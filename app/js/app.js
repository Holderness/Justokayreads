var app = app || {};

$(function() {
  $("#dateCompleted").datepicker();
  $('.update-dateCompleted').datepicker();
  var appView = new app.LibraryView();
	appView.start();


  // $('#add').on('click', function() {
  //   $('#addBookModal').modal('hide');
  // });

  // $('#update-btn').on('click', function() {
  //    $('#editBookModal').modal('hide');
  // });

  autosize($('textarea#commentInput'));

});