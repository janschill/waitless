@extends ('layouts.master')

@section('content')
    <h1>Gäste</h1>
    <ul>
        @foreach ($guests as $guest)
        <li>
        <a href="/guests/{{ $guest->id }}" >{{ $guest->comment }}</a>
        </li>
        @endforeach
    </ul>
@endsection
