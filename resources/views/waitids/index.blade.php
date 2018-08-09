@extends ('layouts.master') @section('content')

<ul class="box__list box__list--waitid">
    @foreach ($waitids as $waitid)
        <li class="box box--waitid">
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
