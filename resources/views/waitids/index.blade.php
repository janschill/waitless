@extends ('layouts.master') @section('content')

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
        <th>
            <form action="/waitids/{{ $waitid->id }}" method="post">
                {{ csrf_field() }}
                {{ method_field('DELETE') }}
                <button type="submit">X</button>
            </form>
        </th>
    </tr>
    @endforeach
</table>

@endsection