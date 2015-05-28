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

// $('.comment').on('click', function(e) {
//       _.debounce(function () {
//   this.trigger('mango');
// }, 1000);
// });

  $('#commentModal').on('shown.bs.modal', function(e) {
    autosize.update($('textarea#commentInput'));
  });

  autosize($('textarea#commentInput'));

});