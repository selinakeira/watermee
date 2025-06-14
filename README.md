# watermee# watermeim4

# Planties – Deine Pflanzen im Griff

**Website:** [www.waterme.ch](http://www.waterme.ch)
**Projektname:** Planties

---

## 🌱 Projektidee

Planties ist eine Web-App, mit der Nutzer\*innen ihre Zimmerpflanzen verwalten können. Ziel ist es, Menschen dabei zu helfen, den Überblick über ihre Pflanzen zu behalten, diese regelmässig zu pflegen und rechtzeitig zu giessen – damit alle Pflanzen gesund und glücklich bleiben.

---

## 📅 Zielgruppe & Problemstellung

Viele Menschen besitzen Pflanzen, verlieren jedoch oft den Überblick darüber, wann sie welche Pflanze giessen müssen. Gerade bei mehreren Pflanzen mit unterschiedlichen Bedürfnissen wird dies schnell unübersichtlich. Planties löst dieses Problem durch ein personalisiertes Pflanzenmanagement-System.

---

## 🎯 Funktionale Anforderungen

### Must-Haves

* User-Registrierung und Login
* Pflanzen suchen und hinzufügen
* Pflanzen einer Datenbank zuordnen
* Informationen zu jeder Pflanze abrufen
* Benutzer sehen, wann eine Pflanze wieder gegossen werden muss
* Verbindung zwischen Benutzer und "seinen" Pflanzen (via user-plant-Tabelle)

### Nice-to-Haves (geplant, aber nicht umgesetzt)

* Haushalts-/Gruppen-Funktion (mehrere Benutzer teilen eine Pflanzenliste)
* Mehrere Pflanzen einer Art hinzufügen
* Pflanzen löschen
* Notizen und Bilder je Pflanze

---

## 🚀 Technische Umsetzung

### Verwendete Technologien

* **HTML** / **CSS**: Struktur und Design der Anwendung
* **JavaScript**: Clientseitige Logik, Events, Datenmanipulation
* **PHP**: Serverseitige Logik, API-Endpunkte, Sessions
* **MySQL**: Relationale Datenbank
* **Infomaniak**: Hosting-Umgebung

### Entwicklungsumgebung

* Projektstart mit Git geplant, jedoch aufgrund technischer Probleme (Dateiduplikate bei Pushes) schliesslich lokal auf einem einzigen Laptop entwickelt.

---

## 🔐 Sicherheitsmassnahmen

* Passwort-Hashing für sichere Speicherung
* Session-Management zur Authentifizierung
* Verknüpfung von Pflanzen mit Benutzer-IDs (Schutz vor unbefugtem Zugriff)
* Vermeidung direkter SQL-Injection durch vorbereitete Statements (Prepared Statements)

---

## 📂 Datenbankstruktur

Insgesamt wurden vier relationale Tabellen erstellt:

1. **users**

   * id (PK)
   * email
   * password (gehashed)

2. **plants**

   * id (PK)
   * name
   * information
   * watering\_guide
   * light\_location
   * frequency\_in\_days

3. **user\_plants**

   * id (PK)
   * user\_id (FK)
   * plant\_id (FK)
   * last\_watered

4. **watering\_log**

   * id (PK)
   * user\_plant\_id (FK)
   * watered\_at (timestamp)

---

## ⚖️ Projektverlauf

### Ablauf

* **Phase 1:** Login-System und erste Datenbanktabellen (gemeinsam mit Schule)
* **Phase 2:** Grundstruktur der Web-App mit HTML und CSS
* **Phase 3:** Datenbanklogik, Tabellenbeziehungen, Insert/Update-Logik
* **Phase 4:** Verbindung von Frontend mit Datenbank (API via PHP)
* **Phase 5:** Design-Feinschliff und Responsiveness

### Herausforderungen & Learnings

* Datenbankbeziehungen und sichere Datenabfragen waren komplex, wurden aber mit Hilfe von YouTube, ChatGPT und Testen gelöst
* Technische Einschränkungen bei der Zusammenarbeit via Git zwangen uns zur Entwicklung an einem einzigen Laptop
* UI-Design und Responsive-Anpassung brauchten viel Feinschliff (z. B. Burger-Menü, Mobilversion)

---

## 🔄 CRUD-Operationen

| Funktion | Umsetzung                                                     |
| -------- | ------------------------------------------------------------- |
| Create   | Pflanzen werden vom User hinzugefügt (Insert in user\_plants) |
| Read     | Alle Pflanzeninfos werden per plantID angezeigt (select)      |
| Update   | Letzter Giesszeitpunkt aktualisieren (Update in user\_plants) |
| Delete   | (Nicht umgesetzt, aber möglich: Pflanzen löschen)             |

---

## 🛋️ Responsives Design & Usability

* Die App ist für Mobilgeräte optimiert (flexibles Layout, CSS Media Queries)
* Navigation wird bei kleiner Auflösung in ein Burger-Menü umgewandelt
* Klare visuelle Sprache, Farben und Schriftwahl für gute Lesbarkeit
* Icons und Buttons fördern die intuitive Nutzung

---

## 🏛️ Anleitung zur lokalen Nutzung

1. Lokalen Server wie **XAMPP** starten
2. Projektordner in **htdocs** kopieren
3. Datenbank importieren (z. B. via phpMyAdmin)
4. `config.php` ggf. anpassen
5. Seite im Browser aufrufen: `localhost/Planties`

> Beispiel-Zugangsdaten für Test:
> user: `demo@planties.ch`
> pw: `plantlove`

---

## ✨ Weiterentwicklung (Potenzial)

* Pflanzen löschen und editieren
* Fotos hochladen
* Haushaltsverwaltung mit mehreren Usern
* Reminder per Mail oder SMS
* Kalenderansicht
* Pflanzenübersicht nach Raum / Standort

---

## 🌟 Fazit

Die App "Planties" bietet eine solide Grundlage für digitales Pflanzenmanagement. Unser Ziel war es, ein funktionierendes, benutzerfreundliches und datenbankgestütztes System zu entwickeln. Trotz einiger technischer Hürden konnten wir eine gut funktionierende Web-App erstellen, die sich leicht erweitern lässt.

---

**Erstellt von:** \[Cristina Fernandez und Selina D'Ostilio]
**Datum:** Juni 2025
