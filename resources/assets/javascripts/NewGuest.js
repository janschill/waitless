(function () {

  var initNewGuest = function ($popupNewGuest) {
    var $popupNewGuestToggle = $popupNewGuest.querySelector('.popup__toggle'),
      $table = document.querySelector('.table');

    $popupNewGuestToggle.addEventListener('click', function (event) {
      event.preventDefault();

      $popupNewGuestToggle.classList.toggle('popup__toggle--danger');
      $popupNewGuest.classList.toggle('popup--visible');
      $table.classList.toggle('table--faded');
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    var $popupNewGuest = document.querySelector('.popup--new-guest');

    if ($popupNewGuest) {
      initNewGuest($popupNewGuest);
    }
  });
}());