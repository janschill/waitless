(function () {
  var toggleClass = function ($element, className) {
    if ($element.classList.contains(className)) {
      $element.classList.remove(className);
    } else {
      $element.classList.add(className);
    }
  };

  var initNewGuest = function ($popup) {
    var $formNewOpen = $popup.querySelector('.form__open-new'),
      $form = $popup.querySelector('.form');

    $formNewOpen.onclick = function (e) {
      e.preventDefault();

      toggleClass($popup, 'popup--expanded');
      toggleClass($form, 'form--expanded');
      toggleClass($formNewOpen, 'form__open-new--expanded');
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM new guest');
    var $popup = document.querySelector('.popup');

    if ($popup) {
      initNewGuest($popup);
    }
  });
}());