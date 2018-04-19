@extends ('layouts.master') @section('content')
<h1>Gäste</h1>
<ul>
    @foreach ($guests as $guest)
    <li class="list-item">
        <h3>
            <a href="/guests/{{ $guest->id }}">{{ $guest->waitid->number }}</a>
        </h3>
        <form method="PATCH" action="/guests/{{ $guest->id }}">
            {{ csrf_field() }}
            <select name="inputState">
                @foreach ($states as $state)
                    <option value="state[{{ $state->id }}]" {{  $state->state === $guest->state->state ? 'selected=\'selected\'' : '' }}>{{ $state->state }}</option>
                @endforeach
            </select>
            <button type="submit">Bearbeiten</button>
        </form>

        <form method="PATCH" action="/guests/{{ $guest->id }}">
            {{ csrf_field() }}
            <input type="text" name="inputNumber" placeholder="{{ $guest->group_size }}">
            <button type="submit">Bearbeiten</button>
        </form>

        <p>Gruppengröße: {{ $guest->group_size }}</p>
        <p>Kommentar: {{ $guest->comment }}</p>
        <p>Angekommen um: {{ $guest->arrival_time->toFormattedDateString() }}</p>
        <p>Letzte Statusänderung: {{ $guest->last_state_change->diffForHumans() }}</p>
    </li>
    @endforeach
</ul>

<a href="/guests/create">Neuen Gast hinzufügen</a>

@endsection