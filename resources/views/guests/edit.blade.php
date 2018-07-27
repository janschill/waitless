<div id="popup-{{ $guest->id }}" class="popup popup--edit-guest">
  <div class="popup__toggle popup__toggle--new-guest popup__toggle--danger popup__toggle--hidden"></div>
  <div class="popup__content">
      <h3 class="title title--medium">Gast bearbeiten</h3>
      <form method="POST" action="/guests/{{ $guest->id }}" class="form">
        {{ csrf_field() }}
        {{ method_field('PATCH') }}
        <input type="hidden" name="guestId" value="{{ $guest->id }}">

        <label class="form__label form__label--left">Status</label>
        <select class="form__select" name="guestState">
            @foreach ($states as $state)
            <option class="form__option" value="{{ $state->id }}" {{ $state->state === $guest->state->state ? 'selected=\'selected\'' : '' }}>{{ $state->state }}</option>
            @endforeach
        </select>

        <label class="form__label form__label--left">Personenanzahl:</label>
        <div class="form__radio-wrap">
          @for ($i = 1; $i < 5; $i++)
            <input class="form__radio-input" type="radio" name="guestGroupSize" id="radio-{{$i}}" value="{{$i}}" {{ $i === $guest->group_size ? 'checked' : '' }}>
            <label class="form__radio-label" for="radio-{{$i}}">{{$i}}</label>
          @endfor
        </div>

        <label class="form__label form__label--left">Kommentar:</label>
        <input class="form__text-input" type="text" name="guestComment" value="{{ $guest->comment }}">

        <label class="form__label form__label--left">Vorbestellung:</label>
        <input type="hidden" value="0" name="guestPreorder">
        <input class="form__checkbox-input" type="checkbox" value="1" name="guestPreorder" {{ $guest->preordered ? 'checked' : ''}}>

        <button class="form__submit" type="submit"></button>
      </form>
      <form id="form-delete-guest" method="POST" action="/guests/{{ $guest->id }}">
        {{ csrf_field() }}
        {{ method_field('DELETE') }}
        <input type="hidden" name="guestId" value="{{ $guest->id }}">
        <button type="submit">Delete</button>
      </form>
      @include ('layouts.errors')
  </div>
</div>
