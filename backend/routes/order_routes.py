from fastapi import APIRouter, HTTPException, Depends
from models import Order, OrderCreate, User, PurchasedAccount
from routes.auth_routes import get_current_user
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os
from typing import List
import random
import string

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

router = APIRouter(prefix="/api/orders", tags=["orders"])

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

def generate_account_credentials():
    """Genera email e password per l'account Fortnite acquistato"""
    # Genera email random per l'account Fortnite
    random_chars = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
    email = f"fortnite_{random_chars}@elitehub.com"
    
    # Genera password sicura
    password = ''.join(random.choices(string.ascii_letters + string.digits + "!@#$%", k=16))
    
    return email, password

@router.post("/create", response_model=Order)
async def create_order(order_data: OrderCreate, current_user: User = Depends(get_current_user)):
    # Crea gli account Fortnite acquistati con credenziali
    purchased_accounts = []
    
    for item in order_data.items:
        email, password = generate_account_credentials()
        
        # Recupera i dettagli dell'account dal database mock
        # In produzione, questi dati verrebbero da un database reale
        purchased_account = PurchasedAccount(
            account_id=item.account_id,
            title=item.title,
            image=item.image,
            skins_count=random.randint(50, 500),  # Questi dati dovrebbero venire dal DB
            vbucks=random.randint(500, 3000),
            account_email=email,
            account_password=password
        )
        purchased_accounts.append(purchased_account)
    
    # Crea l'ordine
    order = Order(
        user_id=current_user.id,
        items=order_data.items,
        purchased_accounts=purchased_accounts,
        total=order_data.total,
        payment_method=order_data.payment_method,
        payment_intent_id=order_data.payment_intent_id,
        status="completed"
    )
    
    await db.orders.insert_one(order.dict())
    
    # Svuota il carrello
    await db.carts.update_one(
        {"user_id": current_user.id},
        {"$set": {"items": [], "total": 0.0}}
    )
    
    return order

@router.get("/", response_model=List[Order])
async def get_orders(current_user: User = Depends(get_current_user)):
    orders = await db.orders.find({"user_id": current_user.id}).sort("created_at", -1).to_list(1000)
    return [Order(**order) for order in orders]

@router.get("/{order_id}", response_model=Order)
async def get_order(order_id: str, current_user: User = Depends(get_current_user)):
    order = await db.orders.find_one({"id": order_id, "user_id": current_user.id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return Order(**order)
