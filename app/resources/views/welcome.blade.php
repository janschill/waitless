<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Waitless</title>
        </head>
    <body>
<h1>Waitless</h1>
<h2>Wartende Nummern:</h2>
<ul>
@foreach ($waitid as $wait)
<li> {{$wait->number}}</li>
@endforeach
</ul>
<p>(Aus MySQL-Datenbank)</p>
    </body>
</html>
