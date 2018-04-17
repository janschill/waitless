@extends ('layouts.master') @section('content')
<h1>Wartenummern</h1>
<ul>
    @foreach ($waitids as $waitid)
    <li>
        <p>Id: {{ $waitid->id }}</p>
        <p>Nummer: {{ $waitid->number }}</p>
        <p>Erstellt am: {{ $waitid->created_at->toFormattedDateString() }}</p>
    </li>
    @endforeach
</ul>

<a href="/waitids/create">Neue Wartenummer hinzufügen</a>

@endsection