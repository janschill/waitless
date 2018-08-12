(() => {
  document.addEventListener('DOMContentLoaded', () => {
    let $guestBoxes = document.querySelectorAll('.box--guest');

    $guestBoxes.forEach($guestBox => {
      GuestBox.initGuestBox($guestBox);
    });
  });
})();
