# Nomago Bikes BAZA Portal - Firebase verzija

Spletna aplikacija za upravljanje uporabnikov in pregledov ključavnic sistem Nomago Bikes. Podatki se shranjujejo v Firebase Firestore za sinhronizacijo med različnimi lokacijami.

## Značilnosti

- **Popolna Firebase integracija** - Vsi podatki se shranjujejo v Firebase Firestore
- **Uporabniška hierarhija** - Admin, Serviser, Študent vloge
- **Pregledi ključavnic** - Sledenje stanju in vzdrževanju ključavnic
- **Sistemska dostopa** - Kontrola dostopa do različnih bike-sharing sistemov
- **Obvestila** - Upravljanje obvestil za vse uporabnike
- **Real-time sinhronizacija** - Podatki se sinhronizirajo v realnem času
- **Responsiven dizajn** - Deluje na namiznih in mobilnih napravah

## Struktura datotek

```
nomago-bikes-portal/
├── index.html                           # Glavna BAZA portal aplikacija
├── nomago_pregledi_kljucavnic.html     # Aplikacija za preglede ključavnic
└── README.md                           # Ta datoteka
```

## Firebase konfiguracija

Aplikacija uporablja že nastavljeno Firebase konfiguracijo:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyBrhPYvef_YZbISHxWeZL0MuQVAQYtTN4M",
    authDomain: "nomago-bikes-portal-f33da.firebaseapp.com",
    projectId: "nomago-bikes-portal-f33da",
    storageBucket: "nomago-bikes-portal-f33da.firebasestorage.app",
    messagingSenderId: "647987655592",
    appId: "1:647987655592:web:7731d4ca344ce804bdc96d"
};
```

## Namestitev

1. **Prenos kode**
   ```bash
   git clone [your-repository-url]
   cd nomago-bikes-portal
   ```

2. **Nastavi spletni strežnik**
   - Aplikacija mora biti gostovana na HTTP/HTTPS strežniku (ne sme biti lokalna file://)
   - Priporočeno: GitHub Pages, Netlify, Vercel ali Apache/Nginx

3. **Odpri aplikacijo**
   - Odpri `index.html` v brskalniku preko strežnika

## Privzeti dostopi

### Administrator
- **Uporabniško ime:** `admin`
- **Geslo:** `admin123`
- **Dostop:** Vsi sistemi in funkcionalnosti

### Sistemski dostopi
- **KolesCE** - Celje sistem
- **LUR** - Ljubljana in Medvode
- **GO2GO** - Nova Gorica
- **KOR** - Kranj/Koper
- **ZaNaprej** - Zagorje ob Savi

## Uporabniške vloge

### 🔧 Administrator
- Ustvarjanje in upravljanje uporabnikov
- Dostop do vseh sistemov
- Upravljanje obvestil
- Sistemske nastavitve
- Pregledi ključavnic

### 🛠️ Serviser
- Pregledi ključavnic za dodeljene sisteme
- Ogled obvestil
- Izvoz poročil

### 👨‍🎓 Študent
- Ogled obvestil
- Omejen dostop do pregledov ključavnic

## Funkcionalnosti

### 🏠 Nadzorna plošča
- Pregled stanja pregledov ključavnic
- Aktivna obvestila
- Statistike sistema

### 👥 Upravljanje uporabnikov (samo Admin)
- Dodajanje novih uporabnikov
- Dodeljevanje sistemskih dostopov
- Brisanje uporabnikov

### 🔧 Pregledi ključavnic
- **Status kodi:**
  - `BP` - V redu (zeleno)
  - `X` - Okvarjena (rdeče)
  - `NP` - Ne deluje pravilno (oranžno)
  - `NZ` - Ne zaklene (modro)
  - `NO` - Ne odklene (vijolično)

- **Opozorila:**
  - Zamujeni pregledi (rdeče) - pregledi, ki so zamujeni
  - Pregledi kmalu (oranžno) - pregledi potrebni v 14 dneh

### 📢 Obvestila (samo Admin)
- Ustvarjanje obvestil za vse uporabnike
- Različni tipi: Info, Opozorilo, Uspeh, Napaka
- Prioritete: Normalna, Visoka, Nujna
- Aktivacija/deaktivacija obvestil

## Firebase struktura podatkov

### Zbirka: `uporabniki`
```javascript
{
  "admin": {
    "ime": "Admin",
    "priimek": "Administrator", 
    "uporabniskoIme": "admin",
    "geslo": "admin123",
    "vloga": "admin",
    "sistemi": ["KolesCE", "LUR", "GO2GO", "KOR", "ZaNaprej"],
    "createdAt": timestamp
  }
}
```

### Dokument: `system/notifications`
```javascript
{
  "data": [
    {
      "id": timestamp,
      "title": "Naslov",
      "message": "Sporočilo",
      "type": "success|warning|error|info", 
      "priority": "normal|high|urgent",
      "active": true,
      "createdAt": "ISO_string",
      "createdBy": "uporabniško_ime"
    }
  ],
  "lastUpdated": timestamp
}
```

### Dokument: `system/inspectionData`
```javascript
{
  "data": {
    "terminal-rackNumber": {
      "currentStatus": "BP|X|NP|NZ|NO",
      "lastInspection": "ISO_string",
      "notes": "Opombe",
      "inspector": "uporabniško_ime"
    }
  },
  "lastUpdated": timestamp
}
```

### Dokument: `system/inspectionLog`
```javascript
{
  "data": [
    {
      "timestamp": "ISO_string",
      "terminal": "terminal_id",
      "rackNumber": "1",
      "oldStatus": "BP",
      "newStatus": "X",
      "inspector": "uporabniško_ime",
      "notes": "Opombe"
    }
  ],
  "lastUpdated": timestamp
}
```

## Lokacije po sistemih

### Ljubljana in Medvode (LUR)
- 42 lokacij v Ljubljani, Medvodah, Dobrova-Polhov Gradec
- Terminali: 87001-87042, 87086-87090

### GO2GO (Nova Gorica)
- 16 lokacij v Novi Gorici
- Terminali: 5901, 5903, 5905, 5907, 59108-59120

### KOLESCE (Celje)
- 10 lokacij v Celju
- Terminali: 3250, 3255, 3256, 3260, 3263, 3291, 3294, 5940, 5941, 5943

### ZANAPREJ (Zagorje ob Savi)
- 7 lokacij v Zagorju ob Savi
- Terminali: 5963, 5994-5999

## Varnost in dostop

- **Ni localStorage** - Vsi podatki se shranjujejo v Firebase
- **sessionStorage** - Samo za začasno shranjevanje seje
- **Sistemski dostopi** - Uporabniki vidijo samo svoje dodeljene sisteme
- **Avtomatska sinhronizacija** - Podatki se sinhronizirajo ob vsaki spremembi

## Tehnične specifikacije

- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Firebase:** Firestore Database v9 SDK
- **Brskalniki:** Chrome, Firefox, Safari, Edge (zadnje verzije)
- **Mobilni:** Responsiven dizajn za vse naprave

## Troubleshooting

### Problem: Aplikacija se ne naloži
- Preverite internetno povezavo
- Preverite konzolo brskalnika za napake
- Aplikacija mora biti gostovana na HTTP/HTTPS (ne file://)

### Problem: Ne morem se prijaviti
- Privzeti admin dostop: admin / admin123
- Preverite Firebase konzolo za morebitne napake
- Preverite Network tab v Developer Tools

### Problem: Podatki se ne sinhronizirajo
- Preverite internetno povezavo
- Preverite Firebase pravila dostopa
- Preverite konzolo za Firebase napake

### Problem: Pregledi ključavnic se ne naložijo
- Preverite, ali imate dodeljene sistemske dostope
- Preverite, ali je uporabnik pravilno konfiguriran
- Preverite Firebase podatke za inspectionData

## Podpora

Za tehnično podporo kontaktirajte skrbnika sistema ali preverite:
- Firebase konzolo za napake
- Browser Developer Tools > Console
- Network tab za probleme s povezavo

## Licenca

© 2024 Nomago Bikes. Vse pravice pridržane.