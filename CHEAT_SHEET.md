# 📋 CHEAT SHEET - Comandi Rapidi eliteHUB

Stampa questo foglio e tienilo sulla scrivania! 🖨️

---

## 🚀 COMANDI BASE

### Controllare se il sito funziona
```bash
sudo supervisorctl status
```
**Output OK:** `backend RUNNING` e `frontend RUNNING`

### Riavviare tutto
```bash
sudo supervisorctl restart all
```

### Vedere gli errori
```bash
# Backend (server)
tail -f /var/log/supervisor/backend.err.log

# Frontend (sito)
tail -f /var/log/supervisor/frontend.out.log
```

---

## ⚙️ FILE IMPORTANTI

### File delle impostazioni (password, chiavi, ecc.)
```bash
nano /app/backend/.env
```

**Dentro trovi:**
- MONGO_URL = Dove sono salvati i dati
- SECRET_KEY = Password segreta del sito
- STRIPE_SECRET_KEY = Chiave Stripe
- PAYPAL_CLIENT_ID = Chiave PayPal

**Per salvare dopo modifiche:**
1. CTRL + X
2. Premi Y
3. Premi INVIO

---

## 💾 DATABASE

### Vedere quanti account hai
```bash
cd /app/backend
python3 << EOF
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
load_dotenv()

async def count():
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = client['elitehub']
    n = await db.fortnite_accounts.count_documents({})
    print(f"Account totali: {n}")
    
asyncio.run(count())
EOF
```

### Aggiungere UN account veloce
```bash
cd /app/backend
nano quick_add.py
```

**Incolla questo:**
```python
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
load_dotenv()

async def add():
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = client['elitehub']
    
    # MODIFICA QUESTI DATI!
    account = {
        "id": "acc_X",  # Cambia X con numero progressivo
        "title": "TITOLO ACCOUNT",
        "price": 99.99,  # PREZZO
        "image": "https://i.imgur.com/IMMAGINE.jpg",
        "images": ["https://i.imgur.com/IMG1.jpg"],
        "skinsCount": 100,
        "rarity": [],
        "platform": ["PC"],
        "fullAccess": True,
        "mailChangeable": True,
        "vBucks": 1000,
        "accountLevel": 200,
        "rareEmotes": 20,
        "createdDate": "2025-01-12",
        "description": "Descrizione account",
        "account_email": "email@account.com",
        "account_password": "password123"
    }
    
    await db.fortnite_accounts.insert_one(account)
    print("✅ Account aggiunto!")
    
asyncio.run(add())
```

**Salva ed esegui:**
```bash
python3 quick_add.py
```

---

## 🔧 PROBLEMI COMUNI

### Problema: "Sito non si apre"
```bash
# Controlla status
sudo supervisorctl status

# Se vedi STOPPED, fai:
sudo supervisorctl start all

# Aspetta 10 secondi e riprova
```

### Problema: "Pagamenti non funzionano"
```bash
# 1. Controlla le chiavi
nano /app/backend/.env

# 2. Verifica che ci siano:
STRIPE_SECRET_KEY=sk_live_...
PAYPAL_CLIENT_ID=...

# 3. Riavvia
sudo supervisorctl restart backend
```

### Problema: "Non vedo account sul sito"
```bash
# Controlla se ci sono account nel DB
cd /app/backend
python3 -c "
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
load_dotenv()

async def check():
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = client['elitehub']
    count = await db.fortnite_accounts.count_documents({})
    print(f'Account: {count}')
    
asyncio.run(check())
"
```

**Se dice 0 → Devi caricare account!**

---

## 📧 EMAIL E LINK

### Link del sito
```
https://fortnite-marketplace.preview.emergentagent.com
```

### Email supporto
```
elitehub.assistence@gmail.com
```

### PayPal ricevente
```
poz000@gmail.com
```

---

## 💰 CONTROLLARE GUADAGNI

### Stripe
1. Vai su: https://dashboard.stripe.com
2. Login
3. Vedi tutti i pagamenti

### PayPal  
1. Vai su: https://www.paypal.com
2. Login
3. Clicca "Attività"

---

## 🎯 BACKUP VELOCE

### Backup database (1 volta a settimana)
```bash
# Non serve fare nulla!
# MongoDB Atlas fa backup automatici
# Vai su: https://cloud.mongodb.com
# → Database → Backup
```

### Backup file importanti
```bash
# Copia il file .env
cp /app/backend/.env /app/backend/.env.backup

# Se serve ripristinare:
cp /app/backend/.env.backup /app/backend/.env
```

---

## 📊 STATISTICHE

### Vedere log accessi in tempo reale
```bash
tail -f /var/log/supervisor/backend.out.log
```

### Quante persone hanno visitato oggi
```bash
# Conta richieste API
grep "GET /api" /var/log/supervisor/backend.out.log | wc -l
```

---

## 🆘 NUMERI UTILI

**Se hai problemi:**
- 📧 Email: elitehub.assistence@gmail.com
- 💬 Stripe Support: dashboard.stripe.com/support  
- 💬 PayPal: 800-234-567
- 💬 MongoDB: cloud.mongodb.com/support

---

## ⚡ COMANDI SUPER VELOCI

```bash
# Riavvia tutto
sudo supervisorctl restart all

# Vedi se funziona
sudo supervisorctl status

# Vedi errori
tail /var/log/supervisor/backend.err.log

# Conta account
cd /app/backend && python3 -c "import asyncio; from motor.motor_asyncio import AsyncIOMotorClient; import os; from dotenv import load_dotenv; load_dotenv(); exec('async def c():\n client=AsyncIOMotorClient(os.environ[\"MONGO_URL\"])\n db=client[\"elitehub\"]\n n=await db.fortnite_accounts.count_documents({})\n print(f\"Account: {n}\")\nasyncio.run(c())')"
```

---

## 🎉 CHECKLIST GIORNALIERA

**Ogni mattina fai:**
- [ ] Controlla se sito funziona (apri il link)
- [ ] Controlla nuovi ordini (vai su dashboard Stripe/PayPal)
- [ ] Rispondi email clienti
- [ ] Posta 1 contenuto social

**Ogni settimana:**
- [ ] Aggiungi 2-3 nuovi account
- [ ] Controlla statistiche vendite
- [ ] Fai backup .env
- [ ] Aggiorna prezzi se serve

---

## 💡 TRUCCHI

### Cambiare prezzo velocemente
```bash
# Apri MongoDB Atlas
# → Browse Collections
# → fortnite_accounts
# → Trova account
# → Edit
# → Cambia "price"
# → Save
```

### Vedere ultimo ordine
```bash
# Vai su: https://dashboard.stripe.com
# Gli ordini sono in ordine dal più recente
```

### Vedere email clienti
```bash
# MongoDB Atlas
# → Browse Collections
# → users
# → Vedi tutte le email registrate
```

---

**🖨️ STAMPA QUESTO FOGLIO!**
**📌 APPENDILO VICINO AL PC!**

---

## 📞 REMEMBER

**Link sito:**
```
https://fortnite-marketplace.preview.emergentagent.com
```

**Password database:**
(Guarda in `/app/backend/.env` → MONGO_URL)

**Chiavi Stripe:**
(Guarda in `/app/backend/.env` → STRIPE_SECRET_KEY)

**Chiavi PayPal:**
(Guarda in `/app/backend/.env` → PAYPAL_CLIENT_ID)

---

**✅ Hai tutto quello che ti serve!**

In caso di PANICO 🚨 → Email a: elitehub.assistence@gmail.com
