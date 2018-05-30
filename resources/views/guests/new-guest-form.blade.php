<form method="POST" action="/guests" class="form">
  {{ csrf_field() }}

  <label>Personenanzahl:</label>
  <input type="text" name="group_size">
  <br>
  <label>Kommentar:</label>
  <input type="text" name="comment">
  <br>
  <label>Vorbestellung:</label>
  <input type="hidden" value="0" name="preordered">
  <input type="checkbox" value="1" name="preordered">

  <button type="submit">Hinzufügen</button>
</form>

@include ('layouts.errors')