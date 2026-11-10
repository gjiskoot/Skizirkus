# Website Après-Ski Bar – handleiding

One-page site (Duits/Engels) voor hosting op **Netlify**, met de bestanden in **GitHub**.

## Structuur
- `index.html` – de one-page site (Duitse tekst staat hier)
- `assets/script.js` – Engelse vertalingen (object `EN`), taalknop, menu, sneeuw
- `assets/style.css` – kleuren en opmaak (kleuren bovenaan bij `:root`)
- `img/` – logo (badge, icoon, favicon, social-afbeelding), hero-foto en placeholderfoto's
- `impressum.html`, `datenschutz.html` – juridische pagina's (CONCEPT, laten controleren)
- `danke.html` – bedankpagina na het versturen van het formulier

Alles tussen **[vierkante haken]** is een placeholder.

## Online zetten
1. Maak op GitHub een nieuwe repository aan en upload de inhoud van deze map (*Add file → Upload files*).
2. Netlify → *Add new site → Import an existing project → GitHub* → kies de repository. Build command: leeg; publish directory: `.`
3. **Formulier naar je e-mail:** Netlify → Site → *Forms* → *Enable form detection* en daarna een nieuwe deploy. Vervolgens *Forms → Form notifications → Add notification → Email notification* en je e-mailadres invullen.
4. **Domein:** Netlify → *Domain management → Add a domain*. Neem daarna bij je domeinpartij de DNS-records over die Netlify opgeeft. HTTPS gaat automatisch.

## Foto's vervangen
Zet de foto's als `.jpg` (ca. 1600 px breed, < 400 KB) in `img/` en pas in `index.html` de bestandsnaam en de `alt`-tekst aan.

## Tekst wijzigen
Duits: in `index.html`. Engels: in `assets/script.js`, met dezelfde sleutel (`data-i18n="..."`).
