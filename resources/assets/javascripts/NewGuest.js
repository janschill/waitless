(function () {
  var initNewGuest = function ($newGuestLink, $newGuestForm) {
    var newGuestFormExpanded = "guest__form--expanded";

    $newGuestLink.onclick = function (e) {
      e.preventDefault();

      if ($newGuestForm.classList.contains(newGuestFormExpanded)) {
        $newGuestForm.classList.remove(newGuestFormExpanded);
      } else {
        $newGuestForm.classList.add(newGuestFormExpanded);
      }
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM new guest');
    var $newGuestLink = document.querySelector('.guest__toggle-new');
    var $newGuestForm = document.querySelector('.guest__form');

    initNewGuest($newGuestLink, $newGuestForm);
  });
}());