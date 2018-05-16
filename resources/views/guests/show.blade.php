@extends ('layouts.master')
@section('content')
<h1>Wartenummer: {{ $guest->waitid_id }}</h1>
<p>Status: {{ $guest->state_id }}</p>
<p>Gruppengröße: {{ $guest->group_size }}</p>
<p>Kommentar: {{ $guest->comment }}</p>
@endsection