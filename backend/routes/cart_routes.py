from fastapi import APIRouter, HTTPException, Depends
from models import CartItem, Cart, User
from routes.auth_routes import get_current_user
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os
from typing import List

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

router = APIRouter(prefix="/api/cart", tags=["cart"])

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("/", response_model=Cart)
async def get_cart(current_user: User = Depends(get_current_user)):
    cart = await db.carts.find_one({"user_id": current_user.id})
    if not cart:
        return Cart(user_id=current_user.id, items=[], total=0.0)
    return Cart(**cart)

@router.post("/add")
async def add_to_cart(item: CartItem, current_user: User = Depends(get_current_user)):
    cart = await db.carts.find_one({"user_id": current_user.id})
    
    if not cart:
        cart = Cart(user_id=current_user.id, items=[], total=0.0)
    else:
        cart = Cart(**cart)
    
    # Check if item already in cart
    existing_item = next((i for i in cart.items if i.account_id == item.account_id), None)
    if existing_item:
        raise HTTPException(status_code=400, detail="Item already in cart")
    
    cart.items.append(item)
    cart.total = sum(i.price for i in cart.items)
    
    await db.carts.update_one(
        {"user_id": current_user.id},
        {"$set": cart.dict()},
        upsert=True
    )
    
    return {"message": "Item added to cart", "cart": cart}

@router.delete("/remove/{account_id}")
async def remove_from_cart(account_id: str, current_user: User = Depends(get_current_user)):
    cart = await db.carts.find_one({"user_id": current_user.id})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    cart = Cart(**cart)
    cart.items = [i for i in cart.items if i.account_id != account_id]
    cart.total = sum(i.price for i in cart.items)
    
    await db.carts.update_one(
        {"user_id": current_user.id},
        {"$set": cart.dict()}
    )
    
    return {"message": "Item removed from cart", "cart": cart}

@router.delete("/clear")
async def clear_cart(current_user: User = Depends(get_current_user)):
    await db.carts.update_one(
        {"user_id": current_user.id},
        {"$set": {"items": [], "total": 0.0}}
    )
    return {"message": "Cart cleared"}
