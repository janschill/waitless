(function () {
  function validateWaitidId (waitidId) {
    return waitidId !== '';
  }

  function validateGroupSize (groupSize) {
    return groupSize !== '' || parseInt(groupSize) > 12;
  }

  function validateComment (comment) {
    return comment.length < 22;
  }

  function validateForm ($form) {
    let guest = {
      'waitidId': $form['guest_waitidId'].value,
      'groupSize': $form['guest_groupSize'].value,
      'comment': $form['guest_comment'].value,
      'preordered': $form['guest_preordered'].value
    }

    let $smallError = document.createElement('small');
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

  function initNewGuest ($popupNewGuest) {
    let $popupNewGuestToggle = $popupNewGuest.querySelector('.popup__toggle'),
      $table = document.querySelector('.table'),
      $formNewGuest = document.querySelector('#form-new-guest');

    $formNewGuest.addEventListener('submit', event => {
      event.preventDefault();

      if (validateForm($formNewGuest)) {
        this.submit();
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