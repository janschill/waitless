window._ = require('lodash');
window.Popper = require('popper.js').default;
import Echo from 'laravel-echo'
window.Pusher = require('pusher-js');
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '114acbe8c014f66e32ae',
  cluster: 'eu',
  encrypted: true
});
