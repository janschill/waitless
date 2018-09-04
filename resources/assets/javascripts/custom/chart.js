(() => {
  /* Fill array with color using length of variable length */
  function backgroundColorMappedToData(dataLength) {
    return Array(dataLength).fill('rgba(52, 152, 219, 0.3)');
  }

  function borderColorMappedToData(dataLength) {
    return Array(dataLength).fill('rgba(52, 152, 219, 1)');
  }

  /* DAY **************************** */
  function getRangeForDay() {
    let hours = [];
    for (let i = 12; i < 24; i++) {
      let day = new Date();
      day.setHours(i);
      day.setMinutes(0);
      day.setSeconds(0);
      hours.push(day);
    }
    return hours;
  }

  function getRangeForDayToString() {
    return getRangeForDay().map(hour => `${hour.getHours()}:00` );
  }

  function isEqualHours(guest, hour) {
    return new Date(guest.arrival_time).getHours() === hour.getHours();
  }

  /* MONTH **************************** */
  function getRangeForMonth() {
    const today = new Date();
    return Array.from(new Array(new Date(today.getFullYear(), today.getMonth(), 0).getDate()),(val, i) => new Date(0, 0, ++i));
  }

  function getRangeForMonthToString() {
    const today = new Date();
    return Array.from(new Array(new Date(today.getFullYear(), today.getMonth(), 0).getDate()),(val, i) => ++i);
  }

  function isEqualMonth(guest, month) {
    return new Date(guest.arrival_time).getDate() === month.getDate();
  }

  /* YEAR **************************** */
  function getRangeForYear() {
    let months = [];
    for (let i = 0; i < 12; i++) {
      months.push(new Date(0, i));
    }
    return months;
  }

  function getRangeForYearToString() {
    return ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  }

  function isEqualYear(guest, year) {
    return new Date(guest.arrival_time).getMonth() === year.getMonth();
  }

  /**
   * Map the data onto the charts labels
   *
   * Takes the array with the labels (length of x axis of chart)
   * and then filters through the data looking for time match
   * and returns an array with the counts
  */
  function getMappedToRangeData(timeRange, data) {
    return timeRange.range().map(time => {
      return data.reduce((current, guest) => {
        if (timeRange.equal(guest, time)) {
          current.count++;
        }
        return current;
      }, { count: 0 }).count;
    });
  }

  function updateChart(chart, timeRange, data, label) {
    chart.data.labels = timeRange.label();
    chart.data.datasets.forEach(dataset => {
      dataset.label = label;
      dataset.data = getMappedToRangeData(timeRange, data);
      dataset.backgroundColor = backgroundColorMappedToData(timeRange.label().length);
      dataset.borderColor = borderColorMappedToData(timeRange.label().length);
    });

    chart.update();
  }

  function initChart($chart) {
    return new Chart($chart, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Gäste',
          data: [],
          backgroundColor: [],
          borderColor: []
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
  }

  function fetchData(timeRange, _updateChart, chart) {
    const request = new XMLHttpRequest();
    request.open('GET', timeRange.url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let responseData = request.responseText;
        _updateChart(chart, timeRange, JSON.parse(responseData), 'Gäste');
      } else {
        console.log('Error')
      }
    };
    request.onerror = function() {
      console.log('Server error');
    };
    request.send();
  }

  function determineTimeRange($button, url) {
    const dateTimeNow = new Date(),
      dateTimeYear = dateTimeNow.getFullYear(),
      dateTimeMonth = dateTimeNow.getMonth()+1,
      dateTimeDay = dateTimeNow.getDate();

    switch ($button.dataset.url) {
    case 'day':
      return {
        url: `${url}/${dateTimeYear}/${dateTimeMonth}/${dateTimeDay}/`,
        range: getRangeForDay,
        equal: isEqualHours,
        label: getRangeForDayToString
      };
    case 'month':
      return {
        url: `${url}/${dateTimeYear}/${dateTimeMonth}`,
        range: getRangeForMonth,
        equal: isEqualMonth,
        label: getRangeForMonthToString
      };
    case 'year':
      return {
        url: `${url}/${dateTimeYear}`,
        range: getRangeForYear,
        equal: isEqualYear,
        label: getRangeForYearToString
      };
    default:
      return null;
    }
  }

  function initButton($buttonToggles, $button, chart) {
    $button.addEventListener('click', () => {
      /* Remove highlight and add to clicked */
      $buttonToggles.forEach($button => {
        $button.classList.remove('button-toggle--highlight');
      });
      $button.classList.add('button-toggle--highlight');

      /* Fetch data */
      const TIME_RANGE = determineTimeRange($button, '/statistics/guests');
      fetchData(TIME_RANGE, updateChart, chart);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const $chart = document.querySelector('.chart'),
      $statisticsControl = document.querySelector('.statistics-control');

    if ($statisticsControl) {
      const $buttonToggles = $statisticsControl.querySelectorAll('.button-toggle'),
        chart = initChart($chart);

      $buttonToggles.forEach(($button) => {
        initButton($buttonToggles, $button, chart);
      });
    }
  });
})();
