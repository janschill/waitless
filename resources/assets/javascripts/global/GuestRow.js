class GuestRow {
  static createTableColumnButton(dataAttribute, classnames, textNode) {
    let $button = document.createElement('a');
    $button.href = '#';
    $button.setAttribute(dataAttribute.name, dataAttribute.value);
    Helper.addClassnames($button, classnames);
    $button.appendChild(document.createTextNode(textNode));

    return $button;
  }

  static createTableColumnModal(classnames, title) {
    let $modal = document.createElement('div');
    Helper.addClassnames($modal, classnames);

    return $modal;
  }

  static createModalTitle(title, classnames = ['title', 'title--medium']) {
    let $title = document.createElement('h3');
    Helper.addClassnames($title, classnames);
    $title.appendChild(document.createTextNode(title));

    return $title;
  }

  static createModalChildList(modalListClassnames, buttonToggleStateClassnames, buttonToggleDropdownClassnames, stateAssign) {
    let $modalList = document.createElement('div');
    Helper.addClassnames($modalList, modalListClassnames);

    let $buttonToggle = document.createElement('div');
    Helper.addClassnames($buttonToggle, buttonToggleStateClassnames);
    $buttonToggle.setAttribute('data-state-id', stateAssign.id);
    $buttonToggle.appendChild(document.createTextNode(stateAssign.state));
    $modalList.appendChild($buttonToggle);

    let $buttonToggleDropdown = document.createElement('div');
    Helper.addClassnames($buttonToggleDropdown, buttonToggleDropdownClassnames);
    $modalList.appendChild($buttonToggleDropdown);

    return $modalList;
  }

  static createTableColumnModalList(guest, classnames, listItems, dataAttribute, buttonClassnames) {
    let $modalList = document.createElement('ul');
    Helper.addClassnames($modalList, classnames);

    listItems.forEach(listItem => {
      let $modalListItem = document.createElement('li');
      Helper.addClassnames($modalListItem, buttonClassnames);
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
    Helper.addClassnames($formSubmit, ['form__submit-wrap']);

    let $formClose = document.createElement('div');
    Helper.addClassnames($formClose, ['form__submit', 'form__submit--update', 'form__submit--cancel']);
    $formClose.appendChild(document.createTextNode('abbrechen'));

    let $formSuccess = document.createElement('div');
    Helper.addClassnames($formSuccess, ['form__submit', 'form__submit--success', classname]);
    $formSuccess.appendChild(document.createTextNode('speichern'));
    $formSubmit.appendChild($formClose);
    $formSubmit.appendChild($formSuccess);

    return $formSubmit;
  }

  static createGuestForm(guest) {
    let $guestForm = document.createElement('form');
    $guestForm.method = 'POST';
    $guestForm.action = `/guests/${guest.id}`;
    Helper.addClassnames($guestForm, ['table__row', 'table__row--form']);
    $guestForm.id = `guest-id-${guest.id}`;

    return $guestForm;
  }

  static createInputComment(guest, classnames) {
    let $input = document.createElement('input');
    Helper.addClassnames($input, classnames);
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

  static createInputToken() {
    let $input = document.createElement('input');
    const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    $input.type = 'hidden';
    $input.name = '_token';
    $input.value = CSRF_TOKEN;

    return $input;
  }

  static createInputList(guest) {
    const $inputs = GuestHiddenInputs.createAllInputs(guest);
    let $inputList = document.createElement('div');
    Helper.addClassnames($inputList, ['input__list', 'input__list--guest']);
    $inputs.forEach($input => {
      $inputList.appendChild($input);
    });

    return $inputList;
  }

  static createInputRadio(guest, classnames, name, id, value) {
    let $inputRadio = document.createElement('input');
    Helper.addClassnames($inputRadio, classnames);
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
    Helper.addClassnames($labelRadio, classnames);
    $labelRadio.htmlFor = `${guest.id}-${htmlFor}`;
    $labelRadio.innerText = text;

    return $labelRadio;
  }

  // Add modal eventlistener
  static createTableColumnWaitidId(classnames, guest, unoccupiedWaitids, waitidNumber) {
    let $tableColumn = document.createElement('div');
    Helper.addClassnames($tableColumn, classnames);

    let $button = this.createTableColumnButton({
      'name': 'data-guest-waitid-id',
      'value': guest.waitid_id
    }, ['button-toggle', 'button-toggle--shadow', 'button-toggle--short', 'button-toggle--waitid-id'], waitidNumber);
    $tableColumn.appendChild($button);

    let $modal = this.createTableColumnModal(['modal','modal--hidden','modal--waitid-id'], 'Wartenummer ändern');
    $tableColumn.appendChild($modal);

    let $title = this.createModalTitle('Wartemarke ändern');
    $modal.appendChild($title);

    let $modalList = this.createTableColumnModalList(guest, ['modal__list', 'modal__list--flex', 'modal__list--update', 'modal__list--waitid-ids'], unoccupiedWaitids, {'name': 'data-waitid-id'}, ['button-toggle', 'button-toggle--unoccupied-waitid-id']);
    $modal.appendChild($modalList);

    let $formSubmit = this.createTableColumnFormSubmit('form__submit--waitid-id');
    $modal.appendChild($formSubmit);

    return $tableColumn;
  }

  static createTableColumnGroupSize(classnames, guest, groupSizes) {
    let $tableColumn = document.createElement('div');
    Helper.addClassnames($tableColumn, classnames);

    let $button = this.createTableColumnButton({
      'name': 'data-guest-group-size',
      'value': guest.group_size
    }, ['button-toggle', 'button-toggle--shadow', 'button-toggle--short', 'button-toggle--group-size'], guest.group_size);
    $tableColumn.appendChild($button);

    let $modal = this.createTableColumnModal(['modal','modal--hidden','modal--group-size'], 'Gruppengröße ändern');
    $tableColumn.appendChild($modal);

    let $title = this.createModalTitle('Gruppengröße ändern');
    $modal.appendChild($title);

    let $modalList = this.createTableColumnModalList(guest, ['modal__list', 'modal__list--flex'], groupSizes, {'name': 'data-group-size'}, ['button-toggle', 'button-toggle--all-group-size']);
    $modal.appendChild($modalList);

    let $formSubmit = this.createTableColumnFormSubmit('form__submit--group-size');
    $modal.appendChild($formSubmit);

    return $tableColumn;
  }

  static createTableColumnPreordered(classnames, guest) {
    let $tableColumn = document.createElement('div');
    Helper.addClassnames($tableColumn, classnames);
    let $modalList = document.createElement('div');
    Helper.addClassnames($modalList, ['modal__list']);
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
    Helper.addClassnames($tableColumn, classnames);

    let $button = this.createTableColumnButton({
      'name': 'data-guest-comment',
      'value': 'comment'
    }, ['button-toggle', 'button-toggle--comment', 'button-toggle--shadow'], guest.comment);
    $tableColumn.appendChild($button);

    let $modal = this.createTableColumnModal(['modal','modal--hidden','modal--comment'], 'Hinweis ändern');
    $tableColumn.appendChild($modal);

    let $title = this.createModalTitle('Hinweis ändern');
    $modal.appendChild($title);

    let $input = this.createInputComment(guest, ['modal__text', 'modal__text--comment']);
    $modal.appendChild($input);

    let $formSubmit = this.createTableColumnFormSubmit('form__submit--comment');
    $modal.appendChild($formSubmit);

    return $tableColumn;
  }

  static createTableColumnArrivalTime(classnames, guest) {
    let $tableColumn = document.createElement('div');
    Helper.addClassnames($tableColumn, classnames);

    $tableColumn.appendChild(document.createTextNode('<1 Minute'))

    return $tableColumn;
  }

  static createTableColumnStates(classnames, guest, states, stateAssign) {
    let $tableColumn = document.createElement('div');
    Helper.addClassnames($tableColumn, classnames);
    let $modalList;

    if (stateAssign !== null) {
      $modalList = this.createModalChildList(['modal__list'], ['button-toggle', 'button-toggle--auto-width'], ['button-toggle__dropdown', 'button-toggle__dropdown--state'], stateAssign);
      let $modalChildList = this.createTableColumnModalList(guest, ['modal__child-list', 'modal__child-list--hidden'], states, {'name': 'data-state-id'}, ['button-toggle', 'button-toggle--long', 'button-toggle--no-border']);
      $modalList.appendChild($modalChildList);
      console.log($modalList);
    } else {
      $modalList = this.createTableColumnModalList(guest, ['modal__list'], states, {'name': 'data-state-id'}, ['button-toggle', 'button-toggle--long']);
    }
    $tableColumn.appendChild($modalList);

    return $tableColumn;
  }

  /* initialize GuestRow with eventListeners  */
  static initGuestRow($tableBody, $tableRow) {
    /* initialize Modals */
    let $modals = document.querySelectorAll('.modal'),
      $closeModals = $tableBody.querySelectorAll('.form__submit--update.form__submit--cancel'),
      $background = document.querySelector('.background--update');
    $closeModals.forEach($closeModal => {
      Modal.initCloseModal($closeModal, $modals, $background);
    });

    /* initialize Waitid */
    let $guestWaitid = $tableRow.querySelector('.table__column--waitid-id');
    Guest.initGuestWaitid($tableRow, $guestWaitid, $modals);
    /* initialize GroupSize */
    let $guestGroupSize = $tableRow.querySelector('.table__column--group-size');
    Guest.initGuestGroupSize($tableRow, $guestGroupSize, $modals);
    /* initialize Preordered */
    let $guestPreordered = $tableRow.querySelector('.table__column--preordered');
    Guest.initGuestPreordered($tableRow, $guestPreordered);
    /* initialize Comment */
    let $guestComment = $tableRow.querySelector('.table__column--comment');
    Guest.initGuestComment($tableRow, $guestComment, $modals);
    /* initialize States */
    let $guestStates = $tableRow.querySelectorAll('.table__column--state');
    $guestStates.forEach($guestState => {
      Guest.initGuestState($tableRow, $guestState);
    });

    $tableRow.addEventListener('submit', event => {
      event.preventDefault();
    });
  }

  /* create DOM elements for a new GuestRow  */
  static createGuestRow(position, table, guest, unoccupiedWaitids, waitidNumber, statesForCurrent, statesForHistory, stateAssign) {
    let $tableBody = document.querySelector(`.table__body--${table}`);
    let isTableHistory = position === 'start' ? true : false;

    let $guestForm = this.createGuestForm(guest);
    if (isTableHistory) {
      $tableBody.insertBefore($guestForm, $tableBody.firstChild);
    } else {
      $tableBody.appendChild($guestForm);
    }

    let $inputToken = this.createInputToken();
    $guestForm.appendChild($inputToken);

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

    let $tableColumnStates = this.createTableColumnStates(['table__column', 'table__column--state'], guest, isTableHistory ? statesForHistory : statesForCurrent, isTableHistory ? null : stateAssign);
    $guestForm.appendChild($tableColumnStates);

    this.initGuestRow($tableBody, $guestForm);
  }

  /**
   * Gets called by Pusher event listener (when table was updated)
   */
  static updateGuestRow(guest, unoccupiedWaitids, waitidNumber, statesForCurrent, statesForHistory, stateAssign) {
    let $tableRowForms = document.querySelectorAll('.table__row--form'),
      $guestForm = document.getElementById('guest-id-' + guest.id);

    /**
     * Find out what was updated and call corresponding method to update
     */
    if (guest.waitid_id != Guest.getInputWaitidIdValue($guestForm)) {
      Guest.setInnerText($guestForm, '.button-toggle--waitid-id', waitidNumber);
      Guest.setInputWaitidIdValue($guestForm, guest.waitid_id);

      /* Update all selectable waitidIds of all rows */
      $tableRowForms.forEach($tableRowForm => {
        Guest.setModalList($tableRowForm, unoccupiedWaitids);
      });
    } else if (guest.group_size != Guest.getInputGroupSizeValue($guestForm)) {
      Guest.setInnerText($guestForm, '.button-toggle--group-size', guest.group_size);
      Guest.setInputGroupSizeValue($guestForm, guest.group_size);

      /* Highlight newly selected groupSize button */
      let $modalButtonToggles = $guestForm.querySelectorAll('.button-toggle--all-group-size');
      $modalButtonToggles.forEach($modalButtonToggle => {
        if ($modalButtonToggle.dataset.groupSize == guest.group_size) {
          $modalButtonToggle.classList.add('button-toggle--highlight');
        } else {
          $modalButtonToggle.classList.remove('button-toggle--highlight');
        }
      });
    } else if (guest.preordered != Guest.getInputPreorderedValue($guestForm)) {
      Guest.setInputPreorderedValue($guestForm, guest.preordered);
      Guest.setPreorderedValue($guestForm);
    } else if (guest.comment != Guest.getInputCommentValue($guestForm)) {
      Guest.setInputCommentValue($guestForm, guest.comment);
      Guest.setCommentValue($guestForm, guest.comment);
    } else if (guest.state_id != Guest.getInputStateValue($guestForm)) {
      switch (guest.state_id) {
        case 1:
          Guest.setWaitingState('active', guest, unoccupiedWaitids, waitidNumber, statesForCurrent, statesForHistory, stateAssign, $guestForm);
          break;
        case 2:
          Guest.setAssignedState(guest, waitidNumber, $guestForm);
          break;
        case 3:
          Guest.setSeatedState('history', guest, unoccupiedWaitids, waitidNumber, statesForCurrent, statesForHistory, $guestForm);
          break;
        case 4:
          Guest.setGoneState('history', guest, unoccupiedWaitids, waitidNumber, statesForCurrent, statesForHistory, $guestForm);
          break;
        default:
          //
      }
    }
  }
}
