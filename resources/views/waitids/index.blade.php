@extends ('layouts.master') @section('content')

<ul class="box__list">

</ul>

<div class="table">
    <div class="table__caption">Wartemarken <span class="table__caption-sub">Anzahl ({{ count($waitids) }})</span></div>

    <div class="table__head">
        <div class="table__row">
            <div class="table__column">Wartenummer</div>
            <div class="table__column">Entfernen</div>
        </div>
    </div>
    <div class="table__body">
        @foreach ($waitids as $waitid)
        <div class="table__row">
            <div class="table__column">#{{ $waitid->number }}</div>
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