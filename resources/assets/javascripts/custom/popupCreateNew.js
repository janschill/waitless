(() => {
  function getAllWaitids() {
    const $boxWaitids = document.querySelectorAll('.box.box--waitid');
    const $boxWaitidArray = Array.from($boxWaitids);

    const allWaitids = $boxWaitidArray.map($boxWaitid => {
      return parseInt($boxWaitid.dataset.waitidNumber);
    });
    return allWaitids;
  }

  function checkCorrectValidationFunction($form, formId) {
    switch (formId) {
    case 'form-new-guest':
      return Form.validateNewGuestForm($form);
      break;
    case 'form-new-waitid':
      return Form.validateNewWaitidForm($form, getAllWaitids());
      break;
    default:
      return false;
    }
  }

  function toggleVisibility($popup, $popupToggle, $background) {
    $popup.classList.toggle('popup--visible');
    $popupToggle.classList.toggle('popup__toggle--hidden');
    $background.classList.toggle('background--hidden');
  }

  function initPopup($popup) {
    let $popupToggle = $popup.querySelector('.popup__toggle'),
      $formSubmitCancel = $popup.querySelector('.form__submit--cancel'),
      $background = document.querySelector('.background--create-new'),
      formId = $popup.dataset.formId;
    const $form = document.querySelector(`#${formId}`);

    $form.addEventListener('submit', event => {
      event.preventDefault();

      if (checkCorrectValidationFunction($form, formId)) {
        console.log('submit');
        $form.submit();
      }
    });

    $formSubmitCancel.addEventListener('click', event => {
      event.preventDefault();
      toggleVisibility($popup, $popupToggle, $background);
    });

    $popupToggle.addEventListener('click', event => {
      event.preventDefault();
      toggleVisibility($popup, $popupToggle, $background);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const $popup = document.querySelector('.popup--new');

    if ($popup) {
      initPopup($popup);
    }
  });
})();
