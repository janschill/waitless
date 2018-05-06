@extends ('layouts.master_guests') @section('content')

<ul class="waiting-list">
    @foreach ($guests as $guest)
    <li class="waiting-list__item">
        <div class="guest">
            <h3 class="guest__title">#{{ $guest->waitid->number }}</h3>
            <span class="guest__group-size">{{ $guest->group_size }}</span>
            <span class="guest__preordered">Vorbestellt: {{ $guest->preordered }}</span>
            <span class="guest__comment">Kommentar: {{ $guest->comment }}</span>
            <span class="guest__arrival-time">{{ $guest->arrival_time->diffForHumans() }}</span>
            <select class="guest__select" name="inputState">
                @foreach ($states as $state)
                <option class="guest__option" value="state[{{ $state->id }}]" {{ $state->state === $guest->state->state ? 'selected=\'selected\'' : '' }}>{{ $state->state }}</option>
                @endforeach
            </select>
        </div>
    </li>
    @endforeach
</ul>

@endsection