(function() {
  var initGuestDeleteConfirm = function($thisPopup) {
    var $deleteGuestForm = $thisPopup.querySelector('#form-delete-guest');

    $deleteGuestForm.addEventListener('submit', function() {
      return confirm('Do you really want to submit the form?');
    });
  };

  var initEditGuestPopup = function($editGuestPopup) {
    var $popupToggle = $editGuestPopup.querySelector('.popup__toggle');

    $popupToggle.addEventListener('click', function(event) {
      event.preventDefault();
      $editGuestPopup.classList.remove('popup--visible');
    });
  }

  var initButtonEdit = function($buttonEdit) {
    var popupVisible = 'popup--visible';
    var $thisPopup = document.querySelector('#popup-' + $buttonEdit.dataset.guestId);

    $buttonEdit.addEventListener('click', function(event) {
      event.preventDefault();
      var $editGuestPopups = document.querySelectorAll('.popup--edit-guest');

      initGuestDeleteConfirm($thisPopup);

      $editGuestPopups.forEach(function($editGuestPopup) {
        initEditGuestPopup($editGuestPopup);
        $editGuestPopup.classList.remove(popupVisible);
      });
      $thisPopup.classList.add(popupVisible);
    });
  };

  document.addEventListener('DOMContentLoaded', function() {
    var $buttonEdits = document.querySelectorAll('.button--edit');

    $buttonEdits.forEach(function($buttonEdit) {
      initButtonEdit($buttonEdit);
    });
  });
}());
