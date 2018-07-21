(function () {
  var initAnchorChanger = function () {
    var aTags = document.querySelectorAll('a');

    aTags.forEach(function (aTag) {
      if (!aTag.onclick && aTag.getAttribute('target') !== '_blank') {
        aTag.onclick = function () {
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