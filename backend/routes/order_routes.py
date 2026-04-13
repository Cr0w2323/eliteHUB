from fastapi import APIRouter, HTTPException, Depends
from models import Order, OrderCreate, User, PurchasedAccount
from routes.auth_routes import get_current_user
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os
from typing import List

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

router = APIRouter(prefix="/api/orders", tags=["orders"])

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.post("/create", response_model=Order)
async def create_order(order_data: OrderCreate, current_user: User = Depends(get_current_user)):
    # Crea gli account Fortnite acquistati con credenziali REALI dal database
    purchased_accounts = []
    
    for item in order_data.items:
        # Recupera l'account REALE dal database con le credenziali
        account = await db.fortnite_accounts.find_one(
            {"id": item.account_id},
            {"_id": 0}
        )
        
        if not account:
            raise HTTPException(status_code=404, detail=f"Account {item.account_id} not found")
        
        # Usa le credenziali REALI dal database
        purchased_account = PurchasedAccount(
            account_id=item.account_id,
            title=item.title,
            image=item.image,
            skins_count=0,  # Info disponibile nel titolo
            vbucks=0,  # Info disponibile nel titolo
            account_email=account.get('account_email', 'N/A'),
            account_password=account.get('account_password', 'N/A')
        )
        purchased_accounts.append(purchased_account)
        
        # IMPORTANTE: Marca l'account come venduto per evitare vendite doppie
        await db.fortnite_accounts.update_one(
            {"id": item.account_id},
            {"$set": {"is_sold": True}}
        )
    
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
