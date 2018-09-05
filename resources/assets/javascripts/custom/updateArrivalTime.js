(() => {
  document.addEventListener('DOMContentLoaded', () => {
    let $arrivalTimeTableColumns = document.querySelectorAll('.table__column--arrival-time');

    $arrivalTimeTableColumns.forEach($arrivalTimeTableColumn => {
      ArrivalTime.initArrivalTime($arrivalTimeTableColumn);
    });
  });
})();
