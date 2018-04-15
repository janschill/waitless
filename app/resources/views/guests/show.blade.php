<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Gast</title>
</head>
<body>
  <h1>Wartenummer: {{ $guest->waitid_id }}</h1>
  <p>Status: {{ $guest->state_id }}</p>
  <p>Gruppengröße: {{ $guest->group_size }}</p>
  <p>Kommentar: {{ $guest->comment }}</p>
</body>
</html>