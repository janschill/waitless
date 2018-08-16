(() => {
  function updateTime($time) {
    const date = new Date(),
      hours = date.getHours(),
      minutes = date.getMinutes();
    $time.innerHTML = `${Helper.stringPadding(hours)}:${Helper.stringPadding(minutes)}`;

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
