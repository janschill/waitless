class Guest {
  static getInputWaitidIdValue($tableRow) {
    return $tableRow.querySelector('.input__guest-waitid-id').value;
  }

  static setInputWaitidIdValue($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.input__guest-waitid-id');
    $thisInput.value = value;
  }

  static getInputGroupSizeValue($tableRow) {
    return $tableRow.querySelector('.input__guest-group-size').value;
  }

  static setInputGroupSizeValue($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.input__guest-group-size');
    $thisInput.value = value;
  }

  static getInputPreorderedValue($tableRow) {
    return $tableRow.querySelector('.input__guest-preordered').value;
  }

  static setInputPreorderedValue($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.input__guest-preordered');
    $thisInput.value = value;
  }

  static getInputCommentValue($tableRow) {
    return $tableRow.querySelector('.input__guest-comment').value;
  }

  static setInputCommentValue($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.input__guest-comment');
    $thisInput.value = value;
  }

  static getInputStateValue($tableRow) {
    return $tableRow.querySelector('.input__guest-state-id').value;
  }

  static setInputStateValue($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.input__guest-state-id');
    $thisInput.value = value;
  }

  static setWaitidIdValue($tableRow, value) {
    let $buttonWaitidId = $tableRow.querySelector('.button-toggle--waitid-id');
    $buttonWaitidId.innerText = value;
  }


  static initGuestWaitid($tableRow, $tableColumn, $modals) {
    let $guestWaitidButton = $tableColumn.querySelector('.button-toggle--waitid-id'),
      $guestWaitidSubmit = $tableColumn.querySelector('.form__submit--waitid-id.form__submit--success');

    $guestWaitidSubmit.addEventListener('click', event => {
      event.preventDefault();
      $tableRow.submit();
    });

    $guestWaitidButton.addEventListener('click', event => {
      event.preventDefault();
      let $thisGuestWaitidPopup = $tableRow.querySelector('.modal--waitid-id');

      $modals.forEach($modal => {
        Modal.hideModal($modal);
      });
      Modal.showModal($thisGuestWaitidPopup);
    });

    let $buttonToggles = $tableColumn.querySelectorAll('.button-toggle--unoccupied-waitid-id');
    $buttonToggles.forEach($buttonToggle => {
        $buttonToggle.addEventListener('click', event => {
          event.preventDefault();
          Guest.setInputWaitidIdValue($tableRow, $buttonToggle.dataset.waitidId);

          $buttonToggles.forEach($thisButtonToggle => {
            $thisButtonToggle.classList.remove('button-toggle--highlight');
          });
          $buttonToggle.classList.add('button-toggle--highlight');
        });
      });
  }

  static initGuestGroupSize($tableRow, $tableColumn, $modals) {
    let $guestGroupSizeButton = $tableColumn.querySelector('.button-toggle--group-size'),
    $guestGroupSizeSubmit = $tableColumn.querySelector('.form__submit--group-size.form__submit--success');

    $guestGroupSizeSubmit.addEventListener('click', event => {
      event.preventDefault();
      $tableRow.submit();
    });

    $guestGroupSizeButton.addEventListener('click', event => {
      event.preventDefault();
      let $thisGuestGroupSizePopup = $tableRow.querySelector('.modal--group-size');

      $modals.forEach($modal => {
        Modal.hideModal($modal);
      });
      Modal.showModal($thisGuestGroupSizePopup);
    });

    let $buttonToggles = $tableColumn.querySelectorAll('.button-toggle--all-group-size');
    $buttonToggles.forEach($buttonToggle => {
        $buttonToggle.addEventListener('click', event => {
          event.preventDefault();
          Guest.setInputGroupSizeValue($tableRow, $buttonToggle.dataset.groupSize);

          $buttonToggles.forEach($thisButtonToggle => {
            $thisButtonToggle.classList.remove('button-toggle--highlight');
          });
          $buttonToggle.classList.add('button-toggle--highlight');
        });
      });
  }

  static initGuestPreordered($tableRow, $tableColumn) {
    $tableColumn.querySelector('.form__radio--preordered.form__radio--off').addEventListener('click', () => {
        Guest.setInputPreorderedValue($tableRow, 0);
        $tableRow.submit();
      });

    $tableColumn.querySelector('.form__radio--preordered.form__radio--on').addEventListener('click', () => {
        Guest.setInputPreorderedValue($tableRow, 1);
        $tableRow.submit();
      });
  }

  static initGuestComment($tableRow, $tableColumn, $modals) {
    let $guestCommentButton = $tableColumn.querySelector('.button-toggle--comment'),
      $guestInputComment = $tableColumn.querySelector('.modal__text.modal__text--comment'),
      $guestCommentSubmit = $tableColumn.querySelector('.form__submit--comment.form__submit--success');

    $guestCommentSubmit.addEventListener('click', event => {
      event.preventDefault();
      Guest.setInputCommentValue($tableRow, $guestInputComment.value);
      $tableRow.submit();
    });

    $guestCommentButton.addEventListener('click', () => {
      let $thisGuestCommentPopup = $tableRow.querySelector('.modal--comment');

      $modals.forEach($guestCommentPopup => {
        Modal.hideModal($guestCommentPopup);
      });
      Modal.showModal($thisGuestCommentPopup);
    });
  }

  static initGuestState($tableRow, $tableColumn) {
    $tableColumn.querySelectorAll('.button-toggle').forEach($guestStateButton => {
        $guestStateButton.addEventListener('click', () => {
          Guest.setInputStateValue($tableRow, $guestStateButton.dataset.stateId);
          $tableRow.submit();
        });
      });
  }
}
