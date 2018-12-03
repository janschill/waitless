(() => {
  function initAnchorChanger() {
    let aTags = document.querySelectorAll('a');

    aTags.forEach(aTag => {
      if (!aTag.onclick && aTag.getAttribute('target') !== '_blank') {
        aTag.onclick = () => {
          window.location.href = aTag.getAttribute('href');
          return false;
        };
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initAnchorChanger();
  });
})();
