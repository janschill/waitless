@if ($errors->has('waitid_exists_already'))
  <small class="error">{{ $errors->first('waitid_exists_already') }}</small>
@endif

<h3 class="title title--medium">Wartemarke hinzufügen</h3>
<form id="form-new-waitid" method="POST" action="/waitids" class="form">
  {{ csrf_field() }}

  <label class="form__label" for="waitid-number"></label>
  <input class="form__text-input" type="number" name="waitid_number" id="waitid-number" autofocus>
  <div class="form__submit-wrap">
    <div class="form__submit form__submit--cancel">abbrechen</div>
    <button class="form__submit form__submit--success" type="submit">hinzufügen</button>
  </div>
</form>

@include ('layouts.errors')
