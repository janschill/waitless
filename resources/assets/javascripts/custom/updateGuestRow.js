(function () {
  function showModal ($element) {
    $element.classList.remove('modal--hidden');
  }

  function hideModal ($element) {
    $element.classList.add('modal--hidden');
  }

  function setWaitidId ($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.input__guest-waitid-id');
    $thisInput.value = value;
  }

  function setGroupSize ($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.input__guest-group-size');
    $thisInput.value = value;
  }

  function setPreordered ($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.input__guest-preordered');
    $thisInput.value = value;
  }

  /**
   * A
   let setComment = function($tableRow, value) {
     let $thisInput = $tableRow.querySelector('.input__guest-comment');
     $thisInput.value = value;
    }
  */

  function setState ($tableRow, value) {
    let $thisInput = $tableRow.querySelector('.input__guest-state-id');
    $thisInput.value = value;
  }

  function initCloseModal ($closeModal, $modals) {
    $closeModal.addEventListener('click', event => {
      event.preventDefault();
      $modals.forEach($modal => {
        hideModal($modal);
      });
    });
  };

  function initGuestWaitid ($tableRow, $tableColumn, $modals) {
    let $guestWaitidButton = $tableColumn.querySelector('.button--waitid-id')
    $guestWaitidButton.addEventListener('click', event => {
      event.preventDefault();
      let $thisGuestWaitidPopup = $tableRow.querySelector('.modal--waitid-id');

      $modals.forEach($modal => {
        hideModal($modal);
      });
      showModal($thisGuestWaitidPopup);
    });

    $tableColumn.querySelectorAll('.modal__list-item').forEach($modalListItem => {
      $modalListItem.addEventListener('click', event => {
        event.preventDefault();
        setWaitidId($tableRow, $modalListItem.dataset.waitidId);
        $tableRow.submit();
      });
    });
  };

  function initGuestGroupSize ($tableRow, $tableColumn, $modals) {
    let $guestGroupSizeButton = $tableColumn.querySelector('.button--group-size')
    $guestGroupSizeButton.addEventListener('click', () => {
      let $thisGuestGroupSizePopup = $tableRow.querySelector('.modal--group-size');

      $modals.forEach($modal => {
        hideModal($modal);
      });
      showModal($thisGuestGroupSizePopup);
    });

    $tableColumn.querySelectorAll('.modal__list-item').forEach($modalListItem => {
      $modalListItem.addEventListener('click', event => {
        event.preventDefault();
        setGroupSize($tableRow, $modalListItem.dataset.groupSize)
        $tableRow.submit();
      });
    });
  };

  function initGuestPreordered ($tableRow, $tableColumn) {
    $tableColumn.querySelector('.input--preordered').addEventListener('change', () => {
      setPreordered($tableRow, $tableColumn.checked ? 1 : 0);
      $tableRow.submit();
    });
  };

  function initGuestComment ($tableRow, $tableColumn, $modals) {
    let $guestCommentButton = $tableColumn.querySelector('.button--comment');
    $guestCommentButton.addEventListener('click', () => {
      let $thisGuestCommentPopup = $tableRow.querySelector('.modal--comment');

      $modals.forEach($guestCommentPopup => {
        hideModal($guestCommentPopup);
      });
      showModal($thisGuestCommentPopup);
    });
  };

  function initGuestState ($tableRow, $tableColumn) {
    $tableColumn.querySelectorAll('.modal__list-item').forEach($guestStateButton => {
      $guestStateButton.addEventListener('click', () => {
        setState($tableRow, $guestStateButton.dataset.stateId);
        $tableRow.submit();
      });
    });
  };

  function initTableRow ($tableRow, $closeModals, $modals) {
    let $guestWaitid = $tableRow.querySelector('.table__column--waitid-id'),
      $guestGroupSize = $tableRow.querySelector('.table__column--group-size'),
      $guestPreordered = $tableRow.querySelector('.table__column--preordered'),
      $guestComment = $tableRow.querySelector('.table__column--comment'),
      $guestStates = $tableRow.querySelectorAll('.table__column--state');

    $closeModals.forEach($closeModal => {
      initCloseModal($closeModal, $modals);
    });
    initGuestWaitid($tableRow, $guestWaitid, $modals);
    initGuestGroupSize($tableRow, $guestGroupSize, $modals);
    initGuestPreordered($tableRow, $guestPreordered);
    initGuestComment($tableRow, $guestComment, $modals);

    $guestStates.forEach($guestState => {
      initGuestState($tableRow, $guestState);
    });

    $tableRow.addEventListener('submit', event => {
      event.preventDefault();

      console.log('TableRow submit');
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    let $tableBody = document.querySelector('.table__body'),
      $modals = document.querySelectorAll('.modal'),
      $tableRows = $tableBody.querySelectorAll('.table__row'),
      $closeModals = $tableBody.querySelectorAll('.modal__close');

    $tableRows.forEach($tableRow => {
      initTableRow($tableRow, $closeModals, $modals);
    });
  });
}());