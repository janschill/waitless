@extends ('layouts.master')
@section('content')

<h1>Neue Wartnummer hinzufügen</h1>

<form method="POST" action="/waitids">
  {{ csrf_field() }}

  <label>Wartenummer:</label>
  <input type="text" name="number">

  <button type="submit">Hinzufügen</button>
</form>

@include ('layouts.errors')