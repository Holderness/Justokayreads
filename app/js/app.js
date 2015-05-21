var app = app || {};

$(function() {
  $("#releaseDate").datepicker();
  var appView = new app.LibraryView();
	appView.start();


  $('#add').on('click', function() {
    $('#addBookModal').modal('hide');
  });

  $('.starrr').on('starrr:change', function(e, value){
    alert('new rating is ' + value);
  });
});