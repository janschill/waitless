(function() {
  /**
   * A
  var retrieveEditForm = function($buttonEdit) {
    $.ajax({
      type: 'GET',
      url: '/guests/' + $buttonEdit.dataset.guestId + '/edit',
      dataType: 'html',
      success: function(data) {
        $buttonEdit.insertAdjacentHTML('afterend', data);
      },
      error: function(data) {
        console.log('Error:', data);
      }
    });
  };
  */
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

      $editGuestPopups.forEach(function($editGuestPopup) {
        initEditGuestPopup($editGuestPopup);
        $editGuestPopup.classList.remove(popupVisible);
      });
      $thisPopup.classList.add(popupVisible);
      // A retrieveEditForm($buttonEdit);
    });
  };

  document.addEventListener('DOMContentLoaded', function() {
    var $buttonEdits = document.querySelectorAll('.button--edit');

    $buttonEdits.forEach(function($buttonEdit) {
      initButtonEdit($buttonEdit);
    });
  });
}());
