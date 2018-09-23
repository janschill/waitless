# Projektdokumentation

## Einleitung

### Problem

In Gaststätten mit begrenzten Sitzplätzen kommt es oft zu Problemen bei der Zuweisung der wartenden Gäste auf verfügbare Plätze. Diese Situation ist für die Mitarbeiter unübersichtlich, da nicht klar ist, wie viele Gäste auf freie Plätze warten und welche Personen zuerst erschienen sind. Auch die Gäste können nicht direkt ersehen, ob Plätze frei sind. Oft müssen Gäste weggeschickt werden, wenn keine freien Plätze verfügbar sind. Es ist keine effiziente und faire Platzzuweisung möglich. Außerdem wäre es wünschenswert, dass die gesammelten Information analysiert werden, wie zum Beispiel, zu welcher Zeit kommen die meisten Gäste, bzw. wann wird das System benötigt. Auch die Wartezeit von Gästen wäre hilfreich, auch die durchschnittliche Wartezeit in Abhängigkeit zur Gruppengröße.

### Lösungsansatz

Um diese Problematik zu beheben, soll die Webanwendung „waitless“  zur Verwaltung von Gästen erstellt werden. Mit Tablets können Mitarbeiter von Restaurants darauf zugreifen.

### Ablauf von Kundeninteraktion

* Gäste kommen an, da alle Plätze belegt sind, werden sie vor der Gaststätte von einem Mitarbeiter begrüßt.
* Dieser fügt die Gäste in der Anwendung hinzu und gibt ihnen eine Wartekarte mit der Wartenummer.
* Drinnen wird ein Platz frei, ein Mitarbeiter drinnen stellt den Status der Gäste auf "zugewiesen"
* Der Mitarbeiter draußen sagt den Gästen Bescheid und nimmt die Wartekarte entgegen.
* Die Gäste gehen in das Restaurant und werden von einem Mitarbeiter zu dem Tisch geführt.
* Der Mitarbeiter drinnen drückt auf die oben angezeigte Wartenummer und verschiebt diese damit in die Historie.

Da die Anwendung für die Mitarbeiter drinnen und draußen identisch ist, können alle Aktionen sowohl von Mitarbeitern draußen als auch drinnen vorgenommen werden. Dies erlaubt flexible Abläufe.

## Anforderungen

* Mehrere Geräte müssen gleichzeitig auf die Anwendung zugreifen können und Änderungen auf beiden aktualisiert werden.
* Gäste müssen angelegt werden können und die Anzahl der Personen erfasst werden können.
* Den Gästen müssen Wartenummern zugewiesen werden können.
* Damit Gäste die ihnen zugewiesene Wartenummer nicht vergessen, können Mitarbeiter ihnen Karten geben, auf denen die Nummer steht. Das System sollte daher bei neuen Nutzern freie Nummern aus einer Liste anbieten.
* Damit Kunden schon während sie warten Getränke bekommen können, müssen Mitarbeiter in dem System vermerken können, wenn bereits eine Rechnung besteht.
* Bei wartenden Gästen soll angezeigt werden, wie lange diese bereits warten.
* Falsche Eingaben sollen schnell behoben werden können.
* Für die Leitung der Gaststätte sollen die erfassten Daten in Diagrammen angezeigt werden können.
* Neue Wartenummern sollen angelegt werden können, bereits angelegte deaktiviert werden.

## Iterationen

Nach der Festlegung der Anforderungen an die Anwendung wurden erste Skizzen angefertigt. Das Konzept war zu Beginn allerdings noch etwas anders: Der Plan war zuerst, dass Gäste sich selbstständig an einem Touchscreen anmelden. Es sollte drei Clients geben: Einen Touchscreen, der im Eingangsbereich steht, auf dem sich die Gäste anmelden können:
<img src="https://imgur.com/M68zmDg.jpg" width="40%"><img src="https://imgur.com/6O6MO2y.jpg" width="40%">
<img src="https://imgur.com/U4WzmIU.jpg" width="40%">

Einen Bildschirm für Mitarbeiter draußen zum Verwalten der wartenden Gästen:

<img src="https://imgur.com/ubnRs4F.jpg" width="40%">

Und ein Client zur Tischverwaltung:

<img src="https://imgur.com/4i8lAXO.jpg" width="50%">

Allerdings haben wir bemerkt, dass es für Gaststätten verlässlicher ist, von Mitarbeitern die Eingaben machen zu lassen und auch die Gäste bevorzugen einen direkten Kontakt mit Mitarbeitern.
Außerdem hat sich der Client zur Tischverwaltung als überflüssig herausgestellt. Die meisten Gaststätten verwenden bereits so ein System. Wenn wir so etwas auch implementieren würden, müssten die Mitarbeiter diese Daten also in zwei Systemen einpflegen. 

Auf Basis dieser Entscheidungen haben wir einen neuen Prototypen erstellt:

<img src="http://up.picr.de/33891468an.jpg" width="40%">
<img src="http://up.picr.de/33891469jb.jpg" width="40%">
<img src="http://up.picr.de/33891470df.jpg" width="40%">
<img src="http://up.picr.de/33891471nm.jpg" width="40%">


Die Interaktion mit diesem Prototyp hat gut funktioniert. Nur das Menü sollte in einem Hamburger-Menü paltziert werden und die Buttons zur Zuweisung des Status überarbeitet werden. Daher haben wir ein Mockup in Adobe XD erstellt:

<img src="http://up.picr.de/33891331yl.jpg" width="40%">
<img src="http://up.picr.de/33792595po.png" width="40%">
<img src="http://up.picr.de/33792597ht.png" width="40%">

Bei diesem Prototypen haben wir festgestellt, dass nicht klar war, welchen Status die Gäste haben und welche Schaltfläche diesen ändert. Wir haben mit Buttons mit einer Pfeilspitze experimentiert, um den nächsten Status anzuzeigen. Dies hat sich aber als nicht intuitiv herausgestellt. Daher haben wir die Gäste klar in Abschnitte eingeordnet:

<img src="http://up.picr.de/33792598qf.png" width="40%">

Bei diesem Design hat die Statuszuweisung besser funktioniert, es war aber nicht deutlich, welche Elemente Interaktionen haben. Außerdem waren die Elemente zwar geordnet, es gab aber keine Hierarche. Es sollte deutlich werden, dass der wichtigste Zustand "zugewiesen" ist, denn dann muss ein Mitarbeiter die Gäste informieren.
Daher haben wir das Design angepasst und sind so bei der finalen Version angelangt.

## Endergebnis
<img src="http://up.picr.de/33897499rr.jpg" width="50%"><img src="http://up.picr.de/33897466vz.jpg" width="50%">
<img src="http://up.picr.de/33897464do.jpg" width="50%"><img src="http://up.picr.de/33897467wv.jpg" width="50%">
<img src="http://up.picr.de/33897465ap.jpg" width="50%"><img src="http://up.picr.de/33897461sb.jpg" width="50%">
<img src="http://up.picr.de/33897463wf.jpg" width="50%">

### Designentscheidungen & Besonderheiten

Da die Anwendung von vielen Nutzern über lange Zeit verwendet wird, lag der Fokus auf schnellen Interaktionen mit der Anwendung.
Daher sind die wichtigsten Aktionen mit einfachem berühreren auf große Bedienelemente durchzuführen. Besonders präsent sind zugewiesene Gäste, weil dieser Zustand eine Aktion von den Mitarbeitern erfordert. Mitarbeiter draußen müssen dann die Gäste in die Gaststätte führen.

Platzierte Gäste verschwinden nicht sofort, sondern werden in der Historie gelistet. Dies erlaubt den Anwendern, Fehler rückgängig zu machen. Außerdem geben die Zeiten auch einen Überblick, wie lange die sitzenden Gäste schon an ihrem Platz sind.
So hat man stets eine genaue Übersicht über die aktuell wartenden Gäste und die letzten zehn. Wir haben uns für zehn entschieden, da die Funktion der History nur zum Fehler beheben genutzt werden sollte, also, falls man mal aus Versehen einen Gast in die History schiebt und dies rückgängig machen muss.

Es ist wichtig, dass die Applikation fehlerresistent ist, da sie in einem Kontext eingesetzt wird, wo Probleme mit dem System den gesamten Betrieb aufhalten könnten. 
Auch in anderen Teilen der Applikation haben wir dafür gesorgt, dass es nicht zu Problemen durch falsche Eingaben kommen kann. Bei der Auswahl einer Wartenummer gibt der Nutzer keine Nummer ein, sondern wählt eine der verfügbaren. Angelegt Wartenummern können nur deaktiviert werden und nicht gelöscht werden. Im Index, also in der Listenansicht der Gäste, können zu jeder Zeit alle Parameter geändert werden, um Flexibilität zu gewährleisten und Fehler zu beheben.

Das Hinzufügen von neuen Gästen ist die wichtigsten Funktion, die am schnellsten erreichbar sein muss. Aus diesem Grund gibt es für diese Funktion einen großen grünen Button in der Mitte des Bildschirms (unter den wartenden Gästen). In dem Formular für das Hinzufügen der Gäste gibt es minimale Bedienelemente. Zahlen werden mit vordefinierten Knöpfen schnell zugänglich gemacht.

Da die Applikation von mehreren Nutzern gleichzeitig benutzt wird, ist es wichtig, dass alle über den aktuellen Stand informiert sind. Daher haben wir uns dafür entschieden, Benachrichtigungen zu implementieren. Wenn ein Nutzer eine wichtige Eingabe tätigt (z.B. Status ändern oder neue Gäste anlegen) erscheint auf allen anderen Geräten ein Hinweis dazu.
<img src="http://up.picr.de/33891204in.png">

Um die Schaltfläche zum Ändern des Status eindeutig zu gestalten, haben wir uns für einen Button mit einem Dropdown entschieden.

<img src="http://up.picr.de/33891238bd.png">

Dies hat mehrere Vorteile:
Da Gäste meistens einem Platz zugewiesen werden sollen und eher selten das Lokal vorzeitig verlassen, kann in den meisten Fällen die Statusänderung mit einem Klick ausgeführt werden. Außerdem ist es fehlerresistent, da die seltener verwendete Option versteckter ist.

## Umsetzung

Für eine genaue Programmierdokumentation und einem Stacküberblick haben wir eine englische [README.md](README.md) geschrieben, um das _Open Source_ nicht auszuschließen.

### Probleme & Verbesserungsmöglichkeiten

Da wir uns dafür entschieden haben kein Frontend-Framework für die reaktive Darstellung von Inhalten zu nutzen, sind wir an die ein oder andere Schwierigkeit gestoßen.

1. **Event delegation** beschreibt ein Verfahren bei dem nicht auf die einzelnen `Childs` ein `Event-Listener` gesetzt wird, sondern auf dem darüber liegenden `Parent`. Ein Standardbeispiel wäre eine ToDo-Liste. Anstelle die `Click-Event` auf die einzelnen Listenelemente zu setzen, setzen wir nur einen einzelnen auf die `<ul>` und fangen dann mit `if-statements` das geklickte Listenelement über das `Event-Objekt` ab. **Event delegation** hat dadurch den Vorteil, dass, wenn Elemente dynamisch hinzugefügt werden, diese sofort ohne zusätzliche Programmierung einen `Event-lListener` besitzen.

Wir nutzen kein **Event delegation**, da wir zu spät dieses Konzept kennenlernten, werden es aber später integrieren. Dadurch hätten wir unnötige Komplexität vermeiden können.

Außerdem war das Konzept des `JavaScript Bundlings` noch nicht ganz klar, das von Laravel bei einer Neuinstallation verwendet wird. Deshalb nutzen wir es nur teilweise für Services, die auch schon von Anfang an in Laravel integriert sind, wie zum Beispiel `Pusher`. Auch das macht das Projekt unübersichtlich, gerade in Anbetracht, dass wir `Gulp.js` für das minifizieren von den eigenen geschriebenden Scripts nutzen.

All die bisher angesprochenen Punkte wären vermeidbar gewesen hätte man ein Frontendframework wie: `Vue.js` oder `React` genutzt. Dennoch bereuen wir unsere Wahl nicht, denn wir haben viel gelernt und musste nicht noch ein Framework, neben Laravel lernen.

### Weiteres Vorgehen

Es ist geplant dieses Projekt noch einmal zu refactoren und aufzuräumen mit den Dingen, die während der Entwicklung gelernt wurden umzusetzen. Im gleichen Zuge wird das Projekt so überarbeitet, dass es allgemein besser nutzbar für andere _Kunden_ ist und einfacher auf Wünsche eingegangen werden kann.

## Installationsanleitung

Für Installation des Projektes haben wir ein `install.sh` Shell-Script geschrieben. Mit den nötigen Rechten `chmod +x install.sh` kann das Script über `./install.sh` in der Konsole ausgeführt werden. Es bereitet die Datenbank vor und startet einen PHP Artisan Server (wenn gewünscht). Mehr dazu in der [README.md](README.md).
