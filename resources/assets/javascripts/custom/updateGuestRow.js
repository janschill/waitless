(() => {
  document.addEventListener('DOMContentLoaded', () => {
    let $tableBody = document.querySelector('.table__body');

    if ($tableBody) {
      let $tableRows = $tableBody.querySelectorAll('.table__row');
      $tableRows.forEach($tableRow => {
        GuestRow.initGuestRow($tableBody, $tableRow);
      });
    }
  });
})();
