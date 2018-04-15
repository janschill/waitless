<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Gäste</title>
</head>

<body>
    <h1>Gäste</h1>
    <ul>
        @foreach ($guests as $guest)
        <li>
        <a href="/guests/{{ $guest->id }}" >{{ $guest->comment }}</a>
        </li>
        @endforeach
    </ul>
</body>

</html>