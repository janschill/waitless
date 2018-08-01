class GuestRow {
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

  static createGuestRow(guest) {
    let $tableBody = document.querySelector('.table__body');
    let $guestRow = document.createElement('form');
    $guestRow.method = 'POST';
    $guestRow.action = `/guests/${guest.id}`;
    $guestRow.classList.add('table__row');
    $guestRow.classList.add('table__row--form');

    const $inputList = this.createInputList(guest);

    console.log($inputList);

    $guestRow.appendChild($inputList);

    $tableBody.appendChild($guestRow);
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
