var app = app || {};

$(function() {
	// var books = [
 //    { title: "Jahova's Witness: Redux: Trailer Park Basketball Apocolypse", author: "Timmy", releaseDate: "2050", keywords: "Booyakasha" },
 //    { title: "Ptimker", author: "Yes Randy", releaseDate: "2023", keywords: "Yup" },
 //    { title: "Hands Down", author: "Ralph", releaseDate: "2013", keywords: "Ya caught me" },
 //    { title: "Joo Joo Beans", author: "Del Icious", releaseDate: "2000", keywords: "Congooooooooooo" },
 //    { title: "Ptimker 2", author: "Yes Randy", releaseDate: "2026", keywords: "The Ptimkering" }
	// ];
  $("#releaseDate").datepicker();
  var appView = new app.LibraryView();
	appView.start();
});