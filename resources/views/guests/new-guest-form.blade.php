<h3 class="title title--medium">Gast hinzufügen</h3>
<form method="POST" action="/guests" class="form">
  {{ csrf_field() }}

  <label class="form__label form__label--left">Personenanzahl:</label>
  <div class="form__radio-wrap">
    @for ($i = 1; $i < 5; $i++)
      <input class="form__radio-input" type="radio" name="group_size" id="radio-{{$i}}" value="{{$i}}" {{ $i === 1 ? 'checked' : '' }}>
      <label class="form__radio-label" for="radio-{{$i}}">{{$i}}</label>
    @endfor
      <input class="form__text-input" type="text" name="group_size" placeholder="…">
  </div>
  <br>
  <label>Kommentar:</label>
  <input type="text" name="comment">
  <br>
  <label>Vorbestellung:</label>
  <input type="hidden" value="0" name="preordered">
  <input type="checkbox" value="1" name="preordered">

  <button class="" type="submit"></button>
</form>

@include ('layouts.errors')