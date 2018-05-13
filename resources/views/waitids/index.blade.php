@extends ('layouts.master_waitids') @section('content')

<table class "list">
    <tr>
        <th>Wartenummer</th>
        <th>Erstellt am</th>
        <th>Zuletzt vergeben an</th>
        <th>Vergabeanzahl</th>
        <th></th>
    </tr>
    @foreach ($waitids as $waitid)
    <tr>
        <th>#{{ $waitid->number }}</th>
        <th>{{ $waitid->created_at->toFormattedDateString() }}</th>
        <th>Implement me!</th>
        <th>{{ $waitid->guests->count() }}</th>
        <th>X</th>
    </tr>
    @endforeach
</table>

@endsection