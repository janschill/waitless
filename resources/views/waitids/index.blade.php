@extends ('layouts.master') @section('content')
<h2 class="table__caption">Aktiviert</h2>
<ul class="box__list box__list--waitid box__list--waitid-enabled">
    @foreach ($enabledWaitids as $waitid)
        <li data-waitid-number="{{ $waitid->number }}" class="box box--waitid">
            {{-- <h2 class="box__headline box__headline--large">T.10</h2> --}}
            <h3 class="box__headline box__headline--large">#{{ $waitid->number }}</h3>
            <p>Wartemarke</p>
            <div class="box__time">
                <p>Erstellt:</p>
                <p>{{ $waitid->created_at->format('d.m.') }}</p>
            </div>
            <form class="form form--delete-waitid" action="/waitids/{{ $waitid->id }}" method="POST">
                {{ csrf_field() }}
                {{ method_field('DELETE') }}
                <input type="hidden" name="waitid_id" value="{{ $waitid->id }}">
            </form>
        </li>
    @endforeach
</ul>
<div class="background background--create-new background--hidden"></div>
<div data-form-id="form-new-waitid" class="popup popup--new popup--new-waitid">
    <div class="popup__toggle popup__toggle--new">
        <div class="popup__button">neue Wartenmarke hinzufügen</div>
    </div>
    <div class="popup__content">
        @include ('waitids.create')
    </div>
</div>
<h2 class="table__caption">Deaktiviert</h2>
<ul class="box__list box__list--waitid box__list--waitid-disabled">
    @foreach ($disabledWaitids as $waitid)
        <li data-waitid-number="{{ $waitid->number }}" class="box box--waitid">
            {{-- <h2 class="box__headline box__headline--large">T.10</h2> --}}
            <h3 class="box__headline box__headline--large">#{{ $waitid->number }}</h3>
            <p>Wartenmarke</p>
            <div class="box__time">
                <p>Erstellt:</p>
                <p>{{ $waitid->created_at->format('d.m.') }}</p>
            </div>
            <form class="form form--delete-waitid" action="/waitids/{{ $waitid->id }}" method="POST">
                {{ csrf_field() }}
                {{ method_field('DELETE') }}
                <input type="hidden" name="waitid_id" value="{{ $waitid->id }}">
            </form>
        </li>
    @endforeach
</ul>
@endsection
