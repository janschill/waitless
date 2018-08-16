(() => {
  function initLaravelEcho() {
    /**
     * Fired when new guest is created
     */
    window.Echo.channel('guests').listen('GuestCreated', event => {
      GuestRow.createGuestRow(TablePosition.end(), 'active', event.guest, event.unoccupiedWaitids, event.waitidNumber, event.statesForCurrent, event.statesForHistory);
      Notification.showNew(event.guest, event.waitidNumber);
    });

    /**
     * Fired when existing guest is update
     */
    window.Echo.channel('guests').listen('GuestUpdated', event => {
      GuestRow.updateGuestRow(event.guest, event.unoccupiedWaitids, event.waitidNumber, event.statesForCurrent, event.statesForHistory);
      Notification.showUpdate(event.guest, event.waitidNumber);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLaravelEcho();
  });
})();
