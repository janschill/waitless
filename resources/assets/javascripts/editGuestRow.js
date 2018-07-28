(function () {
  var initGuestWaitid = function($formGuestRow, $guestWaitid) {
    $guestWaitid.addEventListener('click', function(event) {
      event.preventDefault();
      var $guestWaitidPopup = document.querySelector('#guest-waitid-popup');

      $guestWaitidPopup.classList.toggle('modal--hidden');
    });
  };

  var initGuestGroupSize = function($formGuestRow, $guestGroupSize) {
    $guestGroupSize.addEventListener('click', function() {
      $formGuestRow.submit();
    });
  };

  var initGuestPreordered = function($formGuestRow, $guestPreordered) {
    $guestPreordered.addEventListener('change', function() {
      var $guestPreorderedHidden = $formGuestRow.querySelector('#guest-preordered-hidden');
      $guestPreorderedHidden.value = $guestPreordered.checked ? 1 : 0;
      $formGuestRow.submit();
    });
  };

  var initGuestState = function($formGuestRow, $guestState) {
    $guestState.addEventListener('click', function() {
      console.log('submit');
    });
  };

  var initGuestComment = function($formGuestRow, $guestComment) {
    $guestComment.addEventListener('click', function() {
      console.log('submit');
    });
  };

  var initFormGuestRow = function ($formGuestRow) {
    var $guestWaitid = $formGuestRow.querySelector('#guest-waitid'),
      $guestGroupSize = $formGuestRow.querySelector('#guest-group-size'),
      $guestPreordered = $formGuestRow.querySelector('#guest-preordered'),
      $guestComment = $formGuestRow.querySelector('#guest-comment'),
      $guestState = $formGuestRow.querySelector('#radio-state-1');

    initGuestWaitid($formGuestRow, $guestWaitid);
    initGuestGroupSize($formGuestRow, $guestGroupSize);
    initGuestPreordered($formGuestRow, $guestPreordered);
    initGuestComment($formGuestRow, $guestComment);
    initGuestState($formGuestRow, $guestState);

    $formGuestRow.addEventListener('submit', function(event) {
      event.preventDefault();

      console.log('FormGuestRow submit');
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    var $formGuestRow = document.querySelector('#form-guest-row');

    if ($formGuestRow) {
      initFormGuestRow($formGuestRow);
    };
  });
}());