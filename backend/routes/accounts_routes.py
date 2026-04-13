from fastapi import APIRouter
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os
from typing import List

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

router = APIRouter(prefix="/api", tags=["accounts"])

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("/accounts")
async def get_accounts():
    """Get all Fortnite accounts (credentials hidden until purchase, excludes sold accounts)"""
    # Mostra solo account NON venduti
    accounts = await db.fortnite_accounts.find(
        {"is_sold": False},
        {"_id": 0}
    ).to_list(1000)
    
    # SECURITY: Hide credentials from public listing
    for account in accounts:
        # Remove sensitive fields before returning
        account.pop('account_email', None)
        account.pop('account_password', None)
    
    return accounts

@router.get("/accounts/{account_id}")
async def get_account(account_id: str):
    """Get single Fortnite account by ID (credentials hidden until purchase)"""
    account = await db.fortnite_accounts.find_one({"id": account_id}, {"_id": 0})
    
    if not account:
        return None
    
    # SECURITY: Hide credentials from detail view
    account.pop('account_email', None)
    account.pop('account_password', None)
    
    return account
