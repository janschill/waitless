(function() {
  function initLaravelEcho() {
    window.Echo.channel('guests').listen('GuestUpdated', event => {

      GuestRow.createGuestRow(event.guest, event.unoccupiedWaitids, event.waitidNumber, event.states);
      // A reloadPage();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLaravelEcho();
  });
})();
