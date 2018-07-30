<form id="form-guest-row" method="POST" action="/guests/{{ $guest->id }}" class="table__row table__row--form{{ $iterator % 2 === 0 ? ' table__row--highlight' : '' }}">
    {{ csrf_field() }}
    {{ method_field('PATCH') }}

    <div class="input__list input__list--guest">
        <input class="input__guest-id" id="guest-id-hidden" type="hidden" name="guest_id" value="{{ $guest->id }}">
        <input class="input__guest-waitid-id" id="guest-waitid-id-hidden" type="hidden" name="guest_waitid_id" value="{{ $guest->waitid->id }}">
        <input class="input__guest-group-size" id="guest-group-size-hidden" type="hidden" name="guest_group_size" value="{{ $guest->group_size }}">
        <input class="input__guest-preordered" id="guest-preordered-hidden" type="hidden" name="guest_preordered" value="{{ $guest->preordered }}">
        <input class="input__guest-comment" id="guest-comment-hidden" type="hidden" name="guest_comment" value="{{ $guest->comment }}">
        <input class="input__guest-state-id" id="guest-state-id-hidden" type="hidden" name="guest_state_id" value="{{ $guest->state->id }}">
    </div>
    <div class="table__column table__column--waitid-id">
        <a data-guest-waitid-id="{{ $guest->waitid->id }}" class="button button--waitid-id" href="#">{{ $guest->waitid->number }}</a>
        <div class="modal modal--hidden modal--waitid-id">
            <ul class="modal__list">
                @foreach ($unoccupiedWaitids as $unoccupiedWaitid)
                    <li data-waitid-id="{{ $unoccupiedWaitid->id }}" class="modal__list-item{{ $guest->waitid->id === $unoccupiedWaitid->id ? ' modal__list-item--highlight' : '' }}">{{ $unoccupiedWaitid->number }}</li>
                @endforeach
            </ul>
            <span class="modal__close"></span>
        </div>
    </div>
    <div class="table__column table__column--group-size">
        <a data-guest-group-size="{{ $guest->group_size }}" class="button button--group-size" href="#">{{ $guest->group_size }}</a>
        <div class="modal modal--hidden modal--group-size">
            <ul class="modal__list">
                @for ($i = 1; $i < 12; $i++)
                    <li data-group-size="{{$i}}" class="modal__list-item{{ $guest->group_size === $i ? ' modal__list-item--highlight' : '' }}">{{$i}}</li>
                @endfor
            </ul>
            <span class="modal__close"></span>
        </div>
    </div>
    <div class="table__column table__column--preordered"><input type="checkbox" class="input input--preordered" {{ $guest->preordered ? 'checked' : ''}}></div>
    <div class="table__column table__column--comment">
        <a data-guest-comment="{{ $guest->comment }}" class="button button--comment" href="#">{{ $guest->comment }}</a>
        <div class="modal modal--hidden modal--comment">
            <div class="">
                <span class="modal__close"></span>
            </div>
            <textarea cols="30" rows="5">{{ $guest->comment }}</textarea>
        </div>
    </div>
    <div class="table__column">{{ $guest->arrival_time->diffForHumans() }}</div>
    <div class="table__column table__column--state">
        <ul class="modal__list">
            @foreach ($states as $state)
                <li data-state-id="{{ $state->id }}" class="modal__list-item{{ $guest->state->id === $state->id ? ' modal__list-item--highlight' : '' }}">{{ $state->state }}</li>
            @endforeach
        </ul>
    </div>
</form>
