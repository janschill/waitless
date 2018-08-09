(() => {
  function initWaitidBoxes($waitidBox) {
    let $waitidBoxForm = $waitidBox.querySelector('.form--delete-waitid');

    if ($waitidBoxForm) {
      $waitidBoxForm.addEventListener('submit', event => {
        event.preventDefault();

        return confirm(`Möchtest du wirklich die Wartemarke (${$waitidBox.dataset.waitIdNumber}) löschen?`);
      });

      $waitidBox.addEventListener('click', event => {
        event.preventDefault();
        $waitidBoxForm.submit();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const $waitidBoxes = document.querySelectorAll('.box--waitid');

    $waitidBoxes.forEach($waitidBox => {
      initWaitidBoxes($waitidBox);
    });
  });
})();
