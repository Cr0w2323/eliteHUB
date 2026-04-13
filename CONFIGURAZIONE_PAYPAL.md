# 💰 CONFIGURAZIONE PAYPAL REALE - poz000@gmail.com

## 🎯 PASSAGGI PER RICEVERE SOLDI VERI

### Step 1: Ottieni le Chiavi PayPal API (5 minuti)

1. **Vai su PayPal Developer:**
   - Apri: https://developer.paypal.com
   - Login con: **poz000@gmail.com**

2. **Crea App:**
   - Clicca "Dashboard" (menu in alto)
   - Clicca "My Apps & Credentials"
   - Vai su tab **"Live"** (NON Sandbox!)
   - Clicca "Create App"
   - Nome app: "eliteHUB"
   - Clicca "Create App"

3. **Copia le Chiavi:**
   Ti darà:
   ```
   Client ID (Live): AaBbCc123456...
   Secret (Live): XxYyZz789...
   ```
   
   **COPIA ENTRAMBE!**

---

### Step 2: Metti le Chiavi nel Sito

1. **Apri il file configurazione:**
   ```bash
   nano /app/backend/.env
   ```

2. **Modifica queste righe:**
   ```
   # PayPal Configuration - LIVE
   PAYPAL_EMAIL="poz000@gmail.com"
   PAYPAL_CLIENT_ID="METTI_QUI_CLIENT_ID_LIVE"
   PAYPAL_SECRET="METTI_QUI_SECRET_LIVE"
   PAYPAL_MODE="live"
   ```

3. **Salva:**
   - CTRL + X
   - Y
   - INVIO

4. **Riavvia:**
   ```bash
   sudo supervisorctl restart backend
   ```

---

### Step 3: Test con Soldi VERI (piccolo importo)

1. Vai sul sito
2. Compra un account da €39 (il più economico)
3. Paga con PayPal o carta
4. Controlla su https://www.paypal.com/activity
5. Dovresti vedere il pagamento!

---

## 🔐 NOTA IMPORTANTE

**ATTUALMENTE configurato:**
- PayPal Email: ✅ poz000@gmail.com
- Modalità: ⚠️ SANDBOX (test - non arrivano soldi veri)
- Client ID: ⚠️ "test" (devi sostituire con quello vero)

**Dopo aver fatto Step 1 e 2:**
- PayPal Email: ✅ poz000@gmail.com
- Modalità: ✅ LIVE (soldi VERI)
- Client ID: ✅ TUO_CLIENT_ID_VERO
- Secret: ✅ TUO_SECRET_VERO

---

## 💡 ALTERNATIVE VELOCI

### Se NON riesci a ottenere le chiavi PayPal:

**OPZIONE A: Usa solo Stripe**
- Più facile da configurare
- Soldi arrivano sul tuo conto bancario in 2-7 giorni
- Commissione: 2.9% + €0.25 per transazione

**OPZIONE B: PayPal.me link diretto**
- Gli utenti pagano su PayPal.me/poz000
- Poi tu mandi manualmente le credenziali
- Meno automatico ma funziona subito

---

## 📊 QUANTO GUADAGNI?

Con i prezzi attuali:
- 34x Ikonik (€105 cad) = €3,570
- 5x OG STW (€120 cad) = €600
- 5x Black Knight combo (€320 cad) = €1,600
- Altri accounts = €3,000+

**TOTALE POTENZIALE: ~€8,770** 💰💰💰

Commissione PayPal (2.9%): -€254
**NETTO: ~€8,516**

---

## 🚀 PRONTO!

Una volta configurato PayPal LIVE:
1. I clienti pagano
2. Soldi arrivano SUBITO su poz000@gmail.com
3. Account viene consegnato AUTOMATICAMENTE
4. PROFIT! 💰
