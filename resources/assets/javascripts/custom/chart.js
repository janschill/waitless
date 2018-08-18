(() => {
  function workingHours() {
    let hours = [];
    for (let i = 12; i < 24; i++) {
      let workingHour = new Date();
      workingHour.setHours(i);
      workingHour.setMinutes(0);
      workingHour.setSeconds(0);
      hours.push(workingHour);
    }
    return hours;
  }

  function getHoursWorkingHours() {
    return workingHours().map(hour => `${hour.getHours()}:00` );
  }

  function dataMappedToWorkingHours(data) {
    return workingHours().map(hour => {
      return data.reduce((current, guest) => {
        if (new Date(guest.arrival_time).getHours() === hour.getHours()) {
          current.count++;
        }
        return current;

      }, { count: 0 }).count;
    });
  }

  function initChart(data, $chart) {
    return new Chart($chart, {
      type: 'bar',
      data: {
        labels: getHoursWorkingHours(),
        datasets: [{
          label: 'Gäste',
          data: dataMappedToWorkingHours(data),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)'
          ],
          borderWidth: 1
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

  function fetchData(url, returnData, $chart) {
    const data = '';
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let responseData = request.responseText;
        returnData(JSON.parse(responseData), $chart);
      } else {
        console.log('Error')
      }
    };

    request.onerror = function() {
      console.log('Server error');
    };

    request.send();

    return data;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const $charts = document.querySelectorAll('.chart');

    $charts.forEach(($chart) => {
      fetchData($chart.dataset.contentUrl, initChart, $chart);
    });
  });
})();
