@extends ('layouts.master')
@section('content')
@include('guests.pending')
@include('guests.table')
<div class="background background--create-new background--hidden"></div>
@endsection
