class Form {
  static checkWaitidExists(waitidNumber, existingWaitidNumbers) {
    let waitidExist = false;

    existingWaitidNumbers.forEach(number => {
      if (waitidNumber == number) {
        waitidExist = true;
      }
    });
    return waitidExist;
  }
  
  static validateWaitidId(waitidId) {
    return waitidId !== '';
  }

  static validateGroupSize(groupSize) {
    return groupSize !== '' || parseInt(groupSize) > 12;
  }

  static validateComment(comment) {
    return comment.length < 22;
  }

  static validateNewGuestForm($form) {
    let guest = {
      waitidId: $form['guest_waitidId'].value,
      groupSize: $form['guest_groupSize'].value,
      comment: $form['guest_comment'].value,
      preordered: $form['guest_preordered'].value
    };

    let $smallError = document.createElement('small');
    $smallError.classList.add('error');

    if (!Form.validateWaitidId(guest.waitidId)) {
      $smallError.appendChild(
        document.createTextNode('Es wurde keine gültige Wartenummer gesetzt.')
      );
      $form.parentNode.insertBefore($smallError, $form);
      return false;
    }
    if (!Form.validateGroupSize(guest.groupSize)) {
      $smallError.appendChild(
        document.createTextNode('Es wurde keine gültige Gruppengröße gesetzt.')
      );
      $form.parentNode.insertBefore($smallError, $form);
      return false;
    }
    if (!Form.validateComment(guest.comment)) {
      $smallError.appendChild(
        document.createTextNode('Der Hinweistext ist zu lang.')
      );
      $form.parentNode.insertBefore($smallError, $form);
      return false;
    }
    return true;
  }

  static validateNewWaitidForm($form, existingWaitidNumbers) {
    let waitid = {
      number: $form['waitid_number'].value
    };

    let $smallError = document.createElement('small');
    $smallError.classList.add('error');

    if (Form.checkWaitidExists(waitid.number, existingWaitidNumbers)) {
      $smallError.appendChild(
        document.createTextNode('Wartemarke existiert bereits.')
      );
      $form.parentNode.insertBefore($smallError, $form);
      return false;
    }
    return true;
  }
}
