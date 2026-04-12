from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

# Import routes
from routes import auth_routes, cart_routes, order_routes, payment_routes

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="eliteHUB API", version="1.0.0")

# Create a router with the /api prefix for basic routes
api_router = APIRouter(prefix="/api")

@api_router.get("/")
async def root():
    return {"message": "eliteHUB API v1.0", "status": "online"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

# Include all routers
app.include_router(api_router)
app.include_router(auth_routes.router)
app.include_router(cart_routes.router)
app.include_router(order_routes.router)
app.include_router(payment_routes.router)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
