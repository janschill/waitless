@extends ('layouts.master') @section('content')

<div class="table">
    <div class="table__head">
        <div class="table__row">
            <div class="table__column">Wartenummer</div>
            <div class="table__column">Erstellt am</div>
            <div class="table__column">Zuletzt vergeben an</div>
            <div class="table__column">Vergabeanzahl</div>
            <div class="table__column">Entfernen</div>
        </div>
    </div>
    <div class="table__body">
        @foreach ($waitids as $waitid)
        <div class="table__row">
            <div class="table__column">#{{ $waitid->number }}</div>
            <div class="table__column">{{ $waitid->created_at->toFormattedDateString() }}</div>
            <div class="table__column">Implement me!</div>
            <div class="table__column">{{ $waitid->guests->count() }}</div>
            <div class="table__column">
                <form action="/waitids/{{ $waitid->id }}" method="post">
                    {{ csrf_field() }}
                    {{ method_field('DELETE') }}
                    <button class="button button--delete" type="submit"></button>
                </form>
            </div>
        </div>
        @endforeach
    </div>
</div>

@endsection