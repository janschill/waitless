<!doctype html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Waitless</title>
    <link rel="stylesheet" href="/css/styles.css"
</head>

<body>

  @include ('layouts.navigation')

  @yield('content')

  @include ('layouts.footer')

</body>

</html>