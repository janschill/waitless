(() => {
  function initLaravelEcho() {
    /**
     * Fired when new guest is created
     */
    window.Echo.channel('guests').listen('GuestCreated', event => {
      GuestRow.createGuestRow(Position.end(), 'active', event.guest, event.unoccupiedWaitids, event.waitidNumber, event.statesForCurrent, event.statesForHistory);
    });

    /**
     * Fired when existing guest is update
     */
    window.Echo.channel('guests').listen('GuestUpdated', event => {
      GuestRow.updateGuestRow(event.guest, event.unoccupiedWaitids, event.waitidNumber, event.statesForCurrent, event.statesForHistory);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLaravelEcho();
  });
})();
