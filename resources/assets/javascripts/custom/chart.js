(() => {
  function workingHours() {
    const hours = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
    return hours;
  }

  function initChart(data, $chart) {
    console.log(data);
    console.log(workingHours());
    //A let backgroundColor = data.map(() => { return 'rgba(255, 99, 132, 0.2)' })
    //A let borderColor = data.map(() => { return 'rgba(255, 99, 132, 1)' })
    let chart = new Chart($chart, {
      type: 'bar',
      data: {
        labels: workingHours(),
        datasets: [{
          label: 'Gäste',
          data: [1,2,3,4,5,6,7,8,9,10,11,12,13],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
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
    console.log(chart);
  }

  function fetchData(url, returnData, $chart) {
    const data = '';
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let responseData = request.responseText;
        returnData(responseData, $chart);
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
