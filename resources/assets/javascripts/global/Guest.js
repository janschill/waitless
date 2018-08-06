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
    let $buttonWaitidId = $tableRow.querySelector('.button--waitid-id');
    $buttonWaitidId.innerText = value;
  }


  static initGuestWaitid($tableRow, $tableColumn, $modals) {
    let $guestWaitidButton = $tableColumn.querySelector('.button--waitid-id');
    $guestWaitidButton.addEventListener('click', event => {
      event.preventDefault();
      let $thisGuestWaitidPopup = $tableRow.querySelector('.modal--waitid-id');

      $modals.forEach($modal => {
        Modal.hideModal($modal);
      });
      Modal.showModal($thisGuestWaitidPopup);
    });

    $tableColumn
      .querySelectorAll('.modal__list-item')
      .forEach($modalListItem => {
        $modalListItem.addEventListener('click', event => {
          event.preventDefault();
          Guest.setInputWaitidIdValue($tableRow, $modalListItem.dataset.waitidId);
          $tableRow.submit();
        });
      });
  }

  static initGuestGroupSize($tableRow, $tableColumn, $modals) {
    let $guestGroupSizeButton = $tableColumn.querySelector(
      '.button--group-size'
    );
    $guestGroupSizeButton.addEventListener('click', () => {
      let $thisGuestGroupSizePopup = $tableRow.querySelector(
        '.modal--group-size'
      );

      $modals.forEach($modal => {
        Modal.hideModal($modal);
      });
      Modal.showModal($thisGuestGroupSizePopup);
    });

    $tableColumn
      .querySelectorAll('.modal__list-item')
      .forEach($modalListItem => {
        $modalListItem.addEventListener('click', event => {
          event.preventDefault();
          Guest.setInputGroupSizeValue($tableRow, $modalListItem.dataset.groupSize);
          $tableRow.submit();
        });
      });
  }

  static initGuestPreordered($tableRow, $tableColumn) {
    $tableColumn
      .querySelector('.input--preordered')
      .addEventListener('change', () => {
        Guest.setInputPreorderedValue($tableRow, $tableColumn.checked ? 1 : 0);
        $tableRow.submit();
      });
  }

  static initGuestComment($tableRow, $tableColumn, $modals) {
    let $guestCommentButton = $tableColumn.querySelector('.button--comment');
    $guestCommentButton.addEventListener('click', () => {
      let $thisGuestCommentPopup = $tableRow.querySelector('.modal--comment');

      $modals.forEach($guestCommentPopup => {
        Modal.hideModal($guestCommentPopup);
      });
      Modal.showModal($thisGuestCommentPopup);
    });
  }

  static initGuestState($tableRow, $tableColumn) {
    $tableColumn
      .querySelectorAll('.modal__list-item')
      .forEach($guestStateButton => {
        $guestStateButton.addEventListener('click', () => {
          Guest.setInputStateValue($tableRow, $guestStateButton.dataset.stateId);
          $tableRow.submit();
        });
      });
  }
}
