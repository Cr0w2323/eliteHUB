import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def carica_tutti_accounts():
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = client[os.environ['DB_NAME']]
    
    # Prima cancelliamo gli account demo
    await db.fortnite_accounts.delete_many({})
    print("🗑️  Account demo rimossi")
    
    # LISTA COMPLETA ACCOUNT REALI
    accounts = [
        # === Merry mint axe inactive ===
        {
            "id": "acc_001",
            "title": "Merry Mint Axe Account - Inactive",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"],
            "rarity": ["Merry Mint Axe"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": "Account con Merry Mint Axe (inactive)",
            "account_email": "meinzer.kevin94@icloud.com",
            "account_password": "Hamsterbacke1"
        },
        {
            "id": "acc_002",
            "title": "Merry Mint Axe Account - Inactive",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"],
            "rarity": ["Merry Mint Axe"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": "Account con Merry Mint Axe (inactive)",
            "account_email": "jebuscrepes@gmail.com",
            "account_password": "Dariksdad1."
        },
        {
            "id": "acc_003",
            "title": "Merry Mint Axe Account - Inactive",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"],
            "rarity": ["Merry Mint Axe"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": "Account con Merry Mint Axe (inactive)",
            "account_email": "demasters313@gmail.com",
            "account_password": "14trulove"
        },
        {
            "id": "acc_004",
            "title": "Merry Mint Axe Account - Inactive",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"],
            "rarity": ["Merry Mint Axe"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": "Account con Merry Mint Axe (inactive)",
            "account_email": "adrielg616@gmail.com",
            "account_password": "Chiflada88"
        },
        {
            "id": "acc_005",
            "title": "Merry Mint Axe Account - Inactive",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"],
            "rarity": ["Merry Mint Axe"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": "Account con Merry Mint Axe (inactive)",
            "account_email": "adameczek84@icloud.com",
            "account_password": "22092007Aw"
        },
        
        # === Galaxy inactive ===
        {
            "id": "acc_006",
            "title": "Galaxy Skin Account - Inactive",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"],
            "rarity": ["Galaxy"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": "Account con Galaxy Skin (inactive)",
            "account_email": "georgerm2005@gmail.com",
            "account_password": "flappyboy1"
        },
        {
            "id": "acc_007",
            "title": "Galaxy Skin Account - Inactive",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"],
            "rarity": ["Galaxy"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": "Account con Galaxy Skin (inactive)",
            "account_email": "labrake.marcus@gmail.com",
            "account_password": "44Magnum"
        },
        {
            "id": "acc_008",
            "title": "Galaxy Skin Account - Inactive",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"],
            "rarity": ["Galaxy"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": "Account con Galaxy Skin (inactive)",
            "account_email": "jamiebutts999@gmail.com",
            "account_password": "tango2016"
        },
        
        # === 1 - 7K VBUCKS ===
        {
            "id": "acc_009",
            "title": "Account Premium V-Bucks",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80"],
            "rarity": [],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": True,
            "createdDate": "2025-01-12",
            "description": "Account con V-Bucks disponibili",
            "account_email": "sanchezmatias292@gmail.com",
            "account_password": "Genio2014!"
        },
        {
            "id": "acc_010",
            "title": "Account Premium V-Bucks",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80"],
            "rarity": [],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": True,
            "createdDate": "2025-01-12",
            "description": "Account con V-Bucks disponibili",
            "account_email": "hugo_89rc@hotmail.com",
            "account_password": "12345Hugo"
        },
        {
            "id": "acc_011",
            "title": "Account Premium V-Bucks",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80"],
            "rarity": [],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": True,
            "createdDate": "2025-01-12",
            "description": "Account con V-Bucks disponibili",
            "account_email": "brianjeong99@gmail.com",
            "account_password": "brianjeong1999"
        },
        {
            "id": "acc_012",
            "title": "Account Premium V-Bucks",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80"],
            "rarity": [],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": True,
            "createdDate": "2025-01-12",
            "description": "Account con V-Bucks disponibili",
            "account_email": "andrew.duyvestyn@gmail.com",
            "account_password": "Nothing123"
        },
        {
            "id": "acc_013",
            "title": "Account Premium V-Bucks",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80"],
            "rarity": [],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": True,
            "createdDate": "2025-01-12",
            "description": "Account con V-Bucks disponibili",
            "account_email": "cyrustyler@my.uri.edu",
            "account_password": "belancers1"
        },
        
        # === 200+ Skins ===
        {
            "id": "acc_014",
            "title": "Account Premium Collection",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80"],
            "rarity": [],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": True,
            "createdDate": "2025-01-12",
            "description": "Account con collezione skin premium",
            "account_email": "steveodcms@yahoo.com",
            "account_password": "Douglass2$"
        },
        
        # === Travis Scott inactive ===
        {
            "id": "acc_015",
            "title": "Travis Scott Account - Inactive",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80"],
            "rarity": ["Travis Scott"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": "Account con Travis Scott Skin (inactive)",
            "account_email": "dubdaddy11@gmail.com",
            "account_password": "hernandez81"
        },
        {
            "id": "acc_016",
            "title": "Travis Scott Account - Inactive",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80"],
            "rarity": ["Travis Scott"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": "Account con Travis Scott Skin (inactive)",
            "account_email": "efoulkes@live.co.uk",
            "account_password": "Ellis240299"
        },
        
        # === 200+ Skins inactive ===
        {
            "id": "acc_017",
            "title": "Premium Collection - Inactive",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80"],
            "rarity": [],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": "Account premium collection (inactive)",
            "account_email": "francoshade@yahoo.com",
            "account_password": "Memphis10"
        },
        {
            "id": "acc_018",
            "title": "Premium Collection - Inactive",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80"],
            "rarity": [],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": "Account premium collection (inactive)",
            "account_email": "jmorales.91291@gmail.com",
            "account_password": "Reaper3000"
        },
        {
            "id": "acc_019",
            "title": "Premium Collection - Inactive",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80"],
            "rarity": [],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": "Account premium collection (inactive)",
            "account_email": "eligold456@gmail.com",
            "account_password": "Echolincoln1"
        },
        {
            "id": "acc_020",
            "title": "Premium Collection - Inactive",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80"],
            "rarity": [],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": "Account premium collection (inactive)",
            "account_email": "cvincent9942@gmail.com",
            "account_password": "Familyof04!"
        },
        {
            "id": "acc_021",
            "title": "Premium Collection - Inactive",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80"],
            "rarity": [],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": "Account premium collection (inactive)",
            "account_email": "jbernardi2011@gmail.com",
            "account_password": "clk0203JAB"
        },
        
        # === OG stw ===
        {
            "id": "acc_022",
            "title": "OG Save The World Account",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80"],
            "rarity": ["OG STW"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": True,
            "createdDate": "2025-01-12",
            "description": "Account OG Save The World",
            "account_email": "buckoboy1194@me.com",
            "account_password": "Tavares352!"
        },
        {
            "id": "acc_023",
            "title": "OG Save The World Account",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80"],
            "rarity": ["OG STW"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": True,
            "createdDate": "2025-01-12",
            "description": "Account OG Save The World",
            "account_email": "king49a.ak@gmail.com",
            "account_password": "Di110n32"
        },
        {
            "id": "acc_024",
            "title": "OG Save The World Account",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80"],
            "rarity": ["OG STW"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": True,
            "createdDate": "2025-01-12",
            "description": "Account OG Save The World",
            "account_email": "ravenisagod@gmail.com",
            "account_password": "Sonodin3"
        },
        {
            "id": "acc_025",
            "title": "OG Save The World Account",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80"],
            "rarity": ["OG STW"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": True,
            "createdDate": "2025-01-12",
            "description": "Account OG Save The World",
            "account_email": "churchill5151@hotmail.com",
            "account_password": "sean5151"
        },
        {
            "id": "acc_026",
            "title": "OG Save The World Account",
            "price": 0,
            "image": "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80"],
            "rarity": ["OG STW"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": True,
            "createdDate": "2025-01-12",
            "description": "Account OG Save The World",
            "account_email": "agronom682009@yandex.ru",
            "account_password": "jnsrp468"
        },
    ]
    
    # Carica tutti gli account
    count = 0
    for account in accounts:
        await db.fortnite_accounts.insert_one(account)
        count += 1
        print(f"✅ {count}. Caricato: {account['title']} ({account['account_email']})")
    
    print(f"\n🎉 COMPLETATO! Caricati {count} account reali!")
    print(f"📊 Totale account nel database: {await db.fortnite_accounts.count_documents({})}")
    
if __name__ == "__main__":
    asyncio.run(carica_tutti_accounts())
