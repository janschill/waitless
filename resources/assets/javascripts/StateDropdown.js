(function () {
  var initSelectorState = function ($selectorState) {
    $selectorState.addEventListener('change', function () {
      console.log('Dropdown AJAX');
      var formData = {
        state: 'YOLO',
      };

      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });

      $.ajax({
        type: 'PATCH',
        url: '/guests/1',
        data: formData,
        dataType: 'json',
        success: function (data) {
          console.log(data);
        },
        error: function (data) {
          console.log('Error:', data);
        }
      });
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    var $selectorState = document.querySelector('.guest__select.guest__select--state');

    initSelectorState($selectorState);
  });
}());