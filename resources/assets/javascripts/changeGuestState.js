(function () {
  var getNegativeCheckboxState = function ($checkbox) {
    return $checkbox.checked ? 1 : 0;
  };

  var initTableRowForm = function ($tableRowForm) {
    var $inputPreorder = $tableRowForm.querySelector('#input-preorder'),
      $buttonStates = $tableRowForm.querySelectorAll('.button--state');

    $buttonStates.forEach(function($buttonState) {
      $buttonState.addEventListener('click', function(event) {
        event.preventDefault();

        var $hiddenInputState = $tableRowForm.querySelector('.input--hidden.input--state');
        $hiddenInputState.value = this.dataset.guestStateId;
        $tableRowForm.submit();
      });
    });

    $inputPreorder.addEventListener('change', function() {
      var $hiddenInputPreorder = $tableRowForm.querySelector('#input-preorder-hidden');
      console.log($hiddenInputPreorder);
      $hiddenInputPreorder.value = $inputPreorder.checked ? 1 : 0;
      $tableRowForm.submit();
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    var $tableRowForms = document.querySelectorAll('.table__row--form');

    $tableRowForms.forEach(function ($tableRowForm) {
      initTableRowForm($tableRowForm);
    });
  });
}());