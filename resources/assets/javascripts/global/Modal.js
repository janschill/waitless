class Modal {
  static initCloseModal($tableRow, $closeModal, $modals, $background) {
    $closeModal.addEventListener('click', event => {
      event.preventDefault();
      $modals.forEach($modal => {
        Modal.hideModal($tableRow, $modal);
      });
      $background.classList.add('background--hidden');
    });
  }

  static showModal($tableRow, $element) {
    let $background = document.querySelector('.background--update');
    $background.classList.remove('background--hidden');
    $element.classList.remove('modal--hidden');
    $tableRow.classList.add('table__row--appear');
  }

  static hideModal($tableRow, $element) {
    $element.classList.add('modal--hidden');
    $tableRow.classList.remove('table__row--appear');
  }
}
