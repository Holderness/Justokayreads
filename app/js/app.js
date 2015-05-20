var app = app || {};

$(function() {
  $("#releaseDate").datepicker();
  var appView = new app.LibraryView();
	appView.start();
});