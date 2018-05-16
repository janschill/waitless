<footer class="footer">
  <a href="/guests">
    <button class="button
@if (request()->route()->uri === 'guests') button--state-selected @endif
">G&auml;ste verwalten</button>
  </a>

  <a href="/waitids">
    <button class="button
@if (request()->route()->uri === 'waitids') button--state-selected @endif
">Wartenummern verwalten</button>
  </a>
</footer>