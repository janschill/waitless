<div class="popup popup--visible popup--edit-guest">
  <div class="pop__toggle"></div>
  <div class="popup__content">
      <h3 class="title title--medium">Gast bearbeiten</h3>
  <form method="PATCH" action="/guests/{{ $guest->id }}" class="form">
        {{ csrf_field() }}
        <label class="form__label form__label--left">Status</label>
        <select class="form__select" name="state">
            @foreach ($states as $state)
            <option class="form__option" value="state[{{ $state->id }}]" {{ $state->state === $guest->state->state ? 'selected=\'selected\'' : '' }}>{{ $state->state }}</option>
            @endforeach
        </select>
        <label class="form__label form__label--left">Personenanzahl:</label>
        <div class="form__radio-wrap">
          @for ($i = 1; $i < 5; $i++)
            <input class="form__radio-input" type="radio" name="group_size" id="radio-{{$i}}" value="{{$i}}" {{ $i === $guest->group_size ? 'checked' : '' }}>
            <label class="form__radio-label" for="radio-{{$i}}">{{$i}}</label>
          @endfor
        </div>
        <label class="form__label form__label--left">Kommentar:</label>
        <input class="form__text-input" type="text" name="comment" placeholder="{{ $guest->comment }}">
        <label class="form__label form__label--left">Vorbestellung:</label>
        <input type="hidden" value="0" name="preordered">
        <input class="form__checkbox-input" type="checkbox" value="1" name="preordered" {{ $guest->preordered ? 'checked' : ''}}>
        <button class="form__submit" type="submit"></button>
      </form>
      @include ('layouts.errors')
  </div>
</div>
