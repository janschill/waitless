(function () {
  function convertDateToUTC (date) {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
  }
  function getDifferenceMilliseconds (time) {
    return convertDateToUTC(new Date()) - convertDateToUTC(time);
  }
  function getDifferenceMinutes (time) {
    return Math.round(((getDifferenceMilliseconds(time) % 86400000) % 3600000) / 60000);
  }
  function getDifferenceHours (time) {
    return Math.floor((getDifferenceMilliseconds(time) % 86400000) / 3600000);
  }
  function getDifferenceDays (time) {
    return Math.floor(getDifferenceMilliseconds(time) / 86400000);
  }
  function addDangerClass ($element) {
    $element.classList.add('table__column--danger-text');
  }

  function updateArrivalTime ($arrivalTimeTableColumn, guestArrivalTimeParsed) {
    let passedTime = {
      'days': getDifferenceDays(guestArrivalTimeParsed),
      'hours': getDifferenceHours(guestArrivalTimeParsed),
      'minutes': getDifferenceMinutes(guestArrivalTimeParsed)
    }

    if (passedTime.days > 0) {
      let dayAppendix = ' Tage'
      if (passedTime.days === 1) { dayAppendix = ' Tag'; }

      addDangerClass($arrivalTimeTableColumn);
      $arrivalTimeTableColumn.innerText = passedTime.days + dayAppendix;
    } else if (passedTime.hours > 0) {
      let hourAppendix = ' Stunden'
      if (passedTime.hours === 1) { hourAppendix = ' Stunde'; }

      addDangerClass($arrivalTimeTableColumn);
      $arrivalTimeTableColumn.innerText = passedTime.hours + hourAppendix;
    } else if (passedTime.minutes > 0) {
      let minuteAppendix = ' Minuten'
      if (passedTime.minutes === 1) { minuteAppendix = ' Minute'; }
      if (passedTime.minutes > 15) { addDangerClass($arrivalTimeTableColumn); }

      $arrivalTimeTableColumn.innerText = passedTime.minutes + minuteAppendix;
    } else if (passedTime.minutes === 0) {
      $arrivalTimeTableColumn.innerText = '<1 Minute';
    }

    setTimeout(() => {
      updateArrivalTime($arrivalTimeTableColumn, guestArrivalTimeParsed);
    }, 60000);
  };

  function initArrivalTime ($arrivalTimeTableColumn) {
    let guestArrivalTime = {
      'year': parseInt($arrivalTimeTableColumn.dataset.year),
      'month': parseInt($arrivalTimeTableColumn.dataset.month),
      'day': parseInt($arrivalTimeTableColumn.dataset.day),
      'hours': parseInt($arrivalTimeTableColumn.dataset.hours),
      'minutes': parseInt($arrivalTimeTableColumn.dataset.minutes),
      'seconds': parseInt($arrivalTimeTableColumn.dataset.seconds)
    };
    let guestArrivalTimeParsed = new Date(guestArrivalTime.year + '/' + guestArrivalTime.month + '/' + guestArrivalTime.day + ' ' + guestArrivalTime.hours + ':' + guestArrivalTime.minutes + ':' + guestArrivalTime.seconds);

    updateArrivalTime($arrivalTimeTableColumn, guestArrivalTimeParsed);
  }

  document.addEventListener('DOMContentLoaded', () => {
    let $arrivalTimeTableColumns = document.querySelectorAll('.table__column--arrival-time');

    $arrivalTimeTableColumns.forEach($arrivalTimeTableColumn => {
      initArrivalTime($arrivalTimeTableColumn);
    });
  });
}());