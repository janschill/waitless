# Projektdokumentation

## Einleitung

### Problem

In Gaststätten mit begrenzten Sitzplätzen kommt es oft zu Problemen bei der Zuweisung der wartenden Gäste auf verfügbare Plätze. Diese Situation ist für die Mitarbeiter unübersichtliich, da nicht klar ist, wie viele Gäste auf freie Plätze warten und welche Personen zuerst erschienen sind. Auch die Gäste können nicht direkt ersehen, ob Plätze frei sind. Oft müssen Gäste weggeshickt werden, wenn keine freien Plätze verfügbar sind. Es ist keine effiziente und faire Platzzuweisung möglich. Außerdem wäre es wünschenswert, dass gesammelten Information analysiert werden, wie zum Beispiel, zu welcher Zeit kommen die meisten Gäste, bzw. wann wird das System benötigt. Wie lange müssen die Gäste warten, hier auch die durchschnittliche Wartezeit in Abhängigkeit zur Gruppengröße.

### Lösungsansatz

Um diese Problematik zu beheben, soll eine Webanwendung zur Verwaltung von Gästen erstellt werden. Mit Tablets können Mitarbeitern von Restaurants darauf zugreifen.

### Ablauf

* Gäste kommen an, da alle Plätze belegt sind, werden sie vor der Gaststätte von einem Mitarbeiter begrüßt.
* Dieser fügt die Gäste in der Anwendung hinzu und gibt ihnen eine Wartekarte mit der Wartenummer.
* Drinnen wird ein Platz frei, ein Mitarbeiter drinnen stelt den Status der Gäste auf "zugewiesen"
* Der Mitarbeiter draußen sagt den Gästen Bescheid und nimmmt die Wartekarte entgegen.
* Die Gäste gehen in das Restaurant und werden von einem Mitarbeiter zu dem Tisch geführt.
* Der Mitarbeiter drinnen drückt auf die oben angezeigte Wartenummer und verschiebt diese damit in die Historie.

Da die Anwendung für die Mitarbeiter drinnen und draußen identisch ist, können alle Aktionen sowohl von Mitarbeitern draußen als auch drinnen vorgenommen werden. Dies erlaubt flexible Abläufe. 

## Anforderungen

Mehrere Geräte müssen gleichzeitig auf die Anwendung zugreifen können und Änderungen auf beiden aktualisiert werden.
Gäste müssen angelegt werden können und die Anzahl der Personen erfasst werden können. Den Gästen müssen Wartenummern zugewiesen werden können. 
Damit Gäste die ihnen zugewiesene Wartenummer nicht vergessen, können Mitarbeiter Ihnen Karten geben, auf denen die Nummer steht. Das System sollte daher bei neuen Nutzern freie Nummern aus einer Liste anbieten.
Damit Kunden schon während sie warten Getränke bekommen können, müssen Mitarbeiter in dem System vermerken können, wenn bereits eine Rechnung besteht.
Bei wartenden Gästen soll angezeigt werden, wie lange diese bereits warten.
Falsche Eingaben sollen schnell behoben werden können.
Für die Leitung der Gaststätte sollen die erfassten Daten in Diagrammen angezeigt werden können.
Neue Wartenummern sollen angelegt werden können, bereits angelegte deaktivert werden.

## Iterationen

Nach der Festlegung der Anforderungen an die Anwendung wurden erste Skizzen angefertigt. Das Konzept war zu Beginn allerdings noch etwas anders: Der Plan war zuerst, dass Gäste sich selbstständig an einem Tochscreen anmelden. Es sollte drei Clients geben: Einen Touchscreen, der im Eingangsbereich steht, auf dem sich die Gäste anmelden können:
<img src="https://imgur.com/M68zmDg.jpg" width="50%"><img src="https://imgur.com/6O6MO2y.jpg" width="50%">
<img src="https://imgur.com/U4WzmIU.jpg" width="50%">
Einen großen Bildschirm, der die Liste aller wartender Gäste anzeigt:
<img src="https://imgur.com/ubnRs4F.jpg" width="40%"><img src="https://imgur.com/4i8lAXO.jpg" width="60%">
...

Allerdings haben wir bemerkt, dass es für Gaststätten verlässlicher ist, von Mitarbeitern die Eingaben machen zu lassen und auch die Gäste bevorzugen einen direkten Kontakt mit Mitarbeitern.
Daher haben wir um dieses Konzept zu testen, einen neuen Papierprototypen angefertigt:

Die Interaktion mit diesem Prototyp hat gut funktiioniert. Daher haben wir ein Mockup in Adobe XD erstellt:


<img src="http://up.picr.de/33792595po.png" width="40%">
 Bei diesem Prototypen haben wir festgestellt, dass nicht klar war, mit welchen Elementen interagiert werden kann. Daher haben wir uns für ein einheitliches Design von Buttons entschieden.


<img src="http://up.picr.de/33792596la.png" width="40%">

<img src="http://up.picr.de/33792597ht.png" width="40%">

<img src="http://up.picr.de/33792598qf.png" width="40%">

## Endergebnis

### Designentscheidungen

Da die Anwendung von vielen Nutzern über lange Zeit verwendet wird, lag der Fokus auf schnellen Interaktionen mit der Anwendung.
Daher sind die wichtigsten Aktionen mit einfachem touchen??? auf große Bedienelemente durchzuführen. Besonders präsent sind zugewiesene Gäste, weil dieser Zustand eine Aktion von den Mitarbeitern erfordert. Mitarbeiter drau'en müssen dann die Gäste in die Gaststätte führen. 
Platzierte Gäste verschwinden nicht sofort, sondern werden in der Historie gelistet. Dies erlaubt den Anwendern, Fehler rückgängig zu machen. Außerdem geben die Zeiten auch einen Überblick, wie lange die sitzenden Gäste schon an ihrem Platz sind?
## wird der Zeitpunkt der Platzierung angezeigt?
was zu buttons


## Umsetzung

Laravel...
Warum für Laravel und co entschieden?

### Problem bzw. Verbesserungen

Da wir uns dafür entschieden kein Frontend-Framework, für die reaktive Darstellung von Inhalten, zu nutzen. Sind wir die ein oder andere Schwierigkeit gestoßen.

1. **Event delegation** beschreibt ein Verfahren bei dem nicht auf die einzelen `Childs` ein `Event-Listener` gesetzt wird, sondern auf dem darüberliegenden `Parent`. Ein Standardbeispiel wäre eine ToDo-Liste. Anstelle die `Click-Event` auf die einzelnen Listenelemente zu setzen, setzen wir nur einen einzelnen auf die `<ul>` und fangen dann mit `if-statements` da geklickte Listenelement über das `Event-Objekt` ab. **Event delegation** hat dadurch den Vorteil, dass, wenn Elemente dynamisch hinzugefügt werden, diese sofort, ohne zusätzliche Programmierung einen `Event-listener` haben.

Wir nutzen kein **Event delegation**, da wir zu spät dieses Konzept kennenlernten, werden es aber später integrieren.

## Installationsanleitung

…

## Feedback

### Papierprotoyp

* Farbgestaltung an Corporate Design anpassen
* Historie-Unterpunkt
* Vorbestellung lieber Checkbox oder Schiebeschalter
* Gast löschen Position ändern
* Speichern und Abbrechen tauschen?
* Hamburger-Menü vllt rechts?
* Kommentar-Button wirkt wie Eingabe, ... reicht vllt
* wartend wirkt inaktiv wegen Grauton
  * vllt Abstand zwischen wartend, platziert
  * platziert-Icon misverständlich

### 27.08.2018

* evtl. Backup-Funktion?
* Bearbeiten-Button ist bei Personenanzahl oder Nummer verwirrend -> Umbenennen, vllt Speichern
* Buttons optisch buttoniger machen
* Bei Bearbeiten Autofokus in Textfeld
* größter Kritikpunkt: Plus-Button ungünstig, blockiert Elemente. Anders darstellen, vllt in der Nähe von Aktuelles, da die Nummer dort hinzugefügt wird?
* Hinweise-Edit in Historie crashed
* Lieber ... bei langen Kommentaren, abgeschnittener Text wirkt unruhig
* Statistik an Stil anpassen, Schrift schwarz
* Wichtig bei Doku: Warum? Irrwege
* Kleine Designsachen: Abstände von Karten zu allen Seiten gleich, Waitless größer, waitless, Zeit und Menu auf einer Höhe, Einträge links rechts Abstand gleich
