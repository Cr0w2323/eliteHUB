import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def aggiorna_accounts_fncrib_realistic():
    """
    Aggiorna il database con account realistici in stile fncrib.com:
    - Prezzi reali da fncrib ($9.99, $7.99, $12.99, ecc.)
    - Immagini multiple per ogni account (locker screenshots, inventory, skin specifiche)
    - Account venduti rimossi automaticamente dal marketplace
    """
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = client[os.environ['DB_NAME']]
    
    # Svuota collezione esistente
    await db.fortnite_accounts.delete_many({})
    print("🗑️  Database pulito")
    
    # IMMAGINI MULTIPLE PER CATEGORIA (stile fncrib - locker screenshots)
    # Ogni account avrà 3-4 immagini: main skin + inventory views
    
    travis_scott_images = [
        "https://fortnite-api.com/images/cosmetics/br/cid_342_athena_commando_m_streetracermetallic/icon.png",
        "https://fortnite-api.com/images/cosmetics/br/cid_342_athena_commando_m_streetracermetallic/featured.png",
        "https://fortnite-api.com/images/cosmetics/br/bid_144_streetracermetallic/icon.png",
        "https://fortnite-api.com/images/cosmetics/br/pickaxe_id_150_streetracer/icon.png"
    ]
    
    galaxy_images = [
        "https://fortnite-api.com/images/cosmetics/br/cid_175_athena_commando_m_celestial/icon.png",
        "https://fortnite-api.com/images/cosmetics/br/cid_175_athena_commando_m_celestial/featured.png",
        "https://fortnite-api.com/images/cosmetics/br/bid_105_celestial/icon.png",
        "https://fortnite-api.com/images/cosmetics/br/pickaxe_id_116_celestial/icon.png"
    ]
    
    merry_mint_images = [
        "https://fortnite-api.com/images/cosmetics/br/pickaxe_id_116_holidaymint/icon.png",
        "https://fortnite-api.com/images/cosmetics/br/pickaxe_id_116_holidaymint/featured.png",
        "https://fortnite-api.com/images/cosmetics/br/cid_028_athena_commando_f/icon.png",
        "https://fortnite-api.com/images/cosmetics/br/cid_030_athena_commando_m_halloween/icon.png"
    ]
    
    vbucks_images = [
        "https://fortnite-api.com/images/cosmetics/br/cid_619_athena_commando_f_techllama/icon.png",
        "https://fortnite-api.com/images/cosmetics/br/cid_748_athena_commando_f_clownboa/icon.png",
        "https://fortnite-api.com/images/cosmetics/br/cid_780_athena_commando_m_dino/icon.png",
        "https://fortnite-api.com/images/cosmetics/br/cid_691_athena_commando_m_sushi/icon.png"
    ]
    
    premium_collection_images = [
        "https://fortnite-api.com/images/cosmetics/br/cid_434_athena_commando_f_stealthhonor/icon.png",
        "https://fortnite-api.com/images/cosmetics/br/cid_028_athena_commando_f/icon.png",
        "https://fortnite-api.com/images/cosmetics/br/cid_030_athena_commando_m_halloween/icon.png",
        "https://fortnite-api.com/images/cosmetics/br/cid_313_athena_commando_m_kpopfashion/icon.png"
    ]
    
    og_stw_images = [
        "https://fortnite-api.com/images/cosmetics/br/cid_660_athena_commando_f_bandageninjablue/icon.png",
        "https://fortnite-api.com/images/cosmetics/br/cid_a_272_athena_commando_f_prime/icon.png",
        "https://fortnite-api.com/images/cosmetics/br/cid_352_athena_commando_m_retro/icon.png",
        "https://fortnite-api.com/images/cosmetics/br/cid_479_athena_commando_f_davinci/icon.png"
    ]
    
    # LISTA ACCOUNT CON PREZZI REALISTICI FNCRIB (in USD convertiti a EUR)
    # Prezzi fncrib: Travis Scott $9.99, Galaxy $7.99, Merry Mint $12.99, 200+ Skins $8.99
    accounts_data = [
        # === Merry mint axe inactive === ($12.99 = €11.99)
        {"title": "=== Merry Mint Axe [Inactive] ===", "price": 11.99, "images": merry_mint_images, "email": "meinzer.kevin94@icloud.com", "password": "Hamsterbacke1", "rarity": ["Merry Mint Axe"], "platform": ["PC", "PSN"]},
        {"title": "=== Merry Mint Axe [Inactive] ===", "price": 11.99, "images": merry_mint_images, "email": "jebuscrepes@gmail.com", "password": "Dariksdad1.", "rarity": ["Merry Mint Axe"], "platform": ["PC", "PSN"]},
        {"title": "=== Merry Mint Axe [Inactive] ===", "price": 11.99, "images": merry_mint_images, "email": "demasters313@gmail.com", "password": "14trulove", "rarity": ["Merry Mint Axe"], "platform": ["PC", "PSN"]},
        {"title": "=== Merry Mint Axe [Inactive] ===", "price": 11.99, "images": merry_mint_images, "email": "adrielg616@gmail.com", "password": "Chiflada88", "rarity": ["Merry Mint Axe"], "platform": ["PC", "PSN"]},
        {"title": "=== Merry Mint Axe [Inactive] ===", "price": 11.99, "images": merry_mint_images, "email": "adameczek84@icloud.com", "password": "22092007Aw", "rarity": ["Merry Mint Axe"], "platform": ["PC", "PSN"]},
        
        # === Galaxy inactive === ($7.99 = €7.49)
        {"title": "=== Galaxy Skin [Inactive] ===", "price": 7.49, "images": galaxy_images, "email": "georgerm2005@gmail.com", "password": "flappyboy1", "rarity": ["Galaxy"], "platform": ["PC", "PSN"]},
        {"title": "=== Galaxy Skin [Inactive] ===", "price": 7.49, "images": galaxy_images, "email": "labrake.marcus@gmail.com", "password": "44Magnum", "rarity": ["Galaxy"], "platform": ["PC", "PSN"]},
        {"title": "=== Galaxy Skin [Inactive] ===", "price": 7.49, "images": galaxy_images, "email": "jamiebutts999@gmail.com", "password": "tango2016", "rarity": ["Galaxy"], "platform": ["PC", "PSN"]},
        
        # === 1 - 7K VBUCKS === (€4.99-€6.99 per vbucks accounts)
        {"title": "=== [PC/PSN] | 7K VBUCKS | Full Access ===", "price": 6.99, "images": vbucks_images, "email": "sanchezmatias292@gmail.com", "password": "Genio2014!", "rarity": [], "platform": ["PC", "PSN"]},
        {"title": "=== [PC/PSN] | 6.5K VBUCKS | Full Access ===", "price": 6.49, "images": vbucks_images, "email": "hugo_89rc@hotmail.com", "password": "12345Hugo", "rarity": [], "platform": ["PC", "PSN"]},
        {"title": "=== [PC/PSN] | 5K VBUCKS | Full Access ===", "price": 5.99, "images": vbucks_images, "email": "brianjeong99@gmail.com", "password": "brianjeong1999", "rarity": [], "platform": ["PC", "PSN"]},
        {"title": "=== [PC/PSN] | 4K VBUCKS | Full Access ===", "price": 5.49, "images": vbucks_images, "email": "andrew.duyvestyn@gmail.com", "password": "Nothing123", "rarity": [], "platform": ["PC", "PSN"]},
        {"title": "=== [PC/PSN] | 3.5K VBUCKS | Full Access ===", "price": 4.99, "images": vbucks_images, "email": "cyrustyler@my.uri.edu", "password": "belancers1", "rarity": [], "platform": ["PC", "PSN"]},
        
        # === 200+ Skins === ($8.99 = €8.49)
        {"title": "=== [PC/PSN] | 200+ Skins | Premium Collection ===", "price": 8.49, "images": premium_collection_images, "email": "steveodcms@yahoo.com", "password": "Douglass2$", "rarity": [], "platform": ["PC", "PSN"]},
        
        # === Travis Scott inactive === ($9.99 = €9.49)
        {"title": "=== Travis Scott Skin [Inactive] ===", "price": 9.49, "images": travis_scott_images, "email": "dubdaddy11@gmail.com", "password": "hernandez81", "rarity": ["Travis Scott"], "platform": ["PC", "PSN"]},
        {"title": "=== Travis Scott Skin [Inactive] ===", "price": 9.49, "images": travis_scott_images, "email": "efoulkes@live.co.uk", "password": "Ellis240299", "rarity": ["Travis Scott"], "platform": ["PC", "PSN"]},
        
        # === 200+ Skins inactive === ($8.99 = €8.49)
        {"title": "=== [PC/PSN] | 200+ Skins [Inactive] ===", "price": 7.99, "images": premium_collection_images, "email": "francoshade@yahoo.com", "password": "Memphis10", "rarity": [], "platform": ["PC", "PSN"]},
        {"title": "=== [PC/PSN] | 180+ Skins [Inactive] ===", "price": 7.49, "images": premium_collection_images, "email": "jmorales.91291@gmail.com", "password": "Reaper3000", "rarity": [], "platform": ["PC", "PSN"]},
        {"title": "=== [PC/PSN] | 150+ Skins [Inactive] ===", "price": 6.99, "images": premium_collection_images, "email": "eligold456@gmail.com", "password": "Echolincoln1", "rarity": [], "platform": ["PC", "PSN"]},
        {"title": "=== [PC/PSN] | 220+ Skins [Inactive] ===", "price": 8.99, "images": premium_collection_images, "email": "cvincent9942@gmail.com", "password": "Familyof04!", "rarity": [], "platform": ["PC", "PSN"]},
        {"title": "=== [PC/PSN] | 190+ Skins [Inactive] ===", "price": 7.99, "images": premium_collection_images, "email": "jbernardi2011@gmail.com", "password": "clk0203JAB", "rarity": [], "platform": ["PC", "PSN"]},
        
        # === OG stw === (€9.99-€12.99 per OG STW)
        {"title": "=== [PC/PSN] | 89 Skins | OG STW | Full Access ===", "price": 12.99, "images": og_stw_images, "email": "buckoboy1194@me.com", "password": "Tavares352!", "rarity": ["OG STW"], "platform": ["PC", "PSN"]},
        {"title": "=== [PC/PSN] | 76 Skins | OG STW | Full Access ===", "price": 11.99, "images": og_stw_images, "email": "king49a.ak@gmail.com", "password": "Di110n32", "rarity": ["OG STW"], "platform": ["PC", "PSN"]},
        {"title": "=== [PC/PSN] | 105 Skins | OG STW | Full Access ===", "price": 14.99, "images": og_stw_images, "email": "ravenisagod@gmail.com", "password": "Sonodin3", "rarity": ["OG STW"], "platform": ["PC", "PSN"]},
        {"title": "=== [PC/PSN] | 92 Skins | OG STW | Full Access ===", "price": 12.49, "images": og_stw_images, "email": "churchill5151@hotmail.com", "password": "sean5151", "rarity": ["OG STW"], "platform": ["PC", "PSN"]},
        {"title": "=== [PC/PSN] | 68 Skins | OG STW | Full Access ===", "price": 9.99, "images": og_stw_images, "email": "agronom682009@yandex.ru", "password": "jnsrp468", "rarity": ["OG STW"], "platform": ["PC", "PSN"]},
    ]
    
    # Inserisci account nel database
    inserted_count = 0
    for idx, account_data in enumerate(accounts_data):
        # Prima immagine come main
        main_image = account_data["images"][0]
        
        account = {
            "id": f"acc_{str(idx + 1).zfill(3)}",
            "title": account_data["title"],
            "price": account_data["price"],
            "image": main_image,  # Immagine principale
            "images": account_data["images"],  # ARRAY di 3-4 immagini
            "rarity": account_data["rarity"],
            "platform": account_data["platform"],
            "fullAccess": True,
            "mailChangeable": "[Inactive]" not in account_data["title"],
            "createdDate": "2025-01-14",
            "description": f"Account Fortnite autentico - {account_data['title']}. Consegna istantanea dopo l'acquisto.",
            "account_email": account_data["email"],
            "account_password": account_data["password"],
            "is_sold": False  # IMPORTANTE: non venduto di default
        }
        
        await db.fortnite_accounts.insert_one(account)
        inserted_count += 1
        
        print(f"✅ {inserted_count}. {account['title'][:55]} → €{account['price']:.2f} ({len(account['images'])} foto)")
    
    print(f"\n🎉 COMPLETATO! {inserted_count} account inseriti con successo!")
    print(f"✅ Prezzi realistici fncrib applicati")
    print(f"✅ Immagini multiple per ogni account (3-4 screenshot)")
    print(f"✅ Account marcati come non venduti (is_sold=False)")
    print(f"✅ Credenziali originali preservate")
    
    # Verifica distribuzione prezzi
    all_accounts = await db.fortnite_accounts.find({}, {"_id": 0}).to_list(1000)
    avg_price = sum(a['price'] for a in all_accounts) / len(all_accounts)
    min_price = min(a['price'] for a in all_accounts)
    max_price = max(a['price'] for a in all_accounts)
    
    print(f"\n📈 Distribuzione prezzi:")
    print(f"   • Prezzo medio: €{avg_price:.2f}")
    print(f"   • Prezzo minimo: €{min_price:.2f}")
    print(f"   • Prezzo massimo: €{max_price:.2f}")

if __name__ == "__main__":
    asyncio.run(aggiorna_accounts_fncrib_realistic())
