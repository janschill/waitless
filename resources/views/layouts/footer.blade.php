<footer class="footer">
<a href="/guests"><button class="button 
@if ($mode === 'guests') button--state-selected @endif
">G&auml;ste verwalten</button></a>

<a href="/waitids"><button class="button
@if ($mode === 'waitids') button--state-selected @endif
">Wartenummern verwalten</button></a>
</footer>