<div class="table__caption">Zugewiesen <span class="table__caption-sub">Gäste</span></div>
<ul class="pending__list">
  @foreach ($assignedGuests as $iterator=>$assignedGuest)
    <li class="box">
      <h2 class="box__headline box__headline--large">T.10</h2>
      <h3 class="box__headline">#{{ $assignedGuest->waitid->number }}</h3>
      <p>Gruppe: {{ $assignedGuest->group_size }}</p>
      <div class="box__time">
        <p>A.{{ $assignedGuest->arrival_time->format('H:i') }}</p>
        <p>Z.{{ $assignedGuest->last_state_change->format('H:i') }}</p>
      </div>
    </li>
  @endforeach
</ul>
