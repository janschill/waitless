(function () {
  function initNewGuest ($popupNewGuest) {
    let $popupNewGuestToggle = $popupNewGuest.querySelector('.popup__toggle'),
      $table = document.querySelector('.table'),
      $formNewGuest = document.querySelector('#form-new-guest');

    $formNewGuest.addEventListener('submit', event => {
      event.preventDefault();

      if (Form.validateForm($formNewGuest)) {
        $formNewGuest.submit();
      }
    });

    $popupNewGuestToggle.addEventListener('click', event => {
      event.preventDefault();

      $popupNewGuestToggle.classList.toggle('popup__toggle--danger');
      $popupNewGuest.classList.toggle('popup--visible');
      $table.classList.toggle('table--faded');
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    let $popupNewGuest = document.querySelector('.popup--new-guest');

    if ($popupNewGuest) {
      initNewGuest($popupNewGuest);
    }
  });
}());