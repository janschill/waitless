@extends ('layouts.master') @section('content')
<h1>Gäste</h1>
<ul>
    @foreach ($guests as $guest)
    <li>
        <h3>
            <a href="/guests/{{ $guest->id }}">Gast mit der ID: {{ $guest->id }}</a>
        </h3>
        <p>Status: {{ $guest->state_id }}</p>
        <p>Gruppengröße: {{ $guest->group_size }}</p>
        <p>Kommentar: {{ $guest->comment }}</p>
    </li>
    @endforeach
</ul>

<a href="/guests/create">Neuen Gast hinzufügen</a>

@endsection