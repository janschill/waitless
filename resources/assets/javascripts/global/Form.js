class Form {
  static validateWaitidId (waitidId) {
    return waitidId !== '';
  }

  static validateGroupSize (groupSize) {
    return groupSize !== '' || parseInt(groupSize) > 12;
  }

  static validateComment (comment) {
    return comment.length < 22;
  }

  static validateForm ($form) {
    let guest = {
      'waitidId': $form['guest_waitidId'].value,
      'groupSize': $form['guest_groupSize'].value,
      'comment': $form['guest_comment'].value,
      'preordered': $form['guest_preordered'].value
    }

    let $smallError = document.createElement('small');
    $smallError.classList.add('error');

    if (!Form.validateWaitidId(guest.waitidId)) {
      $smallError.appendChild(document.createTextNode('Es wurde keine gültige Wartenummer gesetzt.'));
      $form.parentNode.insertBefore($smallError, $form);
      return false;
    }
    if (!Form.validateGroupSize(guest.groupSize)) {
      $smallError.appendChild(document.createTextNode('Es wurde keine gültige Gruppengröße gesetzt.'));
      $form.parentNode.insertBefore($smallError, $form);
      return false;
    }
    if (!Form.validateComment(guest.comment)) {
      $smallError.appendChild(document.createTextNode('Der Hinweistext ist zu lang.'));
      $form.parentNode.insertBefore($smallError, $form);
      return false;
    }
    return true;
  };
}