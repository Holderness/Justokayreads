var app = app || {};

$(function() {
  $("#dateCompleted").datepicker();
  var appView = new app.LibraryView();
	appView.start();


  $('#add').on('click', function() {
    $('#addBookModal').modal('hide');
  });

  $('.starrr').on('starrr:change', function(e, value){
    alert('new rating is ' + value);
  });
});