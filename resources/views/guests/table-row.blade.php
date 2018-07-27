<form method="POST" action="/guests/{{ $guest->id }}" class="table__row table__row--form{{ $iterator % 2 === 0 ? ' table__row--highlight' : '' }}">
  {{ csrf_field() }}
  {{ method_field('PATCH') }}
  <input type="hidden" name="guestId" value="{{ $guest->id }}">
  <input type="hidden" name="guestState" class="input input--hidden input--state" value="{{ $guest->state_id }}">
  <input id="input-preorder-hidden" type="hidden" name="guestPreorder" value="{{ $guest->preordered }}" class="input input--hidden input--preorder">
  <input type="hidden" name="guestGroupSize" value="{{ $guest->group_size }}">
  <div class="table__column">#{{ $guest->waitid->number }}</div>
  <div class="table__column">{{ $guest->group_size }}</div>
  <div class="table__column table__column--preorder"><input id="input-preorder" type="checkbox" class="input input--preorder" {{ $guest->preordered ? 'checked' : ''}}></div>
  <div class="table__column table__column--text">{{ $guest->comment }}</div>
  <div class="table__column">{{ $guest->arrival_time->diffForHumans() }}</div>
  <div class="table__column">
      @foreach ($states as $state)
          <a data-guest-state-id="{{ $state->id }}" class="button button--state{{ $state->state === $guest->state->state ? ' button--active' : '' }}" href="#">{{ $state->state }}</a>
      @endforeach
  </div>
</form>