(function () {
  document.addEventListener('DOMContentLoaded', () => {
    let $tableBody = document.querySelector('.table__body'),
      $tableRows = $tableBody.querySelectorAll('.table__row');

    $tableRows.forEach($tableRow => {
      GuestRow.initGuestRow($tableBody, $tableRow);
    });
  });
}());
