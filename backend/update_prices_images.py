import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Immagini generiche gaming/fortnite
GAMING_IMAGES = [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",  # Gaming setup
    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",  # Controller purple
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",  # Gaming neon
    "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",  # Keyboard RGB
    "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",  # Controller close
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",  # Gaming headset
    "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80",  # RGB setup
    "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&q=80",  # Gaming monitor
    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",  # VR gaming
]

async def aggiorna_prezzi_e_immagini():
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = client[os.environ['DB_NAME']]
    
    # Definisci prezzi basati sulla rarità
    prezzi = {
        "Merry Mint Axe": 65,
        "Galaxy": 95,
        "Travis Scott": 125,
        "Ikonik": 175,
        "OG STW": 120,
        "Black Knight": 250,
        "Renegade Raider": 280,
        "The Reaper": 200,
        "Double Helix": 85,
        "Neo Versa": 90,
        "Havoc": 70,
        "Rogue Agent": 60,
        "Blue Team Leader": 55,
    }
    
    # Prendi tutti gli account
    accounts = await db.fortnite_accounts.find({}).to_list(1000)
    
    count = 0
    for account in accounts:
        # Assegna immagine generica casuale
        img_index = count % len(GAMING_IMAGES)
        new_image = GAMING_IMAGES[img_index]
        
        # Calcola prezzo basato sulla rarità
        prezzo = 45  # Prezzo base
        
        if account.get('rarity'):
            for rare in account['rarity']:
                if rare in prezzi:
                    if prezzi[rare] > prezzo:
                        prezzo = prezzi[rare]
        
        # Se ha Black Knight + altri, aumenta
        if account.get('rarity'):
            if "Black Knight" in account['rarity'] and "Galaxy" in account['rarity']:
                prezzo = 320
            elif "OG STW" in account['rarity'] and len(account['rarity']) > 1:
                prezzo = 180
        
        # Titoli speciali
        if "inactive" in account['title'].lower():
            prezzo = int(prezzo * 0.6)  # Sconta 40% per inactive
        
        if "Premium" in account['title'] and not account.get('rarity'):
            prezzo = 55
        
        if "Mystery Box" in account['title']:
            prezzo = 75
        
        # Aggiorna database
        await db.fortnite_accounts.update_one(
            {"_id": account["_id"]},
            {"$set": {
                "image": new_image,
                "images": [new_image],
                "price": prezzo
            }}
        )
        
        count += 1
        print(f"✅ {count}. Aggiornato: {account['title'][:50]} → €{prezzo} + immagine generica")
    
    print(f"\n🎉 COMPLETATO! Aggiornati {count} account con prezzi reali e immagini generiche!")

if __name__ == "__main__":
    asyncio.run(aggiorna_prezzi_e_immagini())
