(function () {
  var convertDateToUTC = function(date) {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
  };
  var getDifferenceMilliseconds = function(time) {
    return convertDateToUTC(new Date()) - convertDateToUTC(time);
  };
  var getDifferenceMinutes = function(time) {
    return Math.round(((getDifferenceMilliseconds(time) % 86400000) % 3600000) / 60000);
  };
  var getDifferenceHours = function(time) {
    return Math.floor((getDifferenceMilliseconds(time) % 86400000) / 3600000);
  };
  var getDifferenceDays = function(time) {
    return Math.floor(getDifferenceMilliseconds(time) / 86400000);
  };
  var addDangerClass = function($element) {
    $element.classList.add('table__column--danger-text');
  };

  var updateArrivalTime = function($arrivalTimeTableColumn, guestArrivalTimeParsed) {
    var passedTime = {
      'days': getDifferenceDays(guestArrivalTimeParsed),
      'hours': getDifferenceHours(guestArrivalTimeParsed),
      'minutes': getDifferenceMinutes(guestArrivalTimeParsed)
    };

    if (passedTime.days > 0) {
      var dayAppendix = ' Tage'
      if (passedTime.days === 1) { dayAppendix = ' Tag'; }

      addDangerClass($arrivalTimeTableColumn);
      $arrivalTimeTableColumn.innerText = passedTime.days + dayAppendix;
    } else if (passedTime.hours > 0) {
      var hourAppendix = ' Stunden'
      if (passedTime.hours === 1) { hourAppendix = ' Stunde'; }

      addDangerClass($arrivalTimeTableColumn);
      $arrivalTimeTableColumn.innerText = passedTime.hours + hourAppendix;
    } else if (passedTime.minutes > 0) {
      var minuteAppendix = ' Minuten'
      if (passedTime.minutes === 1) { minuteAppendix = ' Minute'; }
      if (passedTime.minutes > 15) { addDangerClass($arrivalTimeTableColumn); }

      $arrivalTimeTableColumn.innerText = passedTime.minutes + minuteAppendix;
    } else if (passedTime.minutes === 0) {
      $arrivalTimeTableColumn.innerText = '<1 Minute';
    }

    setTimeout(function() {
      updateArrivalTime($arrivalTimeTableColumn, guestArrivalTimeParsed);
    }, 60000);
  };

  var initArrivalTime = function($arrivalTimeTableColumn) {
    var guestArrivalTime = {
      'year': parseInt($arrivalTimeTableColumn.dataset.year),
      'month': parseInt($arrivalTimeTableColumn.dataset.month),
      'day': parseInt($arrivalTimeTableColumn.dataset.day),
      'hours': parseInt($arrivalTimeTableColumn.dataset.hours),
      'minutes': parseInt($arrivalTimeTableColumn.dataset.minutes),
      'seconds': parseInt($arrivalTimeTableColumn.dataset.seconds)
    };
    var guestArrivalTimeParsed = new Date(guestArrivalTime.year + '/' + guestArrivalTime.month + '/' + guestArrivalTime.day + ' ' + guestArrivalTime.hours + ':' + guestArrivalTime.minutes + ':' + guestArrivalTime.seconds);

    updateArrivalTime($arrivalTimeTableColumn, guestArrivalTimeParsed);
  };

  document.addEventListener('DOMContentLoaded', function () {
    var $arrivalTimeTableColumns = document.querySelectorAll('.table__column--arrival-time');

    $arrivalTimeTableColumns.forEach(function ($arrivalTimeTableColumn) {
      initArrivalTime($arrivalTimeTableColumn);
    });
  });
}());