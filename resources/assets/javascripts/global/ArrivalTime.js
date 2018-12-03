class ArrivalTime {
  static convertDateToUTC(date) {
    return Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    );
  }
  static getDifferenceMilliseconds(time) {
    return this.convertDateToUTC(new Date()) - this.convertDateToUTC(time);
  }
  static getDifferenceMinutes(time) {
    return Math.round(
      ((this.getDifferenceMilliseconds(time) % 86400000) % 3600000) / 60000
    );
  }
  static getDifferenceHours(time) {
    return Math.floor(
      (this.getDifferenceMilliseconds(time) % 86400000) / 3600000
    );
  }
  static getDifferenceDays(time) {
    return Math.floor(this.getDifferenceMilliseconds(time) / 86400000);
  }
  static addDangerClass($element) {
    $element.classList.add('table__column--danger-text');
  }

  static updateArrivalTime($arrivalTimeTableColumn, guestArrivalTimeParsed) {
    let passedTime = {
      days: this.getDifferenceDays(guestArrivalTimeParsed),
      hours: this.getDifferenceHours(guestArrivalTimeParsed),
      minutes: this.getDifferenceMinutes(guestArrivalTimeParsed)
    };

    if (passedTime.days > 0) {
      let dayAppendix = ' Tage';
      if (passedTime.days === 1) {
        dayAppendix = ' Tag';
      }

      this.addDangerClass($arrivalTimeTableColumn);
      $arrivalTimeTableColumn.innerText = passedTime.days + dayAppendix;
    } else if (passedTime.hours > 0) {
      let hourAppendix = ' Stunden';
      if (passedTime.hours === 1) {
        hourAppendix = ' Stunde';
      }

      this.addDangerClass($arrivalTimeTableColumn);
      $arrivalTimeTableColumn.innerText = passedTime.hours + hourAppendix;
    } else if (passedTime.minutes > 0) {
      let minuteAppendix = ' Minuten';
      if (passedTime.minutes === 1) {
        minuteAppendix = ' Minute';
      }
      if (passedTime.minutes > 15) {
        this.addDangerClass($arrivalTimeTableColumn);
      }

      $arrivalTimeTableColumn.innerText = passedTime.minutes + minuteAppendix;
    } else if (passedTime.minutes === 0) {
      $arrivalTimeTableColumn.innerText = '<1 Minute';
    }

    setTimeout(() => {
      this.updateArrivalTime($arrivalTimeTableColumn, guestArrivalTimeParsed);
    }, 60000);
  }

  static initArrivalTime($arrivalTimeTableColumn) {
    let guestArrivalTime = {
      year: parseInt($arrivalTimeTableColumn.dataset.year),
      month: parseInt($arrivalTimeTableColumn.dataset.month),
      day: parseInt($arrivalTimeTableColumn.dataset.day),
      hours: parseInt($arrivalTimeTableColumn.dataset.hours),
      minutes: parseInt($arrivalTimeTableColumn.dataset.minutes),
      seconds: parseInt($arrivalTimeTableColumn.dataset.seconds)
    };
    let guestArrivalTimeParsed = new Date(
      guestArrivalTime.year +
        '/' +
        guestArrivalTime.month +
        '/' +
        guestArrivalTime.day +
        ' ' +
        guestArrivalTime.hours +
        ':' +
        guestArrivalTime.minutes +
        ':' +
        guestArrivalTime.seconds
    );

    this.updateArrivalTime($arrivalTimeTableColumn, guestArrivalTimeParsed);
  }
}
