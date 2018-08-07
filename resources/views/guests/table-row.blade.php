<form id="guest-id-{{ $guest->id }}" method="POST" action="/guests/{{ $guest->id }}" class="table__row table__row--form">
    {{ csrf_field() }}
    {{ method_field('PATCH') }}

    <div class="input__list input__list--guest">
        <input class="input__guest-id"  type="hidden" name="guest_id" value="{{ $guest->id }}">
        <input class="input__guest-waitid-id" type="hidden" name="guest_waitid_id" value="{{ $guest->waitid->id }}">
        <input class="input__guest-group-size" type="hidden" name="guest_group_size" value="{{ $guest->group_size }}">
        <input class="input__guest-preordered" type="hidden" name="guest_preordered" value="{{ $guest->preordered }}">
        <input class="input__guest-comment" type="hidden" name="guest_comment" value="{{ $guest->comment }}">
        <input class="input__guest-state-id" type="hidden" name="guest_state_id" value="{{ $guest->state->id }}">
    </div>
    <div class="table__column table__column--waitid-id">
        <a data-guest-waitid-id="{{ $guest->waitid->id }}" class="button-toggle button-toggle--shadow button-toggle--short button-toggle--waitid-id" href="#">{{ $guest->waitid->number }}</a>
        <div class="modal modal--hidden modal--waitid-id">
            <h3 class="title title--medium">Wartenummer bearbeiten</h3>
            <ul class="modal__list modal__list--update modal__list--waitid-ids">
                @foreach ($unoccupiedWaitids as $unoccupiedWaitid)
                    <li data-waitid-id="{{ $unoccupiedWaitid->id }}" class="button-toggle button-toggle-unoccupied-waitid-id{{ $guest->waitid->id === $unoccupiedWaitid->id ? ' button-toggle--highlight' : '' }}">{{ $unoccupiedWaitid->number }}</li>
                @endforeach
            </ul>
            <div class="form__submit-wrap">
                <div class="form__submit form__submit--update form__submit--cancel">abbrechen</div>
                <div class="form__submit form__submit--success">bearbeiten</div>
            </div>
        </div>
    </div>
    <div class="table__column table__column--group-size">
        <a data-guest-group-size="{{ $guest->group_size }}" class="button-toggle button-toggle--short button-toggle--shadow button-toggle--group-size" href="#">{{ $guest->group_size }}</a>
        <div class="modal modal--hidden modal--group-size">
            <h3 class="title title--medium">Gruppengröße bearbeiten</h3>
            <ul class="modal__list modal__list--update">
                @for ($i = 1; $i < 12; $i++)
                    <li data-group-size="{{$i}}" class="button-toggle button-toggle--all-group-size{{ $guest->group_size === $i ? ' button-toggle--highlight' : '' }}">{{$i}}</li>
                @endfor
            </ul>
            <div class="form__submit-wrap">
                <div class="form__submit form__submit--update form__submit--cancel">abbrechen</div>
                <div class="form__submit form__submit--success">bearbeiten</div>
            </div>
        </div>
    </div>
    <div class="table__column table__column--preordered">
        <div class="modal__list">
            <input class="form__radio-input form__radio--preordered form__radio--off" type="radio" name="guest_preordered" id="{{ $guest->id }}-radio-preordered-0" value="0"{{ $guest->preordered ? '' : 'checked'}}>
            <label class="button-toggle button-toggle--short button-toggle--preordered-off" for="{{ $guest->id }}-radio-preordered-0">nein</label>
            <input class="form__radio-input form__radio--preordered form__radio--on" type="radio" name="guest_preordered" id="{{ $guest->id }}-radio-preordered-1" value="1"{{ $guest->preordered ? 'checked' : ''}}>
            <label class="button-toggle button-toggle--short button-toggle--preordered-on" for="{{ $guest->id }}-radio-preordered-1">ja</label>
        </div>
    </div>
    <div class="table__column table__column--comment">
        <div data-guest-comment="{{ $guest->comment }}" class="button-toggle button-toggle--shadow button-toggle--comment" href="#">{{ $guest->comment }}</div>
        <div class="modal modal--hidden modal--comment">
            <h3 class="title title--medium">Gruppengröße bearbeiten</h3>
            <input type="text" class="modal__text" value="{{ $guest->comment }}">
            <div class="form__submit-wrap">
                <div class="form__submit form__submit--update form__submit--cancel">abbrechen</div>
                <div class="form__submit form__submit--success">bearbeiten</div>
            </div>
        </div>
    </div>
    <div data-year="{{ $guest->arrival_time->year }}" data-month="{{ $guest->arrival_time->month }}" data-day="{{ $guest->arrival_time->day }}" data-hours="{{ $guest->arrival_time->hour }}" data-minutes="{{ $guest->arrival_time->minute }}" data-seconds="{{ $guest->arrival_time->second }}" class="table__column table__column--arrival-time{{ $guest->arrival_time->diffForHumans() > 15 ? ' table__column--danger-text' : '' }}">{{ $guest->arrival_time->diffForHumans() }}</div>
    <div class="table__column table__column--state">
        <ul class="modal__list">
            @foreach ($states as $state)
                <li data-state-id="{{ $state->id }}" class="button-toggle button-toggle--long{{ $guest->state->id === $state->id ? ' button-toggle--highlight' : '' }}">{{ $state->state }}</li>
            @endforeach
        </ul>
    </div>
    <div class="table__column table__column--settings"><div class="more-actions"></div></div>
</form>
