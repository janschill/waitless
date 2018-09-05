<div class="background background--update background--hidden"></div>
<div class="table table--current">
    <div class="table__head">
        <div class="table__column">Nummer</div>
        <div class="table__column">Personen</div>
        <div class="table__column">o. R.</div>
        <div class="table__column">Hinweis</div>
        <div class="table__column">Wartezeit</div>
        <div class="table__column">Status</div>
    </div>
    <div class="table__caption table__caption--table">Aktuell <span class="table__caption-sub">wartende Gäste ({{ count($guests) }})</span></div>
    <div class="table__body table__body--active">
        @foreach ($guests as $iterator=>$guest)
            @include('guests.table-row', ['currentTable' => true, 'guest' => $guest, 'states' => $statesForCurrent])
        @endforeach
    </div>
</div>
<div data-form-id="form-new-guest" class="popup popup--new popup--new-guest">
    <div class="popup__toggle popup__toggle--new-guest">
        <div class="popup__button">neuen Gast hinzufügen</div>
    </div>
    <div class="popup__content">
        @include ('guests.create')
    </div>
</div>
<div class="table table--history">
    <div class="table__caption table__caption--table">Historie <span class="table__caption-sub">letzten 10 Gäste</span></div>
    <div class="table__body table__body--history">
        @foreach ($historyGuests as $iterator=>$historyGuest)
            @include('guests.table-row', ['guest' => $historyGuest, 'states' => $statesForHistory])
        @endforeach
    </div>
</div>
