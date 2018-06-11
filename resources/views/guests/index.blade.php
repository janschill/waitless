@extends ('layouts.master')

@section('content')

<div class "list">
    <ul class="">
        <li>Nummer</li>
        <li>Personen</li>
        <li>Vorbestellung?</li>
        <li>Kommentar</li>
        <li>Wartedauer</li>
        <li>Status</li>
        <li>
            <div class="popup">
                <a href="#" class="form__open-new">+</a>
                <a href="#" class="form__close-new form__close-new--hidden">x</a>

                @include ('guests.new-guest-form')
            </div>
            <div class="overlay">lol
            </div>
        </li>
    </ul>
    <ul class="guest__list guest__list--waiting">
        @foreach ($guests as $guest)
            @if ($guest->state_id == 1  )
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
            @endif
        @endforeach
    </ul>
    <br>
    <h3>History</h3>
    <ul class="guest__list guest__list--placed">
        @foreach ($guests as $guest)
            @if ($guest->state_id != 1  )
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
            @endif
        @endforeach
    </ul>
</div>

@endsection