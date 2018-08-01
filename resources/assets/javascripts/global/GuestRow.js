class GuestRow {
  static createGuestForm(guest) {
    let $guestForm = document.createElement('form');
    $guestForm.method = 'POST';
    $guestForm.action = `/guests/${guest.id}`;
    $guestForm.classList.add('table__row');
    $guestForm.classList.add('table__row--form');

    return $guestForm;
  }

  static createInputList(guest) {
    const $inputs = GuestHiddenInputs.createAllInputs(guest);
    let $inputList = document.createElement('div');
    $inputList.classList.add('input__list');
    $inputList.classList.add('input__list--guest');
    $inputs.forEach($input => {
      $inputList.appendChild($input);
    });

    return $inputList;
  }

  // Add modal eventlistener
  static createTableColumnWaitidId(guest, unoccupiedWaitids, waitidNumber) {
    let $tableColumn = document.createElement('div');
    $tableColumn.classList.add('table__column');
    $tableColumn.classList.add('table__column--waitid-id');

    let $button = document.createElement('a');
    $button.setAttribute('data-guest-waitid-id', guest.waitid_id);
    $button.classList.add('button');
    $button.classList.add('button--waitid-id');
    $button.appendChild(document.createTextNode(waitidNumber));
    $tableColumn.appendChild($button);

    let $modal = document.createElement('div');
    $modal.classList.add('modal');
    $modal.classList.add('modal--hidden');
    $modal.classList.add('modal--waitid-id');
    $tableColumn.appendChild($modal);

    let $modalList = document.createElement('ul');
    $modalList.classList.add('modal__list');
    $modal.appendChild($modalList);

    unoccupiedWaitids.forEach(unoccupiedWaitid => {
      let $modalListItem = document.createElement('li');
      $modalListItem.setAttribute('data-waitid-id', unoccupiedWaitid.id);
      $modalListItem.classList.add('modal__list-item');
      $modalListItem.appendChild(document.createTextNode(unoccupiedWaitid.number));
      $modalList.appendChild($modalListItem);
    });

    let $modalClose = document.createElement('span');
    $modalClose.classList.add('modal__close');
    $modal.appendChild($modalClose);

    return $tableColumn;
  }

  static createGuestRow(guest, unoccupiedWaitids, waitidNumber, states) {
    let $tableBody = document.querySelector('.table__body');

    let $guestForm = this.createGuestForm(guest);
    $tableBody.appendChild($guestForm);

    let $inputList = this.createInputList(guest);
    $guestForm.appendChild($inputList);

    let $tableColumnWaitidId = this.createTableColumnWaitidId(guest, unoccupiedWaitids, waitidNumber);
    $guestForm.appendChild($tableColumnWaitidId);

    // this.initGuestRow($tableBody, $guestRow);
  }

  static initGuestRow($tableBody, $tableRow) {
    let $guestWaitid = $tableRow.querySelector('.table__column--waitid-id'),
      $guestGroupSize = $tableRow.querySelector('.table__column--group-size'),
      $guestPreordered = $tableRow.querySelector('.table__column--preordered'),
      $guestComment = $tableRow.querySelector('.table__column--comment'),
      $guestStates = $tableRow.querySelectorAll('.table__column--state'),
      $modals = document.querySelectorAll('.modal'),
      $closeModals = $tableBody.querySelectorAll('.modal__close');

    $closeModals.forEach($closeModal => {
      Modal.initCloseModal($closeModal, $modals);
    });
    Guest.initGuestWaitid($tableRow, $guestWaitid, $modals);
    Guest.initGuestGroupSize($tableRow, $guestGroupSize, $modals);
    Guest.initGuestPreordered($tableRow, $guestPreordered);
    Guest.initGuestComment($tableRow, $guestComment, $modals);

    $guestStates.forEach($guestState => {
      Guest.initGuestState($tableRow, $guestState);
    });

    $tableRow.addEventListener('submit', event => {
      event.preventDefault();
    });
  }
}
