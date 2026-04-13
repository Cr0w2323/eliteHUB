from fastapi import APIRouter, HTTPException, Depends
from models import PaymentIntent, User
from routes.auth_routes import get_current_user
import os

router = APIRouter(prefix="/api/payments", tags=["payments"])

# Configurazione PayPal
PAYPAL_EMAIL = os.getenv("PAYPAL_EMAIL", "poz000@gmail.com")
PAYPAL_CLIENT_ID = os.getenv("PAYPAL_CLIENT_ID", "test")
PAYPAL_MODE = os.getenv("PAYPAL_MODE", "sandbox")

# Per Stripe, in modalità test
STRIPE_PUBLISHABLE_KEY = os.getenv("STRIPE_PUBLISHABLE_KEY", "pk_test_demo")
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "sk_test_demo")

@router.get("/config")
async def get_payment_config():
    """Ritorna la configurazione per i pagamenti frontend"""
    return {
        "stripe": {
            "publishable_key": STRIPE_PUBLISHABLE_KEY
        },
        "paypal": {
            "client_id": PAYPAL_CLIENT_ID,
            "email": PAYPAL_EMAIL
        }
    }

@router.post("/create-intent")
async def create_payment_intent(
    payment_data: PaymentIntent,
    current_user: User = Depends(get_current_user)
):
    """Crea un payment intent per Stripe o PayPal"""
    
    if payment_data.payment_method == "stripe":
        # In modalità demo, ritorniamo un intent fittizio
        # In produzione, qui useresti stripe.PaymentIntent.create()
        return {
            "client_secret": "demo_secret_" + str(int(payment_data.amount * 100)),
            "payment_method": "stripe",
            "status": "requires_payment_method"
        }
    
    elif payment_data.payment_method == "paypal":
        # Per PayPal, ritorniamo la configurazione
        return {
            "paypal_email": PAYPAL_EMAIL,
            "amount": payment_data.amount,
            "currency": payment_data.currency,
            "payment_method": "paypal"
        }
    
    elif payment_data.payment_method == "card":
        # Pagamento diretto con carta (demo)
        return {
            "payment_method": "card",
            "status": "success",
            "amount": payment_data.amount
        }
    
    else:
        raise HTTPException(status_code=400, detail="Invalid payment method")

@router.post("/confirm")
async def confirm_payment(
    payment_intent_id: str,
    current_user: User = Depends(get_current_user)
):
    """Conferma il pagamento"""
    # In modalità demo, confermiamo sempre
    # In produzione, qui verificheresti lo stato del pagamento con Stripe/PayPal
    
    return {
        "status": "succeeded",
        "payment_intent_id": payment_intent_id
    }
