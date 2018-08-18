@extends ('layouts.master')
@section('content')
<ul class="statistics-control">
  <li data-url="day" class="button-toggle button-toggle--long">Tag</li>
  <li data-url="month" class="button-toggle button-toggle--long">Monat</li>
  <li data-url="year" class="button-toggle button-toggle--long">Jahr</li>
</ul>
<canvas data-content-url="/statistics/guests/2018" class="chart"></canvas>
@endsection
