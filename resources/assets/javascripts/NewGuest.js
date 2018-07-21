(function () {

  var initNewGuest = function ($popup) {
    var $popupToggle = $popup.querySelector('.popup__toggle');

    $popupToggle.addEventListener('click', function (event) {
      event.preventDefault();

      $popupToggle.classList.toggle('popup__toggle--active');
      $popup.classList.toggle('popup--visible');
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    var $popup = document.querySelector('.popup');

    if ($popup) {
      initNewGuest($popup);
    }
  });
}());