<div class="table table--current">
    <div class="table__head table__head--hidden">
        <div class="table__row">
            <div class="table__column">Nummer</div>
            <div class="table__column">Personen</div>
            <div class="table__column">o. R.</div>
            <div class="table__column">Hinweis</div>
            <div class="table__column">Wartezeit</div>
            <div class="table__column">Status</div>
            <div class="table__column"></div>
        </div>
    </div>
    <div class="table__caption table__caption--table">Aktuell <span class="table__caption-sub">wartende Gäste ({{ count($guests) }})</span></div>
    <div class="table__body table__body--active">
        @foreach ($guests as $iterator=>$guest)
            @include('guests.table-row', ['guest' => $guest])
        @endforeach
    </div>
</div>

<div class="table table--history">
    <div class="table__caption table__caption--table">Historie <span class="table__caption-sub">letzten 10 Gäste</span></div>
    <div class="table__head table__head--hidden">
        <div class="table__row">
            <div class="table__column">Nummer</div>
            <div class="table__column">Personen</div>
            <div class="table__column">o. R.</div>
            <div class="table__column">Hinweis</div>
            <div class="table__column">Wartezeit</div>
            <div class="table__column">Status</div>
            <div class="table__column"></div>
        </div>
    </div>
    <div class="table__body table__body--history">
        @foreach ($historyGuests as $iterator=>$historyGuest)
            @include('guests.table-row', ['guest' => $historyGuest])
        @endforeach
    </div>
</div>
