(function () {
  var initAnchorChanger = function () {
    var a = document.getElementsByTagName('a');

    a.forEach(function (element) {
      if (!element.onclick && element.getAttribute('target') !== '_blank') {
        element.onclick = function () {
          window.location = this.getAttribute('href');
          return false;
        }
      }
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    initAnchorChanger();
  })
}());