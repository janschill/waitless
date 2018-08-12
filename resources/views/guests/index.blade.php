@extends ('layouts.master')
@section('content')
@include('guests.pending')
@include('guests.table')
<div class="background background--create-new background--hidden"></div>
<div data-form-id="form-new-guest" class="popup popup--new popup--new-guest">
    <div class="popup__toggle popup__toggle--new-guest"></div>
    <div class="popup__content">
        @include ('guests.create')
    </div>
</div>
@endsection
