(function () {
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'b969cc7c562cd5d3f890',
    cluser: 'eu',
    encrypted: true
  });

  window.Echo.channel('guests').listen('GuestUpdated', function(event) {
    console.log('Guest has been updated.');
    console.log(event);
  });
}());
