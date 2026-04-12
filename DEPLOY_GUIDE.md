# 🚀 Guida Completa: Rendere eliteHUB Pubblico

## 📋 Indice
1. [Preparazione Pre-Deploy](#1-preparazione-pre-deploy)
2. [Configurazione Dominio](#2-configurazione-dominio)
3. [Setup Database Produzione](#3-setup-database-produzione)
4. [Configurazione Pagamenti](#4-configurazione-pagamenti)
5. [Deploy su Emergent (Nativo)](#5-deploy-su-emergent-nativo)
6. [Deploy Alternativo (Vercel + Railway)](#6-deploy-alternativo-vercel--railway)
7. [Configurazione Email](#7-configurazione-email-opzionale)
8. [Testing Produzione](#8-testing-produzione)
9. [Manutenzione](#9-manutenzione)

---

## 1. Preparazione Pre-Deploy

### ✅ Checklist Essenziale

```bash
# 1. Verifica che tutto funzioni localmente
# Test il flusso completo:
# - Registrazione utente ✓
# - Login ✓
# - Aggiungi al carrello ✓
# - Checkout ✓
# - Visualizza cronologia acquisti ✓

# 2. Pulisci dati di test dal database
# (Se hai usato dati di test)
```

### 📝 File da Preparare

1. **Lista Account Fortnite Reali**
   - Crea un file CSV/JSON con i tuoi account reali da vendere
   - Formato: `id, title, price, skins_count, vbucks, email, password, images_urls`

2. **Immagini Account**
   - Screenshot degli account (locker, skins, stats)
   - Carica su servizio CDN (Cloudinary, AWS S3, ecc.)

---

## 2. Configurazione Dominio

### Opzione A: Dominio Personalizzato

1. **Acquista un dominio** (esempio: `elitehub.gg`, `elitehub.store`)
   - Provider consigliati: Namecheap, Cloudflare, GoDaddy

2. **Configura DNS:**
   ```
   Type: A
   Name: @
   Value: [IP del tuo server]
   TTL: Auto

   Type: CNAME  
   Name: www
   Value: elitehub.gg
   TTL: Auto
   ```

### Opzione B: Usa Subdomain Emergent
   - URL: `elitehub.preview.emergentagent.com` (già attivo)

---

## 3. Setup Database Produzione

### MongoDB Atlas (Consigliato - Gratuito fino a 512MB)

1. **Crea Account MongoDB Atlas:**
   - Vai su: https://www.mongodb.com/cloud/atlas/register
   - Crea cluster GRATUITO (M0)

2. **Ottieni Connection String:**
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/elitehub?retryWrites=true&w=majority
   ```

3. **Aggiorna Backend .env:**
   ```bash
   # File: /app/backend/.env
   MONGO_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/elitehub
   DB_NAME=elitehub
   SECRET_KEY=GENERA_UNA_CHIAVE_SICURA_QUI_64_CARATTERI
   ```

4. **Genera Secret Key Sicura:**
   ```bash
   openssl rand -hex 32
   # Copia l'output e usalo come SECRET_KEY
   ```

---

## 4. Configurazione Pagamenti

### 4.1 PayPal Business

1. **Crea Account PayPal Business:**
   - Vai su: https://www.paypal.com/it/business
   - Completa verifica business

2. **Ottieni Credenziali API:**
   - Dashboard → Sviluppatore → App & Credenziali
   - Crea App → Ottieni Client ID e Secret

3. **Aggiorna Backend:**
   ```bash
   # File: /app/backend/.env
   PAYPAL_CLIENT_ID=tu_client_id_qui
   PAYPAL_SECRET=tu_secret_qui
   PAYPAL_MODE=live  # 'sandbox' per test, 'live' per produzione
   ```

4. **Aggiorna routes/payment_routes.py:**
   ```python
   PAYPAL_EMAIL = "poz000@gmail.com"  # Tua email PayPal
   PAYPAL_CLIENT_ID = os.getenv("PAYPAL_CLIENT_ID")
   ```

### 4.2 Stripe

1. **Crea Account Stripe:**
   - Vai su: https://dashboard.stripe.com/register
   - Completa KYC (Know Your Customer)

2. **Ottieni Chiavi API:**
   - Dashboard → Sviluppatori → Chiavi API
   - **Chiave Pubblicabile:** `pk_live_xxxxx`
   - **Chiave Segreta:** `sk_live_xxxxx`

3. **Aggiorna Backend:**
   ```bash
   # File: /app/backend/.env
   STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
   STRIPE_SECRET_KEY=sk_live_xxxxx
   ```

4. **Installa Stripe SDK:**
   ```bash
   cd /app/backend
   pip install stripe
   pip freeze > requirements.txt
   ```

5. **Aggiorna payment_routes.py per usare Stripe reale:**
   ```python
   import stripe
   
   stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
   
   @router.post("/create-intent")
   async def create_payment_intent(payment_data: PaymentIntent):
       if payment_data.payment_method == "stripe":
           intent = stripe.PaymentIntent.create(
               amount=int(payment_data.amount * 100),  # Converti in centesimi
               currency=payment_data.currency,
               metadata={'integration_check': 'accept_a_payment'}
           )
           return {
               "client_secret": intent.client_secret,
               "payment_method": "stripe"
           }
   ```

---

## 5. Deploy su Emergent (Nativo)

### Metodo 1: Deploy Automatico

```bash
# Il tuo sito è già deployato su:
# https://fortnite-marketplace.preview.emergentagent.com

# Per rendere LIVE il deploy:
# 1. Vai su Emergent Dashboard
# 2. Clicca su "Deploy to Production"
# 3. Conferma
```

### Metodo 2: Verifica Manuale

```bash
# Controlla status servizi
sudo supervisorctl status

# Output atteso:
# backend    RUNNING   pid 12345
# frontend   RUNNING   pid 12346

# Restart se necessario
sudo supervisorctl restart all
```

---

## 6. Deploy Alternativo (Vercel + Railway)

### Frontend su Vercel

1. **Installa Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy Frontend:**
   ```bash
   cd /app/frontend
   
   # Login
   vercel login
   
   # Deploy
   vercel --prod
   
   # Imposta variabili ambiente:
   # REACT_APP_BACKEND_URL=https://tuo-backend.railway.app
   ```

### Backend su Railway

1. **Vai su Railway.app:**
   - https://railway.app
   - Connetti GitHub

2. **Crea Nuovo Progetto:**
   - New Project → Deploy from GitHub
   - Seleziona repository

3. **Configura Variabili:**
   ```
   MONGO_URL=mongodb+srv://...
   DB_NAME=elitehub
   SECRET_KEY=tua_chiave_sicura
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   PAYPAL_CLIENT_ID=...
   PORT=8001
   ```

4. **Deploy:**
   - Railway auto-deploya su push

---

## 7. Configurazione Email (Opzionale)

### Setup SendGrid per Email Ordini

1. **Crea Account SendGrid:**
   - https://signup.sendgrid.com

2. **Ottieni API Key:**
   ```bash
   # .env
   SENDGRID_API_KEY=SG.xxxxx
   SENDER_EMAIL=noreply@elitehub.gg
   ```

3. **Installa SendGrid:**
   ```bash
   pip install sendgrid
   pip freeze > requirements.txt
   ```

4. **Crea Email Service:**
   ```python
   # /app/backend/services/email_service.py
   from sendgrid import SendGridAPIClient
   from sendgrid.helpers.mail import Mail
   
   async def send_order_email(user_email, order_data):
       message = Mail(
           from_email='noreply@elitehub.gg',
           to_emails=user_email,
           subject='Il tuo ordine eliteHUB',
           html_content=f'''
           <h1>Ordine Confermato!</h1>
           <p>Account Email: {order_data['account_email']}</p>
           <p>Password: {order_data['account_password']}</p>
           '''
       )
       sg = SendGridAPIClient(os.environ['SENDGRID_API_KEY'])
       sg.send(message)
   ```

---

## 8. Testing Produzione

### Checklist Test Completo

```bash
# 1. Test Registrazione
# - Vai su /register
# - Crea account con email REALE
# - Verifica email di conferma (se implementata)

# 2. Test Acquisto DEMO (con Stripe Test)
# - Usa carta test: 4242 4242 4242 4242
# - CVV: 123, Data: 12/34
# - Completa checkout
# - Verifica ordine in /profile

# 3. Test Acquisto REALE (piccolo importo)
# - Usa carta reale
# - Acquista account più economico
# - Verifica ricezione credenziali

# 4. Test Mobile
# - Apri sito da smartphone
# - Verifica responsive
# - Test acquisto mobile

# 5. Test Pagamenti
# - PayPal: Verifica redirect e conferma
# - Stripe: Verifica 3D Secure
# - Carta: Verifica processing
```

---

## 9. Manutenzione

### Backup Database (Automatico)

```bash
# Configura backup automatici su MongoDB Atlas
# Dashboard → Backup → Enable Cloud Backup
# Frequenza: Giornaliera
# Retention: 7 giorni
```

### Monitoring

1. **Setup Uptime Monitor:**
   - UptimeRobot.com (Gratuito)
   - Monitora: https://elitehub.gg ogni 5 minuti

2. **Error Tracking:**
   - Sentry.io per errori frontend/backend
   
   ```bash
   # Frontend
   yarn add @sentry/react
   
   # Backend  
   pip install sentry-sdk
   ```

### Aggiornamenti Account

```python
# Script per aggiungere nuovi account al database
# /app/backend/scripts/add_accounts.py

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def add_account():
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = client[os.environ['DB_NAME']]
    
    account = {
        "id": "9",
        "title": "Nuovo Account OG",
        "price": 299.99,
        "image": "https://...",
        "skinsCount": 150,
        "vBucks": 1000,
        # ... altri campi
    }
    
    await db.accounts.insert_one(account)
    print("Account aggiunto!")

asyncio.run(add_account())
```

---

## 🎯 Lancio Ufficiale

### Pre-Launch Checklist

- [ ] Database produzione configurato
- [ ] Pagamenti Stripe/PayPal testati
- [ ] Account reali caricati nel DB
- [ ] Immagini caricate su CDN
- [ ] Email ordini funzionanti
- [ ] Termini di Servizio aggiornati
- [ ] Privacy Policy aggiunta
- [ ] Test completo flusso acquisto
- [ ] Backup automatici attivi
- [ ] Monitoring configurato
- [ ] Dominio personalizzato attivo
- [ ] SSL/HTTPS attivo
- [ ] Mobile responsive testato

### Marketing & SEO

1. **Google Analytics:**
   ```html
   <!-- In /app/frontend/public/index.html -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```

2. **Meta Tags SEO:**
   ```html
   <meta name="description" content="eliteHUB - Il marketplace #1 per account Fortnite OG verificati">
   <meta property="og:title" content="eliteHUB - Account Fortnite Premium">
   <meta property="og:image" content="https://elitehub.gg/og-image.jpg">
   ```

3. **Promozione:**
   - Social Media (Twitter, Instagram, TikTok)
   - Discord communities Fortnite
   - YouTube influencer gaming

---

## 🆘 Supporto

**Problemi Comuni:**

1. **Pagamenti non funzionano:**
   - Verifica chiavi API corrette
   - Controlla logs backend: `tail -f /var/log/supervisor/backend.err.log`

2. **Database non connette:**
   - Verifica MONGO_URL in .env
   - Controlla whitelist IP su MongoDB Atlas

3. **Frontend non carica:**
   - Verifica REACT_APP_BACKEND_URL
   - Rebuild: `cd /app/frontend && yarn build`

**Log Utili:**
```bash
# Backend
tail -f /var/log/supervisor/backend.err.log

# Frontend  
tail -f /var/log/supervisor/frontend.out.log

# MongoDB
# Vai su MongoDB Atlas Dashboard → Metrics
```

---

## 📞 Contatti

- **Email Supporto:** elitehub.assistence@gmail.com
- **PayPal Business:** poz000@gmail.com

---

**🎉 Congratulazioni! eliteHUB è pronto per andare LIVE!**
