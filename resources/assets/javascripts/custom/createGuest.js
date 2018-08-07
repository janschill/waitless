(() => {
  function toggleClassListPopupCreate($popupNewGuestToggle, $popupNewGuest, $table) {
    $popupNewGuestToggle.classList.toggle('popup__toggle--hidden');
    $popupNewGuest.classList.toggle('popup--visible');
    $table.classList.toggle('table--faded');
  }

  function initNewGuest ($popupNewGuest) {
    let $popupNewGuestToggle = $popupNewGuest.querySelector('.popup__toggle'),
      $table = document.querySelector('.table'),
      $formNewGuest = document.querySelector('#form-new-guest'),
      $formSubmitCancel = $popupNewGuest.querySelector('.form__submit--cancel');

    $formNewGuest.addEventListener('submit', event => {
      event.preventDefault();

      if (Form.validateForm($formNewGuest)) {
        $formNewGuest.submit();
      }
    });

    $popupNewGuestToggle.addEventListener('click', event => {
      event.preventDefault();
      toggleClassListPopupCreate($popupNewGuestToggle, $popupNewGuest, $table);
    });

    $formSubmitCancel.addEventListener('click', event => {
      event.preventDefault();
      toggleClassListPopupCreate($popupNewGuestToggle, $popupNewGuest, $table);
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    let $popupNewGuest = document.querySelector('.popup--new-guest');

    if ($popupNewGuest) {
      initNewGuest($popupNewGuest);
    }
  });
})();