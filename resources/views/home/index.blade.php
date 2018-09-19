@extends ('layouts.master')
@section('content')
<aside class="aside">
  <ul class="aside__list">
    <li class="aside__list-item">Version: <span>{{ $version }}</span></li>
  </ul>
</aside>
<main class="main">
  <section class="section section--smaller-head">
    <article class="article">
      <h1 class="title title--primary">waitless</h1>
      <p class="paragraph">waitless ist eine Wartesystem, das der Gastronomie bei der Verwaltung von wartenden Gästen helfen soll.</p>
    </article>
  </section>
  <aside class="aside">
    <ul class="aside__list">
      <li class="aside__list-item">Features</li>
    </ul>
  </aside>
  <section class="section section--smaller-head">
    <article class="article">
      <p class="paragraph">
        <ul class="article__list">
          <li class="article__list-item">Anlegen von Gruppen (Gäste)</li>
          <li class="article__list-item">Anlegen von Wartemarken</li>
          <li class="article__list-item">Ansicht der aktuell wartenden, zugewiesenden und platzierten Gästen</li>
          <li class="article__list-item">Balkendiagramm der Anzahl an Gästen am Tag/Monat/Jahr</li>
        </ul>
      </p>
    </article>
  </section>
  <aside class="aside">
    <ul class="aside__list">
      <li class="aside__list-item">Hilfe oder Feedback</li>
    </ul>
  </aside>
  <section class="section section--smaller-head">
    <article class="article">
      <p class="paragraph">
        <address class="address">
          <div class="address__column">
            <div class="address__row"><span class="address__icon">@include('partials.person')</span>Jan Schill</div>
            <div class="address__row"><span class="address__icon">@include('partials.mail')</span>janschill@me.com</div>
            <div class="address__row"><span class="address__icon">@include('partials.phone')</span>0157 73496969</div>
          </div>
          <div class="address__column">
            <div class="address__row"><span class="address__icon">@include('partials.person')</span>Stephan Richert</div>
            <div class="address__row"><span class="address__icon">@include('partials.mail')</span>stephan.richert@posteo.de</div>
            <div class="address__row"><span class="address__icon">@include('partials.phone')</span>0178 8787681‬</div>
          </div>
        </address>
      </p>
    </article>
  </section>
  <aside class="aside">
    <ul class="aside__list">
      <li class="aside__list-item"></li>
    </ul>
  </aside>
  <section class="section section--no-padding">
    <article class="article">
      <div class="header__branding header__branding--centerize header__branding--large">
        @include('layouts.logo')
      </div>
    </article>
  </section>
</main>
@endsection
