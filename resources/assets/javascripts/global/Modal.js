class Modal {
  static initCloseModal($closeModal, $modals, $background) {
    $closeModal.addEventListener('click', event => {
      event.preventDefault();
      $modals.forEach($modal => {
        Modal.hideModal($modal);
      });
      $background.classList.add('background--hidden');
    });
  }

  static showModal($element) {
    let $background = document.querySelector('.background--update');
    $background.classList.remove('background--hidden');
    $element.classList.remove('modal--hidden');
  }

  static hideModal($element) {
    $element.classList.add('modal--hidden');
  }
}
