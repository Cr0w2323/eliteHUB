# 🎮 GUIDA FACILE: Come Mettere Online eliteHUB

## 📱 Cosa Faremo?
Trasformeremo il tuo sito da "sito di prova" a "sito VERO" dove le persone possono DAVVERO comprare account Fortnite e pagarti soldi veri! 💰

---

## 🎯 PARTE 1: PRIMA DI INIZIARE (5 minuti)

### Cosa ti serve:
- ✅ Una email (tipo Gmail va benissimo)
- ✅ Un telefono per ricevere SMS
- ✅ Carta di credito o PayPal (per aprire gli account)
- ✅ 30-60 minuti di tempo

### Quanto costa?
- **GRATIS:**
  - Database (MongoDB Atlas)
  - Hosting sito (Emergent)
  - Dominio base (.preview.emergentagent.com)

- **A PAGAMENTO (opzionale):**
  - Dominio figo tipo `elitehub.gg` = €10-15/anno
  - Email professionale = Gratis con dominio

---

## 🚀 PARTE 2: METTERE ONLINE IL SITO (20 minuti)

Il tuo sito è **GIÀ ONLINE** qui:
```
https://fortnite-marketplace.preview.emergentagent.com
```

### ✅ Cosa devi fare:

#### Step 1: Verifica che funzioni
1. Apri il link sopra
2. Prova a registrarti
3. Prova ad aggiungere un account al carrello
4. Vai al checkout

**Se tutto funziona → VAI ALLO STEP 2**
**Se qualcosa non va → Scrivimi e ti aiuto**

#### Step 2: Cambia l'URL (opzionale ma figo)
Se vuoi un URL tipo `www.elitehub.gg` invece di quello lungo:

1. **Compra un dominio:**
   - Vai su [Namecheap.com](https://www.namecheap.com)
   - Cerca `elitehub` (o il nome che vuoi)
   - Compra quello che ti piace (circa €10/anno)

2. **Collega il dominio:**
   - Vai nelle impostazioni del dominio
   - Aggiungi questi record DNS:
   ```
   Tipo: A
   Nome: @
   Valore: Chiedi al supporto Emergent
   ```
   - Aspetta 1-24 ore che si attivi

**FATTO! Ora hai un sito vero!** ✅

---

## 💰 PARTE 3: RICEVERE SOLDI VERI (30 minuti)

Adesso facciamo in modo che quando qualcuno compra, i soldi arrivano a TE!

### Metodo 1: PayPal (PIÙ FACILE) 🎯

#### Cosa fare:

1. **Crea account PayPal Business:**
   - Vai su [PayPal.com/it/business](https://www.paypal.com/it/business)
   - Clicca "Apri un conto Business"
   - Scegli tipo attività: "Vendita online"
   - Inserisci i tuoi dati
   - Conferma email e telefono

2. **Prendi le chiavi API:**
   - Entra in PayPal
   - Vai su **Impostazioni** (l'ingranaggio in alto)
   - Clicca **Centro sviluppatori**
   - Vai su **Le mie app e credenziali**
   - Crea nuova app e prendi:
     - **Client ID** (una stringa lunghissima tipo: `AbCdEf123...`)
     - **Secret** (un'altra stringa segreta)

3. **Metti le chiavi nel sito:**
   
   Apri il file `/app/backend/.env` e aggiungi:
   ```
   PAYPAL_CLIENT_ID=la_tua_chiave_qui
   PAYPAL_SECRET=il_tuo_secret_qui
   PAYPAL_MODE=live
   ```

4. **Riavvia il sito:**
   ```bash
   sudo supervisorctl restart backend
   ```

**FATTO! Ora PayPal funziona!** ✅

---

### Metodo 2: Stripe (PIÙ PROFESSIONALE) 💳

#### Cosa fare:

1. **Crea account Stripe:**
   - Vai su [Stripe.com](https://stripe.com)
   - Clicca "Inizia ora"
   - Registrati con email
   - Compila i dati aziendali (ci vogliono 5 minuti)

2. **Prendi le chiavi:**
   - Vai su **Sviluppatori** → **Chiavi API**
   - Copia:
     - **Chiave pubblicabile** (inizia con `pk_live_...`)
     - **Chiave segreta** (inizia con `sk_live_...`)

3. **Metti le chiavi nel sito:**
   
   Apri `/app/backend/.env` e aggiungi:
   ```
   STRIPE_PUBLISHABLE_KEY=pk_live_tua_chiave
   STRIPE_SECRET_KEY=sk_live_tua_chiave
   ```

4. **Riavvia:**
   ```bash
   sudo supervisorctl restart backend
   ```

**FATTO! Ora Stripe funziona!** ✅

---

## 🎮 PARTE 4: AGGIUNGERE I TUOI ACCOUNT FORTNITE (15 minuti)

Adesso devi caricare gli account VERI che vuoi vendere!

### Come fare:

1. **Prepara un foglio Excel/Google Sheets** con:
   - Email account Fortnite
   - Password account
   - Quante skin ha
   - Quanti V-Bucks
   - Prezzo che vuoi
   - Screenshot del locker

2. **Carica le immagini:**
   - Vai su [Imgur.com](https://imgur.com) (gratis)
   - Carica screenshot degli account
   - Copia i link delle immagini

3. **Aggiungi account al database:**

   Crea un file chiamato `/app/backend/add_accounts.py`:
   ```python
   import asyncio
   from motor.motor_asyncio import AsyncIOMotorClient
   import os
   from dotenv import load_dotenv
   
   load_dotenv()
   
   async def aggiungi_account():
       client = AsyncIOMotorClient(os.environ['MONGO_URL'])
       db = client[os.environ['DB_NAME']]
       
       # CAMBIA QUESTI DATI CON I TUOI!
       account = {
           "id": "real_1",  # Un ID unico
           "title": "Account OG Season 1 - Renegade Raider",
           "price": 299.99,  # PREZZO VERO in euro
           "image": "https://i.imgur.com/TUAIMMAGINE.jpg",  # Link Imgur
           "images": [
               "https://i.imgur.com/IMG1.jpg",
               "https://i.imgur.com/IMG2.jpg"
           ],
           "skinsCount": 250,
           "rarity": ["Renegade Raider", "Black Knight"],
           "platform": ["PC", "PSN"],
           "fullAccess": True,
           "mailChangeable": True,
           "vBucks": 1500,
           "accountLevel": 432,
           "rareEmotes": 45,
           "createdDate": "2025-01-12",
           "description": "Account OG con Renegade Raider",
           # EMAIL E PASSWORD VERE DELL'ACCOUNT FORTNITE:
           "account_email": "emaildelaccount@gmail.com",
           "account_password": "PasswordSegreta123"
       }
       
       await db.fortnite_accounts.insert_one(account)
       print("✅ Account aggiunto!")
       
   asyncio.run(aggiungi_account())
   ```

4. **Esegui lo script:**
   ```bash
   cd /app/backend
   python add_accounts.py
   ```

**FATTO! Account caricato!** ✅

Ripeti per ogni account che vuoi vendere!

---

## 🗄️ PARTE 5: DATABASE VERO (20 minuti)

Il database è dove vengono salvati utenti, ordini e acquisti.

### Setup MongoDB Atlas (100% GRATIS):

#### Step by step:

1. **Vai su [MongoDB.com](https://www.mongodb.com/cloud/atlas/register)**
   - Clicca "Try Free"
   - Registrati con Google (più veloce)

2. **Crea un Cluster:**
   - Ti chiede "What are you building?" → Scegli "E-commerce"
   - Ti chiede il piano → Scegli **FREE** (M0 Sandbox)
   - Scegli regione → **Frankfurt** (più vicina all'Italia)
   - Nome cluster → `elitehub`
   - Clicca "Create Cluster"
   - Aspetta 3-5 minuti

3. **Crea un utente database:**
   - Vai su **Database Access** (menu a sinistra)
   - Clicca "Add New Database User"
   - Username: `elitehub_admin`
   - Password: Clicca "Autogenerate Secure Password" e COPIALA!
   - Clicca "Add User"

4. **Permetti l'accesso:**
   - Vai su **Network Access**
   - Clicca "Add IP Address"
   - Clicca "Allow Access from Anywhere"
   - Conferma

5. **Prendi il link di connessione:**
   - Vai su **Database** (menu a sinistra)
   - Clicca "Connect" sul tuo cluster
   - Clicca "Connect your application"
   - Copia la stringa tipo:
   ```
   mongodb+srv://elitehub_admin:<password>@elitehub.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - **IMPORTANTE:** Sostituisci `<password>` con la password che hai copiato prima!

6. **Metti il link nel sito:**
   
   Apri `/app/backend/.env` e modifica:
   ```
   MONGO_URL=mongodb+srv://elitehub_admin:TUA_PASSWORD@elitehub.xxxxx.mongodb.net/?retryWrites=true&w=majority
   DB_NAME=elitehub
   ```

7. **Riavvia tutto:**
   ```bash
   sudo supervisorctl restart backend
   ```

**FATTO! Database vero attivo!** ✅

---

## 🔒 PARTE 6: SICUREZZA (5 minuti)

Devi mettere una password segreta super forte!

### Cosa fare:

1. **Genera password segreta:**
   ```bash
   openssl rand -hex 32
   ```
   
   Questo ti darà una stringa tipo:
   ```
   a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
   ```

2. **Mettila nel file `.env`:**
   ```
   SECRET_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
   ```

3. **Riavvia:**
   ```bash
   sudo supervisorctl restart backend
   ```

**FATTO! Sito sicuro!** ✅

---

## 📧 PARTE 7: EMAIL AUTOMATICHE (Opzionale - 15 min)

Vuoi che il sito mandi email automatiche quando qualcuno compra?

### Setup SendGrid (GRATIS fino a 100 email/giorno):

1. **Vai su [SendGrid.com](https://signup.sendgrid.com)**
   - Registrati gratis
   - Conferma email

2. **Crea API Key:**
   - Vai su **Settings** → **API Keys**
   - Clicca "Create API Key"
   - Nome: "eliteHUB"
   - Permessi: "Full Access"
   - Copia la chiave (tipo: `SG.xxxx`)

3. **Aggiungi al sito:**
   ```
   # In /app/backend/.env
   SENDGRID_API_KEY=SG.tua_chiave
   SENDER_EMAIL=noreply@tuodominio.com
   ```

4. **Installa:**
   ```bash
   cd /app/backend
   pip install sendgrid
   pip freeze > requirements.txt
   sudo supervisorctl restart backend
   ```

**FATTO! Email automatiche attive!** ✅

---

## 🧪 PARTE 8: TESTARE TUTTO (10 minuti)

Prima di dire a tutti "il sito è pronto!", devi testarlo!

### Checklist Test:

#### ✅ Test 1: Registrazione
- Vai sul sito
- Clicca "Registrati"
- Crea un account con una TUA email VERA
- Controlla che arrivi nella casella

#### ✅ Test 2: Acquisto (con carta TEST)
- Cerca un account
- Clicca "Aggiungi al Carrello"
- Vai al carrello
- Scegli "Stripe"
- Usa questa carta TEST:
  ```
  Numero: 4242 4242 4242 4242
  Scadenza: 12/34
  CVV: 123
  ```
- Completa l'acquisto
- Vai su "Profilo"
- Controlla che vedi l'ordine

#### ✅ Test 3: Acquisto VERO (piccolo importo)
- Usa una carta VERA
- Compra l'account più economico (tipo €5)
- Verifica che i soldi arrivino su PayPal/Stripe
- Verifica che ricevi le credenziali

#### ✅ Test 4: Da cellulare
- Apri il sito dal telefono
- Prova tutto di nuovo
- Controlla che sia facile da usare

### Se tutto funziona → 🎉 SEI PRONTO!

---

## 🎉 PARTE 9: FAR CONOSCERE IL SITO

Ora che il sito funziona, devi farlo conoscere!

### Idee Gratis:

1. **TikTok:**
   - Crea video tipo "Guarda che account Fortnite ho trovato!"
   - Mostra gli account OG
   - Link in bio

2. **Instagram:**
   - Crea pagina @elitehub_fortnite
   - Posta screenshot degli account
   - Usa hashtag #Fortnite #FortniteOG #FortniteSkins

3. **Discord:**
   - Entra in server Fortnite italiani
   - Metti link nei canali "marketplace"
   - **ATTENZIONE:** Rispetta le regole del server!

4. **YouTube:**
   - Commenta video Fortnite
   - "Bellissimo video! Se cerchi account OG → elitehub.gg"

5. **Passa Parola:**
   - Dillo ai tuoi amici gamer
   - Offri sconto 10% ai primi 10 clienti

---

## 🆘 AIUTO! QUALCOSA NON FUNZIONA

### Problemi Comuni:

#### ❌ "Il sito non si apre"
**Soluzione:**
```bash
sudo supervisorctl status
# Se vedi "STOPPED" fai:
sudo supervisorctl start all
```

#### ❌ "PayPal/Stripe non funziona"
**Controlla:**
1. Hai messo le chiavi giuste in `.env`?
2. Hai riavviato con `sudo supervisorctl restart backend`?
3. Le chiavi sono quelle LIVE (non TEST)?

#### ❌ "Database non si connette"
**Controlla:**
1. Hai sostituito `<password>` con la password vera?
2. Hai permesso accesso da "Anywhere" su MongoDB Atlas?
3. La stringa MONGO_URL è corretta in `.env`?

#### ❌ "Gli utenti non vedono gli account"
**Soluzione:**
```bash
# Controlla se ci sono account nel database
cd /app/backend
python
>>> from motor.motor_asyncio import AsyncIOMotorClient
>>> import asyncio
>>> import os
>>> from dotenv import load_dotenv
>>> load_dotenv()
>>> async def check():
...     client = AsyncIOMotorClient(os.environ['MONGO_URL'])
...     db = client['elitehub']
...     count = await db.fortnite_accounts.count_documents({})
...     print(f"Account nel database: {count}")
>>> asyncio.run(check())
```

Se dice "0 account" → Devi aggiungere account (vedi PARTE 4)!

---

## 📊 PARTE 10: VEDERE QUANTI SOLDI FAI

### Dashboard Stripe:
- Vai su [dashboard.stripe.com](https://dashboard.stripe.com)
- Vedi tutti i pagamenti ricevuti
- Puoi trasferirli sul tuo conto

### Dashboard PayPal:
- Vai su [paypal.com](https://www.paypal.com)
- Clicca "Attività"
- Vedi tutti i pagamenti

### Google Analytics (per vedere visitatori):
1. Vai su [analytics.google.com](https://analytics.google.com)
2. Crea account
3. Aggiungi il tuo sito
4. Copia il codice
5. Mettilo in `/app/frontend/public/index.html`

---

## 🎯 RIASSUNTO VELOCE

### Cosa Hai Fatto:
1. ✅ Sito online su internet
2. ✅ Database vero per salvare tutto
3. ✅ PayPal/Stripe per ricevere soldi
4. ✅ Account Fortnite caricati
5. ✅ Tutto testato e funzionante

### Ora Puoi:
- 💰 Vendere account Fortnite
- 💳 Ricevere pagamenti veri
- 📱 Far comprare da telefono
- 📧 Mandare email automatiche
- 📊 Vedere statistiche vendite

### Prossimi Step:
1. Aggiungi più account
2. Fai pubblicità
3. Aspetta i primi clienti
4. PROFIT! 💰💰💰

---

## 🎮 DOMANDE FREQUENTI

**Q: Quanto ci vuole a vendere il primo account?**
A: Dipende dalla pubblicità che fai! Con TikTok/Instagram puoi vendere in 1-7 giorni.

**Q: È legale vendere account Fortnite?**
A: Tecnicamente va contro i ToS di Epic Games, ma tantissimi lo fanno. Sei responsabile tu.

**Q: Quanto posso guadagnare?**
A: Dipende dagli account! Un OG Season 1 può valere €200-500.

**Q: Devo pagare tasse?**
A: Se guadagni molto (>€5000/anno) dovresti aprire Partita IVA. Chiedi ai tuoi genitori!

**Q: Come evito truffe?**
A: 
- Usa SOLO PayPal/Stripe
- NON accettare pagamenti fuori dal sito
- Dai credenziali SOLO dopo pagamento confermato

**Q: Posso vendere anche V-Bucks?**
A: Sì! Aggiungi prodotti tipo "1000 V-Bucks" al database.

---

## 💡 CONSIGLI PRO

1. **Fai screenshot fighi:**
   - Usa sfondo scuro
   - Mostra le skin RARE in primo piano
   - Usa editor tipo Canva

2. **Prezzi giusti:**
   - Cerca altri siti simili
   - Metti prezzi competitivi
   - Fai sconti ai primi clienti

3. **Descrizioni belle:**
   - "Account RARISSIMO Season 1"
   - "Include Renegade Raider + Black Knight"
   - "Mail modificabile - FULL ACCESS"

4. **Rispondi veloce:**
   - Email clienti → Rispondi in max 1 ora
   - Domande → Sii gentile e chiaro

5. **Chiedi recensioni:**
   - Dopo vendita chiedi recensione
   - Pubblicale sul sito (aggiungi sezione)

---

## 🏆 HAI FINITO!

**COMPLIMENTI!** 🎉🎉🎉

Ora hai un marketplace VERO che funziona!

**Link utili da salvare:**
- Sito: `https://tuodominio.com` (o quello Emergent)
- Stripe: `https://dashboard.stripe.com`
- PayPal: `https://www.paypal.com`
- Database: `https://cloud.mongodb.com`
- Email: `elitehub.assistence@gmail.com`

**In bocca al lupo per le vendite!** 🚀💰

---

**P.S.** Se qualcosa non funziona, manda email a `elitehub.assistence@gmail.com` e ti aiutiamo! 😊
