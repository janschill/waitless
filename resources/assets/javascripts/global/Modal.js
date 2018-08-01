class Modal {
  static initCloseModal($closeModal, $modals) {
    $closeModal.addEventListener('click', event => {
      event.preventDefault();
      $modals.forEach($modal => {
        Modal.hideModal($modal);
      });
    });
  }

  static showModal($element) {
    $element.classList.remove('modal--hidden');
  }

  static hideModal($element) {
    $element.classList.add('modal--hidden');
  }
}
