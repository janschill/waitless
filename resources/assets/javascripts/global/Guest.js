class Guest {
  static destroyRow($element) {
    $element.parentNode.removeChild($element);
  }

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

  static setPreorderedValue($tableRow) {
    let $tableColumn = $tableRow.querySelector('.table__column--preordered'),
      $formRadioOn = $tableColumn.querySelector(
        '.form__radio--preordered.form__radio--on'
      ),
      $formRadioOff = $tableColumn.querySelector(
        '.form__radio--preordered.form__radio--off'
      );

    if ($formRadioOn.getAttribute('checked') == null) {
      $formRadioOn.setAttribute('checked', 'checked');
      $formRadioOff.removeAttribute('checked');
    } else {
      $formRadioOn.removeAttribute('checked');
      $formRadioOff.setAttribute('checked', 'checked');
    }
  }

  static getInputCommentValue($tableRow) {
    return $tableRow.querySelector('.input__guest-comment').value;
  }

  static setInputCommentValue($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.input__guest-comment');
    $thisInput.value = value;
  }

  static setCommentValue($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.button-toggle--comment'),
      $thisModalInput = $tableRow.querySelector('.modal__text--comment');
    $thisInput.innerText = value;
    $thisModalInput.value = value;
  }

  static getInputStateValue($tableRow) {
    return $tableRow.querySelector('.input__guest-state-id').value;
  }

  static setInputStateValue($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.input__guest-state-id');
    $thisInput.value = value;
  }

  static setInnerText($tableRow, classname, value) {
    let $element = $tableRow.querySelector(classname);
    $element.innerText = value;
  }

  static setModalList($guestForm, unoccupiedWaitidIds) {
    let $buttonToggles = $guestForm.querySelectorAll(
      '.button-toggle--unoccupied-waitid-id'
    );

    $buttonToggles.forEach(($buttonToggle, index) => {
      $buttonToggle.setAttribute('waitid-id', unoccupiedWaitidIds[index].id);
      $buttonToggle.innerText = unoccupiedWaitidIds[index].number;
    });
  }

  /* Creates the guestrow in pending list and destroys old one */
  static setWaitingState(
    table,
    guest,
    unoccupiedWaitidIds,
    waitidNumber,
    statesForCurrent,
    statesForHistory,
    stateAssign,
    $tableRow
  ) {
    GuestRow.createGuestRow(
      TablePosition.end(),
      table,
      guest,
      unoccupiedWaitidIds,
      waitidNumber,
      statesForCurrent,
      statesForHistory,
      stateAssign
    );
    this.destroyRow($tableRow);
  }

  /* Creates the guestrow in pending list and destroys old one */
  static setAssignedState(guest, waitidNumber, $tableRow) {
    let $pendingList = document.querySelector('.box__list--pending'),
      $box = GuestBox.createBox(guest, waitidNumber);
    $pendingList.appendChild($box);
    this.destroyRow($tableRow);
  }

  /* Creates the guestrow in history table and destroys old one */
  static setSeatedState(
    table,
    guest,
    unoccupiedWaitidIds,
    waitidNumber,
    statesForCurrent,
    statesForHistory,
    $tableRow
  ) {
    GuestRow.createGuestRow(
      TablePosition.start(),
      table,
      guest,
      unoccupiedWaitidIds,
      waitidNumber,
      statesForCurrent,
      statesForHistory
    );
    this.destroyRow($tableRow);
  }

  /* Creates the guestrow in history table and destroys old one */
  static setGoneState(
    table,
    guest,
    unoccupiedWaitidIds,
    waitidNumber,
    statesForCurrent,
    statesForHistory,
    $tableRow
  ) {
    GuestRow.createGuestRow(
      TablePosition.start(),
      table,
      guest,
      unoccupiedWaitidIds,
      waitidNumber,
      statesForCurrent,
      statesForHistory
    );
    this.destroyRow($tableRow);
  }

  static initGuestWaitid($tableRow, $tableColumn, $modals) {
    let $guestWaitidButton = $tableColumn.querySelector(
        '.button-toggle--waitid-id'
      ),
      $guestWaitidSubmit = $tableColumn.querySelector(
        '.form__submit--waitid-id.form__submit--success'
      );

    $guestWaitidSubmit.addEventListener('click', event => {
      event.preventDefault();
      $tableRow.submit();
    });

    $guestWaitidButton.addEventListener('click', event => {
      event.preventDefault();
      let $thisGuestWaitidPopup = $tableRow.querySelector('.modal--waitid-id');

      $modals.forEach($modal => {
        Modal.hideModal($tableRow, $modal);
      });
      Modal.showModal($tableRow, $thisGuestWaitidPopup);
    });

    let $buttonToggles = $tableColumn.querySelectorAll(
      '.button-toggle--unoccupied-waitid-id'
    );
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
    let $guestGroupSizeButton = $tableColumn.querySelector(
        '.button-toggle--group-size'
      ),
      $guestGroupSizeSubmit = $tableColumn.querySelector(
        '.form__submit--group-size.form__submit--success'
      );

    $guestGroupSizeSubmit.addEventListener('click', event => {
      event.preventDefault();
      $tableRow.submit();
    });

    $guestGroupSizeButton.addEventListener('click', event => {
      event.preventDefault();
      let $thisGuestGroupSizePopup = $tableRow.querySelector(
        '.modal--group-size'
      );

      $modals.forEach($modal => {
        Modal.hideModal($tableRow, $modal);
      });
      Modal.showModal($tableRow, $thisGuestGroupSizePopup);
    });

    let $buttonToggles = $tableColumn.querySelectorAll(
      '.button-toggle--all-group-size'
    );
    $buttonToggles.forEach($buttonToggle => {
      $buttonToggle.addEventListener('click', event => {
        event.preventDefault();
        Guest.setInputGroupSizeValue(
          $tableRow,
          $buttonToggle.dataset.groupSize
        );

        $buttonToggles.forEach($thisButtonToggle => {
          $thisButtonToggle.classList.remove('button-toggle--highlight');
        });
        $buttonToggle.classList.add('button-toggle--highlight');
      });
    });
  }

  static initGuestPreordered($tableRow, $tableColumn) {
    $tableColumn
      .querySelector('.form__radio--preordered.form__radio--off')
      .addEventListener('click', () => {
        Guest.setInputPreorderedValue($tableRow, 0);
        $tableRow.submit();
      });

    $tableColumn
      .querySelector('.form__radio--preordered.form__radio--on')
      .addEventListener('click', () => {
        Guest.setInputPreorderedValue($tableRow, 1);
        $tableRow.submit();
      });
  }

  static initGuestComment($tableRow, $tableColumn, $modals) {
    let $guestCommentButton = $tableColumn.querySelector(
        '.button-toggle--comment'
      ),
      $guestInputComment = $tableColumn.querySelector(
        '.modal__text.modal__text--comment'
      ),
      $guestCommentSubmit = $tableColumn.querySelector(
        '.form__submit--comment.form__submit--success'
      );

    $guestCommentSubmit.addEventListener('click', event => {
      event.preventDefault();
      Guest.setInputCommentValue($tableRow, $guestInputComment.value);
      $tableRow.submit();
    });

    $guestCommentButton.addEventListener('click', () => {
      let $thisGuestCommentPopup = $tableRow.querySelector('.modal--comment');

      $modals.forEach($guestCommentPopup => {
        Modal.hideModal($tableRow, $guestCommentPopup);
      });
      Modal.showModal($tableRow, $thisGuestCommentPopup);
    });
  }

  static initGuestArrivalTime($tableColumn) {
    ArrivalTime.initArrivalTime($tableColumn);
  }

  static initGuestState($tableRow, $tableColumn) {
    $tableColumn
      .querySelectorAll('.button-toggle')
      .forEach($guestStateButton => {
        $guestStateButton.addEventListener('click', () => {
          Guest.setInputStateValue(
            $tableRow,
            $guestStateButton.dataset.stateId
          );
          $tableRow.submit();
        });
      });
    const $buttonToggleDropdown = $tableColumn.querySelector(
      '.button-toggle__dropdown'
    );
    if ($buttonToggleDropdown) {
      $buttonToggleDropdown.addEventListener('click', () => {
        $tableColumn
          .querySelector('.modal__child-list')
          .classList.toggle('modal__child-list--hidden');
      });
    }
  }
}
