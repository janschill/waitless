class GuestBox {
  static setSeatedState($box) {
    let $inputState = $box.querySelector('input[name="guest_state_id"]');
    $inputState.value = 3;
  }

  static initGuestBox($box) {
    $box.addEventListener('click', event => {
      event.preventDefault();
      this.setSeatedState($box);
      $box.querySelector('.form--set-state').submit();
    });
  }

  static createBoxParagraph(guest) {
    let $boxParagraph = document.createElement('p');
    $boxParagraph.appendChild(document.createTextNode(guest.group_size));

    return $boxParagraph;
  }

  static createBoxHeadline(classnames, headline) {
    let $boxHeadline = document.createElement('h3');
    Helper.addClassnames($boxHeadline, classnames);
    $boxHeadline.appendChild(document.createTextNode(headline));

    return $boxHeadline;
  }

  static createBoxTime(classnames, guest) {
    let $boxTime = document.createElement('div');
    Helper.addClassnames($boxTime, classnames);
    let $paragraphArrival = document.createElement('div');
    $paragraphArrival.appendChild(document.createTextNode(guest.arrival_time));
    $boxTime.appendChild($paragraphArrival);
    let $paragraphAssigned = document.createElement('div');
    $paragraphAssigned.appendChild(document.createTextNode(guest.last_state_change));
    $boxTime.appendChild($paragraphAssigned);

    return $boxTime;
  }

  static createInput(type, name, value) {
    let $input = document.createElement('input');
    $input.type = type;
    $input.name = name;
    $input.value = value;

    return $input;
  }

  static createBoxForm(classnames, guest) {
    let $boxForm = document.createElement('form');
    const CSRF_TOKEN = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    Helper.addClassnames($boxForm, classnames);
    $boxForm.action = `/guests/${guest.id}`;
    $boxForm.method = 'POST';
    $boxForm.appendChild(this.createInput('hidden', '_token', CSRF_TOKEN));
    $boxForm.appendChild(this.createInput('hidden', '_method', 'PATCH'));
    const $inputs = GuestHiddenInputs.createAllInputs(guest);
    $inputs.forEach($input => {
      $boxForm.appendChild($input);
    });

    return $boxForm;
  }

  static createBox(guest, waitidNumber) {
    let $box = document.createElement('li');
    $box.setAttribute('data-guest-id', guest.id);
    $box.id = `guest-id-${guest.id}`
    Helper.addClassnames($box, ['box', 'box--guest']);
    let $boxHeadline = this.createBoxHeadline(['box__headline', 'box__headline--large'], `#${waitidNumber}`);
    $box.appendChild($boxHeadline);
    let $paragraph = this.createBoxParagraph(guest);
    $box.appendChild($paragraph);
    let $boxTime = this.createBoxTime(['box__time'], guest);
    $box.appendChild($boxTime);
    let $boxForm = this.createBoxForm(['form', 'form--set-state'], guest);
    $box.appendChild($boxForm);

    this.initGuestBox($box);

    return $box;
  }
}
