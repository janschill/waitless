<header class="header">
  <div class="header__branding">
  @include ('layouts.logo')
  </div>
  <ul class="header__statistics-list header__statistics-list--hidden">
    <li class="header__statistics-list-item">100 Gäste</li>
    <li class="header__statistics-list-item">2 Personen</li>
    <li class="header__statistics-list-item">10 Minuten</li>
  </ul>
  <nav class="navigation">
    <ul class="navigation__list">
      <li class="navigation__list-item"><a class="navigation__link" href="/guests">Gäste</a></li>
      <li class="navigation__list-item"><a class="navigation__link" href="/waitids">Wartenummer</a></li>
      <li class="navigation__list-item"><a class="navigation__link" href="/statistics">Statistik</a></li>
      <li class="navigation__list-item"><a class="navigation__link" href="/">Hilfe</a></li>
    </ul>
  </nav>
  <div class="header__column">
    <div class="header__refresh">@include('partials.refresh')</div>
    <div class="hamburger">
      <div class="hamburger__inner"></div>
    </div>
  </div>
</header>
