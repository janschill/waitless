@extends ('layouts.master')

@section('content')

<div class "list">
    <ul>
        <li>Nummer</li>
        <li>Personen</li>
        <li>Vorbestellung?</li>
        <li>Kommentar</li>
        <li>Wartedauer</li>
        <li>Status</li>
        <li>
            <a href="#" class="guest__toggle-new">Neuen Gast hinzufuegen</a>

            @include ('guests.new-guest-form')
        </li>
    </ul>
    <ul class="guest__list">
        @foreach ($guests as $guest)
        <li class="guest">
            <input class="guest__id" type="hidden" name="guestId" value="{{ $guest->id }}">
            <span>#{{ $guest->waitid->number }}</span>
            <span>{{ $guest->group_size }}</span>
            <span>
                <input class="input-preorder" type="checkbox" {{ $guest->preordered ? 'checked' : ''}}>
            </span>
            <span>{{ $guest->comment }}</span>
            <span>{{ $guest->arrival_time->diffForHumans() }}</span>
            <span>
                <select class="guest__select guest__select--state" name="inputState">
                    @foreach ($states as $state)
                    <option class="guest__option" value="{{ $state->id }}" {{ $state->state === $guest->state->state ? 'selected=\'selected\'' : '' }}>{{ $state->state }}</option>
                    @endforeach
                </select>
            </span>
        </li>
        @endforeach
    </ul>
</div>

@endsection