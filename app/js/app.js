var app = app || {};

$(function() {
  $("#dateCompleted").datepicker();
  $('.update-dateCompleted').datepicker();
  var appView = new app.LibraryView();
	appView.start();

  $('#commentModal').on('shown.bs.modal', function(e) {
    autosize.update($('textarea#commentInput'));
  });

  autosize($('textarea#commentInput'));

  // $('#logout').on('click', function() {
  //     $.ajax({
  //       url: "/logout",
  //     }).done(function() {
  //       alert('wut');
  //     });
  // });

});