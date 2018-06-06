(function () {
  console.log('pusher init');

  var pusher = new Pusher('b969cc7c562cd5d3f890', {
    cluster: 'eu',
    encrypted: false
  });

  console.log(pusher);

  var channel = pusher.subscribe('my-channel');
  channel.bind('my-event', function() {
    console.log('yeah');
  });
});