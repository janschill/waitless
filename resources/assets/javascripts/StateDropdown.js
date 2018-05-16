(function () {
  var initGuests = function ($guests) {
    $guests.forEach(function (guest) {
      var $guestStateSelector = guest.querySelector('.guest__select.guest__select--state'),
        $guestIdInput = guest.querySelector('.guest__id');

      $guestStateSelector.addEventListener('change', function () {
        var selectorStateOptionId = this.options[this.selectedIndex].value;
        var guestId = $guestIdInput.value;

        var guestData = {
          guestId: guestId,
          guestStateId: selectorStateOptionId
        };

        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });

        $.ajax({
          type: 'PATCH',
          url: '/guests/' + guestId,
          data: guestData,
          success: function (data) {
            console.log(data);
          },
          error: function (data) {
            console.log('Error:', data);
          }
        });
      });
    });
  };
  document.addEventListener('DOMContentLoaded', function () {
    var $guests = document.querySelectorAll('.guest');

    initGuests($guests);
  });
}());