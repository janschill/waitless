@extends ('layouts.master')

@section('content')

  <h1>Neuen Gast hinzufügen</h1>

  <form method="POST" action="/guests">
    {{ csrf_field() }}

    <label>Personenanzahl:</label>
    <input type="text" name="group_size">

    <label>Kommentar:</label>
    <input type="text" name="comment">

    <label>Vorbestellung:</label>
    <input type="checkbox" name="preordered">

    <button type="submit">Hinzufügen</button>
  </form>

@endsection