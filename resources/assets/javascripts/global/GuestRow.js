class GuestRow {
  static addClassnames($element, classnames) {
    classnames.forEach(classname => {
      $element.classList.add(classname);
    });
  }

  static createTableColumnButton(dataAttribute, classnames, textNode) {
    let $button = document.createElement('a');
    $button.setAttribute(dataAttribute.name, dataAttribute.value);
    this.addClassnames($button, classnames);
    $button.appendChild(document.createTextNode(textNode));

    return $button;
  }

  static createTableColumnModal(classnames) {
    let $modal = document.createElement('div');
    this.addClassnames($modal, classnames);

    return $modal;
  }

  static createTableColumnModalList(classnames, listItems, dataAttribute) {
    let $modalList = document.createElement('ul');
    this.addClassnames($modalList, classnames);

    listItems.forEach(listItem => {
      let $modalListItem = document.createElement('li');
      $modalListItem.setAttribute(dataAttribute.name, listItem.id);
      $modalListItem.classList.add('modal__list-item');
      $modalListItem.appendChild(document.createTextNode(listItem.number));
      $modalList.appendChild($modalListItem);
    });

    return $modalList;
  }

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
  static createTableColumnWaitidId(classnames, guest, unoccupiedWaitids, waitidNumber) {
    let $tableColumn = document.createElement('div');
    this.addClassnames($tableColumn, classnames);

    let $button = this.createTableColumnButton({
      'name': 'data-guest-waitid-id',
      'value': guest.waitid_id
    }, ['button', 'button--waitid-id'], waitidNumber);
    $tableColumn.appendChild($button);

    let $modal = this.createTableColumnModal(['modal','modal--hidden','modal--waitid-id']);
    $tableColumn.appendChild($modal);

    let $modalList = this.createTableColumnModalList(['modal__list'], unoccupiedWaitids, {'name': 'data-waitid-id'});
    $modal.appendChild($modalList);

    let $modalClose = document.createElement('span');
    $modalClose.classList.add('modal__close');
    $modal.appendChild($modalClose);

    return $tableColumn;
  }

  static createTableColumnGroupSize(classnames, guest, groupSizes) {
    let $tableColumn = document.createElement('div');
    this.addClassnames($tableColumn, classnames);

    let $button = this.createTableColumnButton({
      'name': 'data-guest-group-size',
      'value': guest.group_size
    }, ['button', 'button--group-size'], guest.group_size);
    $tableColumn.appendChild($button);

    let $modal = this.createTableColumnModal(['modal','modal--hidden','modal--group-size']);
    $tableColumn.appendChild($modal);

    let $modalList = this.createTableColumnModalList(['modal__list'], groupSizes, {'name': 'data-group-size'});
    $modal.appendChild($modalList);

    let $modalClose = document.createElement('span');
    $modalClose.classList.add('modal__close');
    $modal.appendChild($modalClose);

    return $tableColumn;
  }

  static createTableColumnPreordered(classnames, guest) {
    let $tableColumn = document.createElement('div');
    this.addClassnames($tableColumn, classnames);

    let $checkbox = document.createElement('input');
    $checkbox.type = 'checkbox';
    $checkbox.classList.add('input');
    $checkbox.classList.add('input--preordered');

    if (guest.preordered === 1) {
      $checkbox.setAttribute('checked', 'checked');
    }

    return $tableColumn;
  }

  static createGuestRow(guest, unoccupiedWaitids, waitidNumber, states) {
    let $tableBody = document.querySelector('.table__body');

    let $guestForm = this.createGuestForm(guest);
    $tableBody.appendChild($guestForm);

    let $inputList = this.createInputList(guest);
    $guestForm.appendChild($inputList);

    let $tableColumnWaitidId = this.createTableColumnWaitidId(['table__column', 'table__column--waitid-id'], guest, unoccupiedWaitids, waitidNumber);
    $guestForm.appendChild($tableColumnWaitidId);

    let $tableColumnGroupSize = this.createTableColumnGroupSize(['table__column', 'table__column--waitid-id'], guest, [1,2,3,4,5,6,7,8,9,10,11]);
    $guestForm.appendChild($tableColumnGroupSize);

    let $tableColumnPreordered = this.createTableColumnPreordered(['table__column', 'table__column--preordered'], guest);
    $guestForm.appendChild($tableColumnPreordered);


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
