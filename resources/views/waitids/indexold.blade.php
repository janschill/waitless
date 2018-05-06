@extends ('layouts.master_waitids')
@section('content')
<h1>Wartenummern</h1>
<ul>
    @foreach ($waitids as $waitid)
    <li class="list-item">
        <h3>{{ $waitid->number }}</h3>
        <p>Erstellt am: {{ $waitid->created_at->toFormattedDateString() }}</p>
        @if (count($waitid->guests))
        <h3>Gerade bei folgenden Gruppen in Benutzung:</h3>
        <ul>
            @foreach ($waitid->guests as $guest)
            <li>
                <p>{{ $guest->id }} Gruppengröße: {{ $guest->group_size }}</p>
            </li>
            @endforeach
        </ul>
        @endif

    </li>
    @endforeach
</ul>

@endsection