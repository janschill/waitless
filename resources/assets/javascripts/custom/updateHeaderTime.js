(() => {
  function stringPadding(number) {
    return String('00' + number).slice(-2);
  }

  function updateTime($time) {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    $time.innerHTML = `${stringPadding(hours)}:${stringPadding(minutes)}`;

    setTimeout(() => {
      updateTime($time);
    }, 30000);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const $times = document.querySelectorAll('.time');

    $times.forEach(($time) => {
      updateTime($time);
    });
  });
})();
