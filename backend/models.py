from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
import uuid

# User Models
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    name: str
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    created_at: datetime

# Cart Models
class CartItem(BaseModel):
    account_id: str
    title: str
    price: float
    image: str

class Cart(BaseModel):
    user_id: str
    items: List[CartItem] = []
    total: float = 0.0

# Order Models
class OrderCreate(BaseModel):
    user_id: str
    items: List[CartItem]
    total: float
    payment_method: str
    payment_intent_id: Optional[str] = None

class PurchasedAccount(BaseModel):
    account_id: str
    title: str
    image: str
    skins_count: int
    vbucks: int
    account_email: str  # Email dell'account Fortnite
    account_password: str  # Password dell'account Fortnite

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    items: List[CartItem]
    purchased_accounts: List[PurchasedAccount] = []  # Account Fortnite acquistati
    total: float
    payment_method: str
    payment_intent_id: Optional[str] = None
    status: str = "completed"
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Payment Models
class PaymentIntent(BaseModel):
    amount: float
    currency: str = "eur"
    payment_method: str

class PayPalPayment(BaseModel):
    order_id: str
    amount: float
