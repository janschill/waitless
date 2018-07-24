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
            <div class="table__column">Bearbeiten</div>
        </div>
    </div>
    <div class="table__body table__body--active">
        @foreach ($guests as $iterator=>$guest)
            <div class="table__row{{ $iterator % 2 === 0 ? ' table__row--highlight' : '' }}">
                <input class="" type="hidden" name="guestId" value="{{ $guest->id }}">
                <div class="table__column">#{{ $guest->waitid->number }}</div>
                <div class="table__column">{{ $guest->group_size }}</div>
                <div class="table__column"><input class="input-preorder" type="checkbox" {{ $guest->preordered ? 'checked' : ''}}></div>
                <div class="table__column">{{ $guest->comment }}</div>
                <div class="table__column">{{ $guest->arrival_time->diffForHumans() }}</div>
                <div class="table__column">
                    @foreach ($states as $state)
                        <a data-state-id="{{ $state->id }}" class="button{{ $state->state === $guest->state->state ? ' button--active' : '' }}" href="/">{{ $state->state }}</a>
                    @endforeach
                </div>
                <div class="table__column">
                    <a data-guest-id="{{ $guest->id }}" class="button button--edit" href="#">Bearbeiten</a>
                </div>
            </div>
        @endforeach
    </div>
    <div class="table__body table__body--history">
        @foreach ($historyGuests as $iterator=>$historyGuest)
            <div class="table__row{{ $iterator % 2 !== 0 ? ' table__row--highlight' : '' }}">
                <input class="" type="hidden" name="guestId" value="{{ $historyGuest->id }}">
                <div class="table__column">#{{ $historyGuest->waitid->number }}</div>
                <div class="table__column">{{ $historyGuest->group_size }}</div>
                <div class="table__column"><input class="input-preorder" type="checkbox" {{ $historyGuest->preordered ? 'checked' : ''}}></div>
                <div class="table__column">{{ $historyGuest->comment }}</div>
                <div class="table__column">{{ $historyGuest->arrival_time->diffForHumans() }}</div>
                <div class="table__column">
                    @foreach ($states as $state)
                        <a data-state-id="{{ $state->id }}" class="button{{ $state->state === $historyGuest->state->state ? ' button--active' : '' }}" href="/">{{ $state->state }}</a>
                    @endforeach
                </div>
                <div class="table__column"><a class="button" href="/">Bearbeiten</a></div>
            </div>
        @endforeach
    </div>
</div>

<div class="popup popup--new-guest">
    <div class="popup__toggle popup__toggle--new-guest"></div>
    <div class="popup__content">
        @include ('guests.new-guest-form')
    </div>
</div>

@endsection