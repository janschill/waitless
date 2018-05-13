@extends ('layouts.master') @section('content')

<h1>Gast bearbeiten</h1>

<form method="PATCH" action="/guests/{{ $guest->id }}">
  {{ csrf_field() }}

  <label>Status:</label>
  <select class="guest__select" name="state">
    @foreach ($states as $state)
    <option class="guest__option" value="state[{{ $state->id }}]" {{ $state->state === $guest->state->state ? 'selected=\'selected\'' : '' }}>{{ $state->state }}</option>
    @endforeach
  </select>

  <label>Personenanzahl:</label>
  <input type="text" name="group_size" placeholder="{{ $guest->group_size }}">

  <label>Kommentar:</label>
  <input type="text" name="comment" placeholder="{{ $guest->comment }}">

  <label>Vorbestellung:</label>
  <input type="hidden" value="0" name="preordered">
  <input type="checkbox" value="1" name="preordered">

  <button type="submit">Bearbeiten</button>
</form>


@include ('layouts.errors')