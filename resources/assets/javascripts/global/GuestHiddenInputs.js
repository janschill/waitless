class GuestHiddenInputs {
  static createHiddenInput(classname, name, value) {
    let $input = document.createElement('input');
    $input.classList.add(classname);
    $input.type = 'hidden';
    $input.name = name;
    $input.value = value;

    return $input;
  }

  static createAllInputs(guest) {
    const classnames = [
      'input__guest-id',
      'input__guest-waitid-id',
      'input__guest-group-size',
      'input__guest-preordered',
      'input__guest-comment',
      'input__guest-state-id'
    ];
    const names = [
      'guest_id',
      'guest_waitid_id',
      'guest_group_size',
      'guest_preordered',
      'guest_comment',
      'guest_state_id'
    ];
    const values = [
      guest.id,
      guest.waitid_id,
      guest.group_size,
      guest.preordered,
      guest.comment,
      guest.state_id
    ];

    let inputs = classnames.map((classname, i) => {
      return this.createHiddenInput(classname, names[i], values[i]);
    });

    return inputs;
  }
}
