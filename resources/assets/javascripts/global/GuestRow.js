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
      $modalListItem.classList.add('button-toggle');
      if (listItem.state !== undefined) {
        $modalListItem.setAttribute(dataAttribute.name, listItem.id);
        $modalListItem.appendChild(document.createTextNode(listItem.state));
      } else if (listItem.number !== undefined) {
        $modalListItem.setAttribute(dataAttribute.name, listItem.id);
        $modalListItem.appendChild(document.createTextNode(listItem.number));
      } else {
        $modalListItem.setAttribute(dataAttribute.name, listItem);
        $modalListItem.appendChild(document.createTextNode(listItem));
      }
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

  static createInputMethod() {
    let $input = document.createElement('input');
    $input.type = 'hidden';
    $input.name = '_method';
    $input.value = 'PATCH';

    return $input;
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

  static createInputRadio(guest, classnames, name, id, value) {
    let $inputRadio = document.createElement('input');
    this.addClassnames($inputRadio, classnames);
    $inputRadio.setAttribute('type', 'radio');
    $inputRadio.setAttribute('name', name);
    $inputRadio.id = id;
    $inputRadio.value = value.toString();

    if (guest.preordered === value) {
      $inputRadio.setAttribute('checked', 'checked');
    }
    return $inputRadio;
  }

  static createLabelRadio(classnames, htmlFor, text) {
    let $labelRadio = document.createElement('label');
    this.addClassnames($labelRadio, classnames);
    $labelRadio.htmlFor = htmlFor;
    $labelRadio.innerText = text;

    return $labelRadio;
  }

  // Add modal eventlistener
  static createTableColumnWaitidId(classnames, guest, unoccupiedWaitids, waitidNumber) {
    let $tableColumn = document.createElement('div');
    this.addClassnames($tableColumn, classnames);

    let $button = this.createTableColumnButton({
      'name': 'data-guest-waitid-id',
      'value': guest.waitid_id
    }, ['button', 'button-toggle--waitid-id'], waitidNumber);
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
    }, ['button', 'button-toggle--group-size'], guest.group_size);
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

    let $modalList = document.createElement('div');
    this.addClassnames($modalList, 'modal__list');
    $tableColumn.appendChild($modalList);

    let $labelRadioOn = this.createLabelRadio(['button-toggle','button-toggle--short','button-toggle--preordered-on'], 'radio-preordered-1', 'ja');
    $modalList.appendChild($labelRadioOn);
    let $inputRadioOn = this.createInputRadio(guest, ['form__radio-input','form__radio--preordered','form__radio--on'], 'guest_preordered', 'radio-preordered-1', 1);
    $modalList.appendChild($inputRadioOn);
    let $labelRadioOff = this.createLabelRadio(['button-toggle','button-toggle--short','button-toggle--preordered-off'], 'radio-preordered-0', 'nein');
    $modalList.appendChild($labelRadioOff);
    let $inputRadioOff = this.createInputRadio(guest, ['form__radio-input','form__radio--preordered','form__radio--off'], 'guest_preordered', 'radio-preordered-0', 0);
    $modalList.appendChild($inputRadioOff);

    return $tableColumn;
  }

  static createTableColumnComment(classnames, guest) {
    let $tableColumn = document.createElement('div');
    this.addClassnames($tableColumn, classnames);

    let $button = this.createTableColumnButton({
      'name': 'data-guest-comment',
      'value': 'comment'
    }, ['button', 'button-toggle--comment'], guest.comment);
    $tableColumn.appendChild($button);

    return $tableColumn;
  }

  static createTableColumnArrivalTime(classnames, guest) {
    let $tableColumn = document.createElement('div');
    this.addClassnames($tableColumn, classnames);

    $tableColumn.appendChild(document.createTextNode('<1 Minute +'))
    // If table__column--danger-text

    return $tableColumn;
  }

  static createTableColumnStates(classnames, guest, states) {
    let $tableColumn = document.createElement('div');
    this.addClassnames($tableColumn, classnames);

    let $modalList = this.createTableColumnModalList(['modal__list'], states, {'name': 'data-state-id'});
    $tableColumn.appendChild($modalList);

    // If table__column--danger-text

    return $tableColumn;
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

  static createGuestRow(guest, unoccupiedWaitids, waitidNumber, states) {
    let $tableBody = document.querySelector('.table__body');

    let $guestForm = this.createGuestForm(guest);
    $tableBody.appendChild($guestForm);

    let $inputMethod = this.createInputMethod();
    $guestForm.appendChild($inputMethod);

    let $inputList = this.createInputList(guest);
    $guestForm.appendChild($inputList);

    let $tableColumnWaitidId = this.createTableColumnWaitidId(['table__column', 'table__column--waitid-id'], guest, unoccupiedWaitids, waitidNumber);
    $guestForm.appendChild($tableColumnWaitidId);

    let $tableColumnGroupSize = this.createTableColumnGroupSize(['table__column', 'table__column--group-size'], guest, [1,2,3,4,5,6,7,8,9,10,11]);
    $guestForm.appendChild($tableColumnGroupSize);

    let $tableColumnPreordered = this.createTableColumnPreordered(['table__column', 'table__column--preordered'], guest);
    $guestForm.appendChild($tableColumnPreordered);

    let $tableColumnComment = this.createTableColumnComment(['table__column', 'table__column--comment'], guest);
    $guestForm.appendChild($tableColumnComment);

    let $tableColumnArrivalTime = this.createTableColumnArrivalTime(['table__column', 'table__column--arrival-time'], guest);
    $guestForm.appendChild($tableColumnArrivalTime);

    let $tableColumnStates = this.createTableColumnStates(['table__column', 'table__column--state'], guest, states);
    $guestForm.appendChild($tableColumnStates);

    this.initGuestRow($tableBody, $guestForm);
  }

  static updateGuestRow(guest, unoccupiedWaitids, waitidNumber, states) {
    let $guestForm = document.getElementById('guest-id-' + guest.id);

      if (guest.waitid_id !== Guest.getInputWaitidIdValue($guestForm)) {
        Guest.setWaitidIdValue($guestForm, waitidNumber);
        Guest.setInputWaitidIdValue($guestForm, guest.waitid_id);
        console.log('here we need to update waitids');
      } else if (guest.group_size !== Guest.getInputGroupSizeValue($guestForm)) {
        Guest.setInputGroupSizeValue($guestForm, guest.group_size);
        console.log('here we need to update group sizes not really');
      } else if (guest.preordered !== Guest.getInputPreorderedValue($guestForm)) {
        Guest.setInputPreorderedValue($guestForm, guest.preordered);
        console.log('here we need to update preordered');
      } else if (guest.comment !== Guest.getInputCommentValue($guestForm)) {
        Guest.setInputCommentValue($guestForm, guest.comment);
        console.log('here we need to update preordered');
      } else if (guest.state !== Guest.getInputStateValue($guestForm)) {
        Guest.setInputStateValue($guestForm, guest.state);
        console.log('here we need to update guest form');
      }
  }
}
