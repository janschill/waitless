@extends ('layouts.master')

@section('content')

<!-- @if ($errors->has('no_waitid_available'))
    <small class="error">{{ $errors->first('no_waitid_available') }}</small>
@endif -->
<h1>Neuen Gast hinzufügen</h1>

<form method="POST" action="/guests">
  {{ csrf_field() }}

  <label>Personenanzahl:</label>
  <input type="text" name="group_size">

  <label>Kommentar:</label>
  <input type="text" name="comment">

  <label>Vorbestellung:</label>
  <input type="hidden" value="0" name="preordered">
  <input type="checkbox" value="1" name="preordered">

  <button type="submit">Hinzufügen</button>
</form>

@include ('layouts.errors')
