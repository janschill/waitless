(function () {
  var retrieveEditForm = function ($buttonEdit) {
    $.ajax({
      type: 'GET',
      url: '/guests/' + $buttonEdit.dataset.guestId + '/edit',
      dataType: 'html',
      success: function (data) {
        $buttonEdit.insertAdjacentHTML('afterend', data);
      },
      error: function (data) {
        console.log('Error:', data);
      }
    });
  };


  var initButtonEdit = function ($buttonEdit) {
    $buttonEdit.addEventListener('click', function (event) {
      event.preventDefault();
      retrieveEditForm($buttonEdit);
    })
  };

  document.addEventListener('DOMContentLoaded', function () {
    var $buttonEdits = document.querySelectorAll('.button--edit');

    $buttonEdits.forEach(function ($buttonEdit) {
      initButtonEdit($buttonEdit);
    });
  });
}());