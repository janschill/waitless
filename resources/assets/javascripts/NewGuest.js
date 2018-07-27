(function () {
  var validateWaitidId = function(waitidId) {
    return waitidId !== '';
  };

  var validateGroupSize = function(groupSize) {
    return groupSize !== '' || parseInt(groupSize) > 12;
  };

  var validateComment = function(comment) {
    return comment.length < 22;
  };

  var validateForm = function($form) {
    var guest = {
      'waitidId': $form['guest[waitidId]'].value,
      'groupSize': $form['guest[groupSize]'].value,
      'comment': $form['guest[comment]'].value,
      'preordered': $form['guest[preordered]'].value
    }

    var $smallError = document.createElement('small');
    $smallError.classList.add('error');

    if (!validateWaitidId(guest.waitidId)) {
      $smallError.appendChild(document.createTextNode('Es wurde keine gültige Wartenummer gesetzt.'));
      $form.parentNode.insertBefore($smallError, $form);
      return false;
    }
    if (!validateGroupSize(guest.groupSize)) {
      $smallError.appendChild(document.createTextNode('Es wurde keine gültige Gruppengröße gesetzt.'));
      $form.parentNode.insertBefore($smallError, $form);
      return false;
    }
    if (!validateComment(guest.comment)) {
      $smallError.appendChild(document.createTextNode('Der Hinweistext ist zu lang.'));
      $form.parentNode.insertBefore($smallError, $form);
      return false;
    }
    return true;
  };

  var initNewGuest = function ($popupNewGuest) {
    var $popupNewGuestToggle = $popupNewGuest.querySelector('.popup__toggle'),
      $table = document.querySelector('.table'),
      $formNewGuest = document.querySelector('#form-new-guest');

    $formNewGuest.addEventListener('submit', function(event) {
      event.preventDefault();

      if (validateForm(this)) {
        this.submit();
      }
    });

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