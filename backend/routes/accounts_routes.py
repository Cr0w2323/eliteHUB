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
    """Get all Fortnite accounts"""
    accounts = await db.fortnite_accounts.find({}).to_list(1000)
    
    # Convert MongoDB _id to string and return
    for account in accounts:
        if '_id' in account:
            account['_id'] = str(account['_id'])
    
    return accounts

@router.get("/accounts/{account_id}")
async def get_account(account_id: str):
    """Get single Fortnite account by ID"""
    account = await db.fortnite_accounts.find_one({"id": account_id})
    
    if not account:
        return None
    
    # Convert MongoDB _id to string
    if '_id' in account:
        account['_id'] = str(account['_id'])
    
    return account
