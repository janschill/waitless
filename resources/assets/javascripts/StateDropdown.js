(function () {
  var sendFormData = function (formData, guestId) {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    $.ajax({
      type: 'PATCH',
      url: '/guests/' + guestId,
      data: formData,
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
        console.log('Error:', data);
      }
    });
  };

  var checkCheckboxState = function (checkbox) {
    return checkbox.checked ? 1 : 0;
  };

  var initSelector = function ($guestStateSelector, $guestPreordered, guestId) {
    $guestStateSelector.addEventListener('change', function () {
      var selectorStateOptionId = this.options[this.selectedIndex].value;
      var checkboxPreorderedState = checkCheckboxState($guestPreordered);

      sendFormData({
        guestId: guestId,
        guestPreordered: checkboxPreorderedState,
        guestStateId: selectorStateOptionId
      }, guestId);
    });

    $guestPreordered.addEventListener('change', function () {
      var selectorStateOptionId = $guestStateSelector.options[$guestStateSelector.selectedIndex].value;
      var checkboxPreorderedState = checkCheckboxState($guestPreordered);

      sendFormData({
        guestId: guestId,
        guestPreordered: checkboxPreorderedState,
        guestStateId: selectorStateOptionId
      }, guestId);
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    var $guests = document.querySelectorAll('.guest');

    if ($guests) {
      $guests.forEach(function (guest) {
        var $guestStateSelector = guest.querySelector('.guest__select.guest__select--state'),
          $guestPreordered = guest.querySelector('.input-preorder'),
          $guestIdInput = guest.querySelector('.guest__id');

        initSelector($guestStateSelector, $guestPreordered, $guestIdInput.value);
      });
    }
  });
}());