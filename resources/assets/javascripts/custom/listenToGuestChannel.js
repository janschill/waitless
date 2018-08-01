(function() {
  function initLaravelEcho() {
    window.Echo.channel('guests').listen('GuestUpdated', ({ guest }) => {

      GuestRow.createGuestRow(guest);
      // A reloadPage();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLaravelEcho();
  });
})();
