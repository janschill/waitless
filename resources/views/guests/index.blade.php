@extends ('layouts.master')
@section('content')
<div class="table table--current">
    <div class="table__head">
        <div class="table__row">
            <div class="table__column">Nummer</div>
            <div class="table__column">Personen</div>
            <div class="table__column">Bestellt</div>
            <div class="table__column">Hinweis</div>
            <div class="table__column">Wartedauer</div>
            <div class="table__column">Status</div>
        </div>
    </div>
    <div class="table__body table__body--active">
        @foreach ($guests as $iterator=>$guest)
            @include('guests.table-row', ['guest' => $guest])
        @endforeach
    </div>
    <div class="table__body table__body--history">
        @foreach ($historyGuests as $iterator=>$historyGuest)
            @include('guests.table-row', ['guest' => $historyGuest])
        @endforeach
    </div>
</div>
<div class="popup popup--new-guest">
    <div class="popup__toggle popup__toggle--new-guest"></div>
    <div class="popup__content">
        @include ('guests.create')
    </div>
</div>
@endsection