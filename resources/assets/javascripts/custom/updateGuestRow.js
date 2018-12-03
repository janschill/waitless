(() => {
  document.addEventListener('DOMContentLoaded', () => {
    let $tableBodys = document.querySelectorAll('.table__body');

    $tableBodys.forEach($tableBody => {
      let $tableRows = $tableBody.querySelectorAll('.table__row');
      $tableRows.forEach($tableRow => {
        GuestRow.initGuestRow($tableBody, $tableRow);
      });
    });
  });
})();
