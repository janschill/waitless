class Guest {
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
          Guest.setWaitidId($tableRow, $modalListItem.dataset.waitidId);
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
          Guest.setGroupSize($tableRow, $modalListItem.dataset.groupSize);
          $tableRow.submit();
        });
      });
  }

  static initGuestPreordered($tableRow, $tableColumn) {
    $tableColumn
      .querySelector('.input--preordered')
      .addEventListener('change', () => {
        Guest.setPreordered($tableRow, $tableColumn.checked ? 1 : 0);
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
          Guest.setState($tableRow, $guestStateButton.dataset.stateId);
          $tableRow.submit();
        });
      });
  }

  static setGroupSize($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.input__guest-group-size');
    $thisInput.value = value;
  }

  static setPreordered($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.input__guest-preordered');
    $thisInput.value = value;
  }

  static setWaitidId($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.input__guest-waitid-id');
    $thisInput.value = value;
  }

  static setState($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.input__guest-state-id');
    $thisInput.value = value;
  }

}
