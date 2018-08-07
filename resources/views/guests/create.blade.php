@if ($errors->has('no_waitid_available'))
  <small class="error">{{ $errors->first('no_waitid_available') }}</small>
@endif

<h3 class="title title--medium">Gast hinzufügen</h3>
<form id="form-new-guest" method="POST" action="/guests" class="form">
  {{ csrf_field() }}

  <div class="form__label">Wartenummer:</div>
  <div class="form__radio-wrap">
    @if ($unoccupiedWaitids < 1)
      <small class="error">Keine Wartenummer verfügbar. <a href="/waitids">Hier können neue Wartenummer hinzugefügt werden.</a></small>
    @endif
    @foreach ($unoccupiedWaitids as $iterator=>$unoccupiedWaitid)
      <input class="form__radio-input" type="radio" name="guest_waitidId" id="radio-{{$unoccupiedWaitid->number}}" value="{{$unoccupiedWaitid->id}}" {{ $iterator === 0 ? 'checked' : '' }}>
      <label class="button-toggle" for="radio-{{$unoccupiedWaitid->number}}">{{$unoccupiedWaitid->number}}</label>
    @endforeach
  </div>

  <div class="form__label">Personanzahl:</div>
  <div class="form__radio-wrap">
    @for ($i = 1; $i < 12; $i++)
      <input class="form__radio-input" type="radio" name="guest_groupSize" id="radio-{{$i}}" value="{{$i}}" {{ $i === 1 ? 'checked' : '' }}>
      <label class="button-toggle" for="radio-{{$i}}">{{$i}}</label>
    @endfor
  </div>

  <label class="form__label">Hinweis:</label>
  <input class="form__text-input" type="text" name="guest_comment">

  <label class="form__label">Offene Rechnung:</label>
  <div class="form__radio-wrap form__radio-wrap--condensed">
    <input class="form__radio-input" type="radio" name="guest_preordered" id="radio-create-preordered-0" value="0" checked>
    <label class="button-toggle" for="radio-create-preordered-0">nein</label>
    <input class="form__radio-input" type="radio" name="guest_preordered" id="radio-create-preordered-1" value="1">
    <label class="button-toggle" for="radio-create-preordered-1">ja</label>
  </div>
  <div class="form__submit-wrap">
    <div class="form__submit form__submit--cancel">abbrechen</div>
    <button class="form__submit form__submit--success" type="submit">hinzufügen</button>
  </div>
</form>

@include ('layouts.errors')
