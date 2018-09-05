<!doctype html>
<html lang="{{ app()->getLocale() }}">

<head>
    <!-- icons -->
    <link rel="apple-touch-icon" sizes="57x57" href="images/meta/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="images/meta/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/meta/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="images/meta/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/meta/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="images/meta/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="images/meta/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="images/meta/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="images/meta/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="images/meta/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="manifest" href="manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="images/meta/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <!-- apple pwa meta tags -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <!-- token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- page -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Waitless</title>
    <link rel="stylesheet" href="/stylesheets/app.min.css">
</head>

<body>
  @include ('layouts.header')

  @include ('layouts.notification')

  @yield('content')

  @include ('layouts.footer')
  <script src="/javascripts/bootstrap.js"></script>
  <script src="/javascripts/app.min.js"></script>
</body>

</html>