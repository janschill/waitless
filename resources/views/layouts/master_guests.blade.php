<!doctype html>
<html lang="{{ app()->getLocale() }}">

<head>
    <!-- apple pwa meta tags -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <!-- page -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Waitless</title>
    <link rel="stylesheet" href="/stylesheets/app.min.css"
</head>

<body>

  @include ('layouts.header_guests')

  @yield('content')

  @include ('layouts.footer')


  <script src="/javascripts/app.min.js"></script>
</body>

</html>