var app = app || {};

$(function() {

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