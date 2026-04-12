# 🎬 VIDEO-GUIDA: eliteHUB in 1 ORA

## ⏱️ TIMELINE

```
0:00 - 0:05  → Intro
0:05 - 0:15  → Aprire Account
0:15 - 0:35  → Setup Pagamenti  
0:35 - 0:50  → Caricare Account
0:50 - 1:00  → Test e Lancio
```

---

## 🎬 MINUTO 0-5: INTRO

### Cosa faremo:
Trasformare eliteHUB da sito demo a marketplace VERO dove:
- ✅ Le persone possono COMPRARE account Fortnite
- ✅ I SOLDI arrivano a TE
- ✅ Gli account vengono consegnati AUTOMATICAMENTE

### Cosa ti serve:
1. Email Gmail
2. Telefono per SMS
3. 1 ora di tempo
4. (Opzionale) Carta di credito

**INIZIAMO!** 🚀

---

## 🎬 MINUTO 5-15: APRIRE ACCOUNT

### 📧 Step 1: Account Gmail Business (2 min)

1. Vai su [Gmail.com](https://gmail.com)
2. Clicca "Crea account"
3. Nome: "eliteHUB Support"
4. Email: `elitehub.official@gmail.com` (o simile)
5. Password forte
6. Numero telefono
7. **FATTO!**

### 💳 Step 2: Account PayPal Business (5 min)

1. Vai su [PayPal.com/it/business](https://www.paypal.com/it/business)
2. Clicca "Apri un conto Business"
3. Tipo attività: **"Vendita di prodotti online"**
4. Nome attività: **"eliteHUB"**
5. Categoria: **"Videogiochi e console"**
6. Inserisci:
   - Nome e Cognome
   - Indirizzo
   - Email (quella Gmail di prima)
   - Numero telefono
7. Conferma email (clicca link che ti arriva)
8. Conferma telefono (codice SMS)
9. **FATTO!**

💡 **NOTA:** PayPal è gratis, nessun costo mensile!

### 💰 Step 3: Account Stripe (5 min)

1. Vai su [Stripe.com](https://stripe.com/it)
2. Clicca "Inizia ora"
3. Email: (la stessa di prima)
4. Password
5. Ti chiede dati azienda:
   - **Nome:** eliteHUB
   - **Tipo:** Ditta individuale
   - **Settore:** Gaming / E-commerce
   - **Paese:** Italia
6. Dati personali:
   - Nome cognome
   - Data nascita
   - Indirizzo
   - Codice fiscale
7. **FATTO!**

⚠️ **IMPORTANTE:** Stripe chiede verifica identità (carta identità/patente). Scansiona e carica quando te lo chiede.

### ✅ CHECKPOINT - Hai ora:
- [ ] Email business
- [ ] Account PayPal Business
- [ ] Account Stripe

---

## 🎬 MINUTO 15-35: SETUP PAGAMENTI

### 🔑 Step 4: Prendere le Chiavi PayPal (8 min)

1. Apri [PayPal.com](https://paypal.com) e fai login
2. Clicca **Impostazioni** (⚙️ in alto a destra)
3. Vai su **Account**
4. Scroll fino a **Accesso API**
5. Clicca **Aggiorna** su "Accesso API NVP/SOAP"
6. Clicca **Gestisci credenziali API**
7. Scegli **Richiedi credenziali di firma API**
8. Ti dà 3 cose:
   ```
   Nome utente API:xxxxxxx
   Password API: yyyyyyy
   Firma: zzzzzzz
   ```
9. **COPIA** tutte e 3 e salvale in un file .txt

**ALTERNATIVA PIÙ FACILE:**
1. Vai su [Developer.PayPal.com](https://developer.paypal.com)
2. Fai login
3. Vai su **Dashboard**
4. Clicca **My Apps & Credentials**
5. Clicca **Create App**
6. Nome app: "eliteHUB"
7. Ti dà:
   ```
   Client ID: AbCdEf12345...
   Secret: XyZ98765...
   ```
8. **COPIA** entrambe

### 🔑 Step 5: Prendere le Chiavi Stripe (5 min)

1. Apri [Dashboard.Stripe.com](https://dashboard.stripe.com)
2. Fai login
3. Clicca **Sviluppatori** (menu a sinistra)
4. Clicca **Chiavi API**
5. Vedi 2 chiavi:
   ```
   Chiave pubblicabile: pk_live_51ABC...
   Chiave segreta: sk_live_51XYZ...
   ```
6. Clicca **👁️ Rivela la chiave** sulla chiave segreta
7. **COPIA** entrambe e salvale

### 💾 Step 6: Mettere le Chiavi nel Sito (7 min)

Ora devi dire al sito di usare QUESTE chiavi!

1. **Apri il file delle impostazioni:**
   ```bash
   nano /app/backend/.env
   ```

2. **Trova queste righe** e MODIFICALE:
   ```
   # CAMBIA QUESTI CON I TUOI!
   PAYPAL_CLIENT_ID=IL_TUO_CLIENT_ID_QUI
   PAYPAL_SECRET=IL_TUO_SECRET_QUI
   PAYPAL_MODE=live
   
   STRIPE_PUBLISHABLE_KEY=pk_live_TUA_CHIAVE
   STRIPE_SECRET_KEY=sk_live_TUA_CHIAVE
   ```

3. **Salva:**
   - Premi `CTRL + X`
   - Premi `Y`
   - Premi `INVIO`

4. **Riavvia il sito:**
   ```bash
   sudo supervisorctl restart backend
   ```

5. **Aspetta 10 secondi**

6. **Verifica che funzioni:**
   ```bash
   tail -n 20 /var/log/supervisor/backend.out.log
   ```
   
   Devi vedere:
   ```
   INFO: Uvicorn running on http://0.0.0.0:8001
   ```

### ✅ CHECKPOINT - Pagamenti Configurati!
- [ ] Chiavi PayPal copiate
- [ ] Chiavi Stripe copiate
- [ ] File .env aggiornato
- [ ] Backend riavviato

---

## 🎬 MINUTO 35-50: CARICARE ACCOUNT

### 📸 Step 7: Preparare Immagini (5 min)

Per ogni account Fortnite che vuoi vendere:

1. **Fai screenshot:**
   - Schermata locker (tutte le skin)
   - Skin rare in dettaglio
   - Stats (livello, V-Bucks)
   - Battle Pass (se hai)

2. **Carica su Imgur:**
   - Vai su [Imgur.com](https://imgur.com)
   - Clicca "New post"
   - Trascina le immagini
   - Clicca "Upload"
   - Copia i link (tipo: `https://i.imgur.com/AbCdE12.jpg`)

3. **Crea un file Excel** con:
   ```
   Email Account | Password | Skins | V-Bucks | Prezzo | Link Immagini
   ```

### 💾 Step 8: Caricare nel Database (10 min)

1. **Crea il file di caricamento:**
   ```bash
   nano /app/backend/add_my_accounts.py
   ```

2. **Copia e incolla questo** (poi modificherai):
   ```python
   import asyncio
   from motor.motor_asyncio import AsyncIOMotorClient
   import os
   from dotenv import load_dotenv
   from pathlib import Path
   
   ROOT_DIR = Path(__file__).parent
   load_dotenv(ROOT_DIR / '.env')
   
   async def aggiungi_accounts():
       client = AsyncIOMotorClient(os.environ['MONGO_URL'])
       db = client[os.environ['DB_NAME']]
       
       # LISTA DEI TUOI ACCOUNT
       accounts = [
           {
               "id": "account_1",
               "title": "Account OG Season 1 - Renegade Raider + Black Knight",
               "price": 299.99,  # PREZZO IN EURO
               "image": "https://i.imgur.com/TUA_IMG.jpg",
               "images": [
                   "https://i.imgur.com/IMG1.jpg",
                   "https://i.imgur.com/IMG2.jpg",
                   "https://i.imgur.com/IMG3.jpg"
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
               "description": "Account OG Season 1 con skin rarissime Renegade Raider e Black Knight. Full Access, mail modificabile. Oltre 250 skins totali!",
               "account_email": "email_vera_account@gmail.com",
               "account_password": "PasswordVera123"
           },
           # COPIA E INCOLLA QUESTO BLOCCO PER OGNI ACCOUNT
           {
               "id": "account_2",
               "title": "Account Travis Scott + 180 Skins",
               "price": 199.99,
               # ... altri dati
           }
       ]
       
       # Carica tutti gli account
       for account in accounts:
           await db.fortnite_accounts.insert_one(account)
           print(f"✅ Caricato: {account['title']}")
       
       print(f"\n🎉 Tutti gli account caricati! Totale: {len(accounts)}")
       
   asyncio.run(aggiungi_accounts())
   ```

3. **MODIFICA IL FILE** con i TUOI dati:
   - Cambia i titoli
   - Cambia i prezzi
   - Metti i link delle TUE immagini
   - Metti email/password VERE degli account

4. **Salva:**
   - `CTRL + X` → `Y` → `INVIO`

5. **Esegui:**
   ```bash
   cd /app/backend
   python add_my_accounts.py
   ```

6. **Dovresti vedere:**
   ```
   ✅ Caricato: Account OG Season 1...
   ✅ Caricato: Account Travis Scott...
   🎉 Tutti gli account caricati! Totale: 2
   ```

### ✅ CHECKPOINT - Account Caricati!
- [ ] Immagini su Imgur
- [ ] File add_my_accounts.py creato
- [ ] Script eseguito con successo
- [ ] Account visibili sul sito

**VERIFICA:** Apri il sito e vedi se ci sono i tuoi account!

---

## 🎬 MINUTO 50-60: TEST E LANCIO

### 🧪 Step 9: Test Acquisto (5 min)

**Test con carta FALSA:**

1. Vai sul sito
2. Registrati con email VERA
3. Aggiungi un account al carrello
4. Vai al checkout
5. Scegli "Stripe"
6. Usa carta test:
   ```
   Numero: 4242 4242 4242 4242
   Scadenza: 12/34
   CVV: 123
   Nome: Test User
   ```
7. Clicca "Paga"
8. Vai su **Profilo**
9. Vedi l'ordine con email/password account?

**✅ SE SÌ = Tutto funziona!**
**❌ SE NO = Controlla i log:**
```bash
tail -f /var/log/supervisor/backend.err.log
```

### 💰 Step 10: Test Acquisto VERO (2 min)

**ATTENZIONE:** Questo usa soldi VERI!

1. Crea un account ECONOMICO (tipo €5-10)
2. Compralo con la TUA carta VERA
3. Vai su [Dashboard.Stripe.com](https://dashboard.stripe.com)
4. Vedi il pagamento?
5. I soldi sono lì?

**✅ FUNZIONA = Sei pronto!**

### 📢 Step 11: Pubblicità (3 min)

**Condividi il link:**

1. **WhatsApp:**
   - Manda ai tuoi amici gamer
   - "Hey, ho aperto un sito di account Fortnite! → [link]"

2. **Instagram Story:**
   - Screenshot di un account figo
   - "Swipe up per comprare!" (se hai >10k follower)
   - O "Link in bio!"

3. **TikTok:**
   - Video 15 secondi:
     - "Ho appena trovato account Fortnite PAZZESCHI"
     - Mostra screenshot
     - "Link in bio"

4. **Discord:**
   - Entra in server Fortnite
   - Cerca canale "marketplace" o "trading"
   - Posta: "Account OG in vendita! → [link]"

---

## 🎉 HAI FINITO! RECAP VELOCE

### Cosa hai fatto:
1. ✅ Aperto account PayPal Business
2. ✅ Aperto account Stripe  
3. ✅ Configurato pagamenti
4. ✅ Caricato account Fortnite
5. ✅ Testato tutto
6. ✅ Iniziato pubblicità

### Il tuo sito ORA:
- ✅ È ONLINE
- ✅ Accetta PAGAMENTI VERI
- ✅ Consegna AUTOMATICAMENTE
- ✅ Guadagni SOLDI VERI

### Prossimi passi:
1. Carica più account
2. Fai più pubblicità
3. Rispondi alle domande clienti
4. **PROFIT!** 💰💰💰

---

## 🎯 PRIMI 3 GIORNI

### Giorno 1 (Oggi):
- [x] Setup tutto
- [ ] Carica almeno 5 account
- [ ] Fai 1 post Instagram
- [ ] Fai 1 TikTok

### Giorno 2:
- [ ] Controlla se hai vendite
- [ ] Rispondi alle domande
- [ ] Fai 2 TikTok
- [ ] Condividi su Discord

### Giorno 3:
- [ ] Analizza cosa vende di più
- [ ] Aggiungi account simili
- [ ] Inizia a fare pubblicità a pagamento (€5/giorno)

---

## 💡 TRUCCHI PRO

### Trucco #1: Prezzi Psicologici
❌ €300
✅ €299.99

Sembra molto meno!

### Trucco #2: Scarsità
"Solo 3 disponibili!"
"Scade tra 24 ore!"

### Trucco #3: Bundle
"Compra 2 account → Sconto 20%"

### Trucco #4: Garanzia
"Garanzia 7 giorni o rimborso!"

Aumenta trust!

### Trucco #5: Testimonianze
Chiedi ai primi clienti:
"Ciao! Se sei soddisfatto, mi faresti una recensione? Ti faccio 10% sconto sul prossimo!"

---

## ❓ FAQ EXPRESS

**Q: Quando arrivano i soldi?**
A: Stripe → 2-7 giorni sul conto. PayPal → Subito.

**Q: E se qualcuno fa chargeback?**
A: Hai le prove (email automatica con credenziali). Contatta Stripe/PayPal.

**Q: Posso vendere da minorenne?**
A: Serve consenso genitori. Usa i loro dati.

**Q: Quanti account devo caricare?**
A: Minimo 10 per iniziare. Più ne hai, meglio è!

**Q: Quanto guadagno per account?**
A: Dipende! OG = €200-500. Normali = €20-100.

---

## 📱 NUMERI UTILI

**Support:**
- Email: elitehub.assistence@gmail.com
- PayPal Help: 800-234-567
- Stripe Support: dashboard.stripe.com/support

**Dashboard:**
- Sito: https://fortnite-marketplace.preview.emergentagent.com
- Stripe: https://dashboard.stripe.com
- PayPal: https://www.paypal.com
- MongoDB: https://cloud.mongodb.com

---

## 🏁 CONCLUSIONE

**IN 1 ORA HAI:**
✅ Marketplace funzionante
✅ Pagamenti configurati
✅ Primi account caricati
✅ Pronto a vendere

**ORA DIPENDE DA TE!**

Più pubblicità fai = Più vendi = Più guadagni! 💰

**BUONA FORTUNA!** 🚀🎮

---

**P.S.** Salva questa guida! La rileggerai! 😉
