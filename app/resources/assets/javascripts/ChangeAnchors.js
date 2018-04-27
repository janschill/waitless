(function () {

  var initAnchorChanger = function () {
    var a = document.getElementsByTagName('a');

    for (var i = 0; i < a.length; i++) {
      if (!a[i].onclick && a[i].getAttribute('target') !== '_blank') {
        a[i].onclick = function () {
          window.location = this.getAttribute('href');
          return false;
        }
      }
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Content loaded');
    initAnchorChanger();
  })
}());