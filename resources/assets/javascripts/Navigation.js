(function () {
  var initNavigation = function ($navigation) {
    var $hamburger = document.querySelector('.hamburger');

    $hamburger.addEventListener('click', function () {
      $navigation.classList.toggle('navigation--expanded');
      $hamburger.classList.toggle('hamburger--active');
    });

    document.onkeydown = function (event) {
      event = event || window.event;
      if (event.keyCode === 27) {
        $navigation.classList.remove('navigation--expanded');
        $hamburger.classList.remove('hamburger--active');
      }
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var $navigations = document.querySelectorAll('.navigation');

    $navigations.forEach(function ($navigation) {
      initNavigation($navigation);
    });
  });
}());