<div class="table__caption">Zugewiesen <span class="table__caption-sub">Gäste</span></div>
<ul class="box__list box__list--pending">
  @foreach ($assignedGuests as $iterator=>$assignedGuest)
    <li data-guest-id="{{ $assignedGuest->id }}" id="guest-id-{{ $assignedGuest->id }}" class="box box--guest">
      {{-- <h2 class="box__headline box__headline--large">T.10</h2> --}}
      <h3 class="box__headline box__headline--large">#{{ $assignedGuest->waitid->number }}</h3>
      <p>Personen: {{ $assignedGuest->group_size }}</p>
      <div class="box__time">
        <p>A.{{ $assignedGuest->arrival_time->format('H:i') }}</p>
        <p>Z.{{ $assignedGuest->last_state_change->format('H:i') }}</p>
      </div>
      <form class="form form--set-state" action="/guests/{{ $assignedGuest->id }}" method="POST">
        {{ csrf_field() }}
        {{ method_field('PATCH') }}
        <input class="input__guest-id"  type="hidden" name="guest_id" value="{{ $assignedGuest->id }}">
        <input class="input__guest-waitid-id" type="hidden" name="guest_waitid_id" value="{{ $assignedGuest->waitid->id }}">
        <input class="input__guest-group-size" type="hidden" name="guest_group_size" value="{{ $assignedGuest->group_size }}">
        <input class="input__guest-preordered" type="hidden" name="guest_preordered" value="{{ $assignedGuest->preordered }}">
        <input class="input__guest-comment" type="hidden" name="guest_comment" value="{{ $assignedGuest->comment }}">
        <input class="input__guest-state-id" type="hidden" name="guest_state_id" value="{{ $assignedGuest->state_id }}">
      </form>
    </li>
  @endforeach
</ul>
