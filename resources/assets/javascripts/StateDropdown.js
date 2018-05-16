(function () {

  var initPreorder = function ($inputPreorder) {
    $inputPreorder.onclick = function () {
      alert('test');
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var $inputPreorder = document.querySelector('.input-preorder');

    initPreorder($inputPreorder);
  });
}());