(() => {
  function initHeaderRefresh($headerRefresh) {
    $headerRefresh.addEventListener('click', () => {
      location.reload(true);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const $headerRefresh = document.querySelector('.header__refresh');

    if ($headerRefresh) {
      initHeaderRefresh($headerRefresh);
    }
  });
})();
