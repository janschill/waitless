<form id="form-guest-row" method="POST" action="/guests/{{ $guest->id }}" class="table__row table__row--form{{ $iterator % 2 === 0 ? ' table__row--highlight' : '' }}">
    {{ csrf_field() }}
    {{ method_field('PATCH') }}

    <input id="guest-id-hidden" type="hidden" name="guest_id" value="{{ $guest->id }}">
    <input id="guest-waitid-id-hidden" type="hidden" name="guest_waitid_id" value="{{ $guest->id }}">
    <input id="guest-state-id-hidden" type="hidden" name="guest_state_id" value="{{ $guest->id }}">
    <input id="guest-group-size-hidden" type="hidden" name="guest_group_size" value="{{ $guest->id }}">
    <input id="guest-preordered-hidden" type="hidden" name="guest_preordered" value="{{ $guest->id }}">
    <input id="guest-comment-hidden" type="hidden" name="guest_comment" value="{{ $guest->id }}">

    <div class="table__column">
        <a id="guest-waitid" data-guest-waitid-id="{{ $guest->waitid->id }}" class="button" href="#">{{ $guest->waitid->number }}</a>
        <div id="guest-waitid-popup" class="modal modal--hidden">
            <ul class="modal__list">
                @foreach ($unoccupiedWaitids as $unoccupiedWaitid)
                    <li class="modal__list-item">{{ $unoccupiedWaitid->number }}</li>
                @endforeach
            </ul>
        </div>
    </div>
    <div class="table__column"><a id="guest-group-size" data-guest-group-size="{{ $guest->group_size }}" class="button" href="#">{{ $guest->group_size }}</a></div>
    <div class="table__column"><input id="guest-preordered" type="checkbox" class="input input--preorder" {{ $guest->preordered ? 'checked' : ''}}></div>
    <div class="table__column table__column--text"><a id="guest-comment" data-guest-comment="{{ $guest->comment }}" class="button" href="#">{{ $guest->comment }}</a></div>
    <div class="table__column">{{ $guest->arrival_time->diffForHumans() }}</div>
    <div class="table__column">
        @foreach ($states as $state)
            <input id="radio-state-{{ $state->id}}" class="form__radio-input" type="radio" name="guest_state" value="{{ $state->id }}">
            <label for="radio-state-{{ $state->id}}" class="form__radio-label">{{ $state->state }}</label>
        @endforeach
    </div>
</form>