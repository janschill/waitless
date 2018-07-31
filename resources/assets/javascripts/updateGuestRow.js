(function () {
  var showModal = function($element) {
    $element.classList.remove('modal--hidden');
  };

  var hideModal = function($element) {
    $element.classList.add('modal--hidden');
  };

  var setWaitidId = function($tableRow, value) {
    var $thisInput = $tableRow.querySelector('.input__guest-waitid-id');
    $thisInput.value = value;
  }

  var setGroupSize = function($tableRow, value) {
    var $thisInput = $tableRow.querySelector('.input__guest-group-size');
    $thisInput.value = value;
  }

  var setPreordered = function($tableRow, value) {
    var $thisInput = $tableRow.querySelector('.input__guest-preordered');
    $thisInput.value = value;
  }

  /**
   *
   * @param {*} $tableRow
   * @param {*} value
   var setComment = function($tableRow, value) {
     var $thisInput = $tableRow.querySelector('.input__guest-comment');
     $thisInput.value = value;
    }
  */

  var setState = function($tableRow, value) {
    var $thisInput = $tableRow.querySelector('.input__guest-state-id');
    $thisInput.value = value;
  }

  var initCloseModal = function($closeModal, $modals) {
    $closeModal.addEventListener('click', function(event) {
      event.preventDefault();
      $modals.forEach(function($modal) {
        hideModal($modal);
      });
    });
  };

  var initGuestWaitid = function($tableRow, $tableColumn, $modals) {
    var $guestWaitidButton = $tableColumn.querySelector('.button--waitid-id')
    $guestWaitidButton.addEventListener('click', function(event) {
      event.preventDefault();
      var $thisGuestWaitidPopup = $tableRow.querySelector('.modal--waitid-id');

      $modals.forEach(function($modal) {
        hideModal($modal);
      });
      showModal($thisGuestWaitidPopup);
    });

    $tableColumn.querySelectorAll('.modal__list-item').forEach(function($modalListItem) {
      $modalListItem.addEventListener('click', function(event) {
        event.preventDefault();
        setWaitidId($tableRow, this.dataset.waitidId);
        $tableRow.submit();
      });
    });
  };

  var initGuestGroupSize = function($tableRow, $tableColumn, $modals) {
    var $guestGroupSizeButton = $tableColumn.querySelector('.button--group-size')
    $guestGroupSizeButton.addEventListener('click', function() {
      var $thisGuestGroupSizePopup = $tableRow.querySelector('.modal--group-size');

      $modals.forEach(function($modal) {
        hideModal($modal);
      });
      showModal($thisGuestGroupSizePopup);
    });

    $tableColumn.querySelectorAll('.modal__list-item').forEach(function($modalListItem) {
      $modalListItem.addEventListener('click', function(event) {
        event.preventDefault();
        setGroupSize($tableRow, this.dataset.groupSize)
        $tableRow.submit();
      });
    });
  };

  var initGuestPreordered = function($tableRow, $tableColumn) {
    $tableColumn.querySelector('.input--preordered').addEventListener('change', function() {
      setPreordered($tableRow, this.checked ? 1 : 0);
      $tableRow.submit();
    });
  };

  var initGuestComment = function($tableRow, $tableColumn, $modals) {
    var $guestCommentButton = $tableColumn.querySelector('.button--comment');
    $guestCommentButton.addEventListener('click', function() {
      var $thisGuestCommentPopup = $tableRow.querySelector('.modal--comment');

      $modals.forEach(function($guestCommentPopup) {
        hideModal($guestCommentPopup);
      });

      showModal($thisGuestCommentPopup);
    });
  };

  var initGuestState = function($tableRow, $tableColumn) {
    $tableColumn.querySelectorAll('.modal__list-item').forEach(function($guestStateButton) {
      $guestStateButton.addEventListener('click', function() {
        setState($tableRow, this.dataset.stateId);
        $tableRow.submit();
      });
    });
  };

  var inittableRow = function ($tableRow, $closeModals, $modals) {
    var $guestWaitid = $tableRow.querySelector('.table__column--waitid-id'),
      $guestGroupSize = $tableRow.querySelector('.table__column--group-size'),
      $guestPreordered = $tableRow.querySelector('.table__column--preordered'),
      $guestComment = $tableRow.querySelector('.table__column--comment'),
      $guestStates = $tableRow.querySelectorAll('.table__column--state');

    $closeModals.forEach(function($closeModal) {
      initCloseModal($closeModal, $modals);
    });
    initGuestWaitid($tableRow, $guestWaitid, $modals);
    initGuestGroupSize($tableRow, $guestGroupSize, $modals);
    initGuestPreordered($tableRow, $guestPreordered);
    initGuestComment($tableRow, $guestComment, $modals);

    $guestStates.forEach(function($guestState) {
      initGuestState($tableRow, $guestState);
    });

    $tableRow.addEventListener('submit', function(event) {
      event.preventDefault();

      console.log('TableRow submit');
    });
  };

  document.addEventListener('DOMContentLoaded', function() {
    var $tableBody = document.querySelector('.table__body'),
      $modals = document.querySelectorAll('.modal'),
      $tableRows = $tableBody.querySelectorAll('.table__row'),
      $closeModals = $tableBody.querySelectorAll('.modal__close');

    $tableRows.forEach(function($tableRow){
      inittableRow($tableRow, $closeModals, $modals);
    });
  });
}());