(() => {
  function initPendingList($pendingList) {
    let $pendingGuests = $pendingList.querySelectorAll('.box');

    $pendingGuests.forEach($pendingGuest => {
      $pendingGuest.addEventListener('click', event => {
        event.preventDefault();
        $pendingGuest.querySelector('.form--set-state').submit();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    let $pendingList = document.querySelector('.pending__list');

    initPendingList($pendingList);
  });
})();