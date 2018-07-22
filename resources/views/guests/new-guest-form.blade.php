<h3 class="title title--medium">Gast hinzufügen</h3>
<form method="POST" action="/guests" class="form">
  {{ csrf_field() }}

  <label class="form__label form__label--left">Personenanzahl:</label>
  <div class="form__radio-wrap">
    @for ($i = 1; $i < 5; $i++)
      <input class="form__radio-input" type="radio" name="group_size" id="radio-{{$i}}" value="{{$i}}" {{ $i === 1 ? 'checked' : '' }}>
      <label class="form__radio-label" for="radio-{{$i}}">{{$i}}</label>
    @endfor
      <input class="form__text-input" type="number" name="group_size" min="0" max="20" placeholder="…">
  </div>
  <label class="form__label form__label--left">Kommentar:</label>
  <input class="form__text-input" type="text" name="comment">
  <label class="form__label form__label--left">Vorbestellung:</label>
  <input type="hidden" value="0" name="preordered">
  <input class="form__checkbox-input" type="checkbox" value="1" name="preordered">

  <button class="form__submit" type="submit"></button>
</form>

@include ('layouts.errors')