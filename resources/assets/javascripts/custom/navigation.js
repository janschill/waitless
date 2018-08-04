(() => {
  function initNavigation ($navigation) {
    let $hamburger = document.querySelector('.hamburger');

    $hamburger.addEventListener('click', () => {
      $navigation.classList.toggle('navigation--expanded');
      $hamburger.classList.toggle('hamburger--active');
    });

    document.onkeydown = event => {
      event = event || window.event;
      if (event.keyCode === 27) {
        $navigation.classList.remove('navigation--expanded');
        $hamburger.classList.remove('hamburger--active');
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    let $navigations = document.querySelectorAll('.navigation');

    $navigations.forEach($navigation => {
      initNavigation($navigation);
    });
  });
})();