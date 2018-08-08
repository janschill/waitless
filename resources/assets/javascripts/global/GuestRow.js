class GuestRow {
  static addClassnames($element, classnames) {
    classnames.forEach(classname => {
      $element.classList.add(classname);
    });
  }

  static createTableColumnButton(dataAttribute, classnames, textNode) {
    let $button = document.createElement('a');
    $button.href = '#';
    $button.setAttribute(dataAttribute.name, dataAttribute.value);
    this.addClassnames($button, classnames);
    $button.appendChild(document.createTextNode(textNode));

    return $button;
  }

  static createTableColumnModal(classnames, title) {
    let $modal = document.createElement('div');
    this.addClassnames($modal, classnames);

    return $modal;
  }

  static createModalTitle(title, classnames = ['title', 'title--medium']) {
    let $title = document.createElement('h3');
    this.addClassnames($title, classnames);
    $title.appendChild(document.createTextNode(title));

    return $title;
  }

  static createTableColumnModalList(guest, classnames, listItems, dataAttribute, buttonClassnames) {
    let $modalList = document.createElement('ul');
    this.addClassnames($modalList, classnames);

    listItems.forEach(listItem => {
      let $modalListItem = document.createElement('li');
      this.addClassnames($modalListItem, buttonClassnames);
      if (listItem.state !== undefined) {
        $modalListItem.setAttribute(dataAttribute.name, listItem.id);
        $modalListItem.appendChild(document.createTextNode(listItem.state));
        if (guest.state_id === listItem.id) {
          $modalListItem.classList.add('button-toggle--highlight');
        }
      } else if (listItem.number !== undefined) {
        $modalListItem.setAttribute(dataAttribute.name, listItem.id);
        $modalListItem.appendChild(document.createTextNode(listItem.number));
        if (guest.group_size === listItem.number) {
          $modalListItem.classList.add('button-toggle--highlight');
        }
      } else {
        $modalListItem.setAttribute(dataAttribute.name, listItem);
        $modalListItem.appendChild(document.createTextNode(listItem));
      }
      $modalList.appendChild($modalListItem);
    });

    return $modalList;
  }

  static createTableColumnFormSubmit(classname) {
    let $formSubmit = document.createElement('div');
    this.addClassnames($formSubmit, ['form__submit-wrap']);

    let $formClose = document.createElement('div');
    this.addClassnames($formClose, ['form__submit', 'form__submit--update', 'form__submit--cancel']);
    $formClose.appendChild(document.createTextNode('abbrechen'));

    let $formSuccess = document.createElement('div');
    this.addClassnames($formSuccess, ['form__submit', 'form__submit--success', classname]);
    $formSuccess.appendChild(document.createTextNode('bearbeiten'));
    $formSubmit.appendChild($formClose);
    $formSubmit.appendChild($formSuccess);

    return $formSubmit;
  }

  static createGuestForm(guest) {
    let $guestForm = document.createElement('form');
    $guestForm.method = 'POST';
    $guestForm.action = `/guests/${guest.id}`;
    $guestForm.classList.add('table__row');
    $guestForm.classList.add('table__row--form');

    return $guestForm;
  }

  static createInputComment(guest, classnames) {
    let $input = document.createElement('input');
    this.addClassnames($input, classnames);
    $input.type = 'text';
    $input.value = guest.comment;

    return $input;
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
    this.addClassnames($inputList,['input__list', 'input__list--guest']);
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
    $inputRadio.id = `${guest.id}-${id}`;
    $inputRadio.value = value.toString();

    if (guest.preordered === value) {
      $inputRadio.setAttribute('checked', 'checked');
    }
    return $inputRadio;
  }

  static createLabelRadio(guest, classnames, htmlFor, text) {
    let $labelRadio = document.createElement('label');
    this.addClassnames($labelRadio, classnames);
    $labelRadio.htmlFor = `${guest.id}-${htmlFor}`;
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
    }, ['button-toggle', 'button-toggle--shadow', 'button-toggle--short', 'button-toggle--waitid-id'], waitidNumber);
    $tableColumn.appendChild($button);

    let $modal = this.createTableColumnModal(['modal','modal--hidden','modal--waitid-id'], 'Wartenummer bearbeiten');
    $tableColumn.appendChild($modal);

    let $title = this.createModalTitle('Wartemarke bearbeiten');
    $modal.appendChild($title);

    let $modalList = this.createTableColumnModalList(guest, ['modal__list', 'modal__list--update', 'modal__list--waitid-ids'], unoccupiedWaitids, {'name': 'data-waitid-id'}, ['button-toggle', 'button-toggle--unoccupied-waitid-id']);
    $modal.appendChild($modalList);

    let $formSubmit = this.createTableColumnFormSubmit('form__submit--waitid-id');
    $modal.appendChild($formSubmit);

    return $tableColumn;
  }

  static createTableColumnGroupSize(classnames, guest, groupSizes) {
    let $tableColumn = document.createElement('div');
    this.addClassnames($tableColumn, classnames);

    let $button = this.createTableColumnButton({
      'name': 'data-guest-group-size',
      'value': guest.group_size
    }, ['button-toggle', 'button-toggle--shadow', 'button-toggle--short', 'button-toggle--group-size'], guest.group_size);
    $tableColumn.appendChild($button);

    let $modal = this.createTableColumnModal(['modal','modal--hidden','modal--group-size'], 'Gruppengröße bearbeiten');
    $tableColumn.appendChild($modal);

    let $title = this.createModalTitle('Gruppengröße bearbeiten');
    $modal.appendChild($title);

    let $modalList = this.createTableColumnModalList(guest, ['modal__list'], groupSizes, {'name': 'data-group-size'}, ['button-toggle', 'button-toggle--all-group-size']);
    $modal.appendChild($modalList);

    let $formSubmit = this.createTableColumnFormSubmit('form__submit--group-size');
    $modal.appendChild($formSubmit);

    return $tableColumn;
  }

  static createTableColumnPreordered(classnames, guest) {
    let $tableColumn = document.createElement('div');
    this.addClassnames($tableColumn, classnames);
    let $modalList = document.createElement('div');
    this.addClassnames($modalList, ['modal__list']);
    let $inputRadioOff = this.createInputRadio(guest, ['form__radio-input','form__radio--preordered','form__radio--off'], 'guest_preordered', 'radio-preordered-0', 0);
    $modalList.appendChild($inputRadioOff);
    let $labelRadioOff = this.createLabelRadio(guest, ['button-toggle','button-toggle--short','button-toggle--preordered-off'], 'radio-preordered-0', 'nein');
    $modalList.appendChild($labelRadioOff);
    let $inputRadioOn = this.createInputRadio(guest, ['form__radio-input','form__radio--preordered','form__radio--on'], 'guest_preordered', 'radio-preordered-1', 1);
    $modalList.appendChild($inputRadioOn);
    let $labelRadioOn = this.createLabelRadio(guest, ['button-toggle','button-toggle--short','button-toggle--preordered-on'], 'radio-preordered-1', 'ja');
    $modalList.appendChild($labelRadioOn);
    $tableColumn.appendChild($modalList);

    return $tableColumn;
  }

  static createTableColumnComment(classnames, guest) {
    let $tableColumn = document.createElement('div');
    this.addClassnames($tableColumn, classnames);

    let $button = this.createTableColumnButton({
      'name': 'data-guest-comment',
      'value': 'comment'
    }, ['button-toggle', 'button-toggle--comment', 'button-toggle--shadow'], guest.comment);
    $tableColumn.appendChild($button);

    let $modal = this.createTableColumnModal(['modal','modal--hidden','modal--comment'], 'Hinweis bearbeiten');
    $tableColumn.appendChild($modal);

    let $title = this.createModalTitle('Hinweis bearbeiten');
    $modal.appendChild($title);

    let $input = this.createInputComment(guest, ['modal__text', 'modal__text--comment']);
    $modal.appendChild($input);

    let $formSubmit = this.createTableColumnFormSubmit('form__submit--comment');
    $modal.appendChild($formSubmit);

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

    let $modalList = this.createTableColumnModalList(guest, ['modal__list'], states, {'name': 'data-state-id'}, ['button-toggle', 'button-toggle--long']);
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
      $closeModals = $tableBody.querySelectorAll('.form__submit--update.form__submit--cancel');

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
