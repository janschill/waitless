(function() {
  function reloadPage() {
    location.reload();
  }

  function initEcho() {
    window.Echo.channel('guests').listen('GuestUpdated', ({ guest }) => {
      console.log('Guest updated');
      console.log(guest);

      reloadPage();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initEcho();
  });
})();
