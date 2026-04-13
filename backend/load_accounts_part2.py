import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

async def carica_ikonik_e_special():
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = client[os.environ['DB_NAME']]
    
    # PARTE 2: Ikonik e Account Speciali
    accounts_part2 = [
        # === Ikonik Inactive ===
        {"id": "acc_027", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "tinypeeps2015@gmail.com", "account_password": "AsaruLars13"},
        {"id": "acc_028", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "acostabrandon214@gmail.com", "account_password": "Cristiano7"},
        {"id": "acc_029", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "rupertj9129@gmail.com", "account_password": "Bambam69"},
        {"id": "acc_030", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "yougenwitmoney13@gmail.com", "account_password": "Witmoney6"},
        {"id": "acc_031", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "dragonagelover@yahoo.com", "account_password": "Bulldog18!"},
        {"id": "acc_032", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "lucasrsouzasilva@gmail.com", "account_password": "kekxt5gj"},
        {"id": "acc_033", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "watersn@yahoo.com", "account_password": "Mizutag23!!"},
        {"id": "acc_034", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "taysilva.t@gmail.com", "account_password": "Taytay15@"},
        {"id": "acc_035", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "keyso.83098@gmail.com", "account_password": "michael151"},
        {"id": "acc_036", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "pedro.aridan@googlemail.com", "account_password": "123321dada"},
        {"id": "acc_037", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "cylecorse@gmail.com", "account_password": "abcCorse01"},
        {"id": "acc_038", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "tomas.mizeikis@gmail.com", "account_password": "Alunta1965!"},
        {"id": "acc_039", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "axeljw07@gmail.com", "account_password": "AxelMelker0709!"},
        {"id": "acc_040", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "mrpandasonic@gmail.com", "account_password": "My_Willy_1"},
        {"id": "acc_041", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "colecs3@gmail.com", "account_password": "123hotfoot"},
        {"id": "acc_042", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "emahawk413@gmail.com", "account_password": "!Wilshire2355"},
        {"id": "acc_043", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "gelsominigiovanny@gmail.com", "account_password": "220804gg"},
        {"id": "acc_044", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "ameliataylor8@gmail.com", "account_password": "Atpeace18pig"},
        {"id": "acc_045", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "reneemac2215@gmail.com", "account_password": "Alfred2215!"},
        {"id": "acc_046", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "uscheuch@gmail.com", "account_password": "Pokemon26!"},
        {"id": "acc_047", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "dstabinsky@gmail.com", "account_password": "UGAfootball88"},
        {"id": "acc_048", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "deast25@yahoo.com", "account_password": "Beckham132015"},
        {"id": "acc_049", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "stephanie.goulet89@hotmail.com", "account_password": "binoubinou1"},
        {"id": "acc_050", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "ben_8325@yahoo.com", "account_password": "Dev01dyl"},
        {"id": "acc_051", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "jsccurran@gmail.com", "account_password": "Guitarsoloist14!"},
        {"id": "acc_052", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "redsonicshoes12@gmail.com", "account_password": "bobbob12"},
        {"id": "acc_053", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "wcastelluzzo81@gmail.com", "account_password": "wjc81781"},
        {"id": "acc_054", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "antoine.duroisin@hotmail.com", "account_password": "Yop14021995"},
        {"id": "acc_055", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "jeramyrussell_35@yahoo.com", "account_password": "Beastit1"},
        {"id": "acc_056", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "bendoherty6990@icloud.com", "account_password": "Dash6990"},
        {"id": "acc_057", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "pmalina55@gmail.com", "account_password": "Jayhawk55"},
        {"id": "acc_058", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "mfcampbell89@gmail.com", "account_password": "Brady2017!"},
        {"id": "acc_059", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "capscott209@hotmail.com", "account_password": "Pilsbury.12"},
        {"id": "acc_060", "title": "Ikonik Skin Account - Inactive", "price": 0, "rarity": ["Ikonik"], "account_email": "isaacdp7799@gmail.com", "account_password": "Dawgkat2002"},
        
        # === Account Speciali PC/PSN/XBL ===
        {"id": "acc_061", "title": "PC/PSN - Black Knight + Galaxy + Sparkle", "price": 0, "rarity": ["Black Knight", "Galaxy"], "account_email": "ethancorbett6@gmail.com", "account_password": "Matthew23"},
        {"id": "acc_062", "title": "PC/XBL - Black Knight + Galaxy", "price": 0, "rarity": ["Black Knight", "Galaxy"], "account_email": "braxtontourney@gmail.com", "account_password": "Brookmeade55"},
        {"id": "acc_063", "title": "PC/XBL - Black Knight + Galaxy + Blue Squire", "price": 0, "rarity": ["Black Knight", "Galaxy"], "account_email": "morbo19@yahoo.com", "account_password": "Val12213$"},
        {"id": "acc_064", "title": "PC - OG STW + Galaxy + Neo Versa", "price": 0, "rarity": ["Galaxy", "Neo Versa", "OG STW"], "account_email": "valeriabravinbraga@gmail.com", "account_password": "Titan389@"},
        {"id": "acc_065", "title": "PC/XBL - Ikonik + The Reaper", "price": 0, "rarity": ["Ikonik", "The Reaper"], "account_email": "dealingdmg@yahoo.co.uk", "account_password": "Lilman1995!"},
        {"id": "acc_066", "title": "PC/PSN/XBOX - Double Helix Collection", "price": 0, "rarity": ["Double Helix"], "account_email": "JenifferAurges4244@outlook.com", "account_password": "giraffeA@22"},
        {"id": "acc_067", "title": "PC/PSN/XBOX - Havoc + Rogue Agent Collection", "price": 0, "rarity": ["Havoc", "Rogue Agent"], "account_email": "AdelineDenery352@outlook.com", "account_password": "giraffeA@16"},
        {"id": "acc_068", "title": "PC/PSN/XBOX - OG STW + Blue Team Leader", "price": 0, "rarity": ["OG STW", "Blue Team Leader"], "account_email": "GennieTennessee47@outlook.com", "account_password": "GGgames@12!"},
        {"id": "acc_069", "title": "PC/XBL - Black Knight + Galaxy", "price": 0, "rarity": ["Black Knight", "Galaxy"], "account_email": "bs10994@gmail.com", "account_password": "antix0182"},
        
        # === Gold Mystery Box ===
        {"id": "acc_070", "title": "Gold Mystery Box Account", "price": 0, "rarity": [], "account_email": "idustedyou@gmail.com", "account_password": "Gladstone2013"},
        {"id": "acc_071", "title": "Gold Mystery Box Account", "price": 0, "rarity": [], "account_email": "perndog119@gmail.com", "account_password": "CSperndog1998"},
        {"id": "acc_072", "title": "Gold Mystery Box Account", "price": 0, "rarity": [], "account_email": "jeffdamron84@gmail.com", "account_password": "Harper18"},
        {"id": "acc_073", "title": "Gold Mystery Box Account", "price": 0, "rarity": [], "account_email": "djgoof.ent@gmail.com", "account_password": "Br00klyn"},
        
        # === Premium Finale ===
        {"id": "acc_074", "title": "PC - OG STW + Black Knight + Galaxy", "price": 0, "rarity": ["Black Knight", "Galaxy", "OG STW"], "account_email": "xxfazeemailxx@gmail.com", "account_password": "Fatal091!"},
        {"id": "acc_075", "title": "PC/XBL - Ikonik Exclusive", "price": 0, "rarity": ["Ikonik"], "account_email": "troyskinner212@gmail.com", "account_password": "Nass2528$"},
    ]
    
    # Completa ogni account con campi standard
    for acc in accounts_part2:
        acc.update({
            "image": "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80",
            "images": ["https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80"],
            "platform": ["PC", "PSN"],
            "fullAccess": True,
            "mailChangeable": False,
            "createdDate": "2025-01-12",
            "description": f"Account {acc['title']}"
        })
    
    # Carica
    count = 27  # Inizia da 27 (dopo i primi 26)
    for account in accounts_part2:
        await db.fortnite_accounts.insert_one(account)
        count += 1
        print(f"✅ {count}. Caricato: {account['title']}")
    
    total = await db.fortnite_accounts.count_documents({})
    print(f"\n🎉 PARTE 2 COMPLETATA!")
    print(f"📊 Totale account nel database: {total}")
    
if __name__ == "__main__":
    asyncio.run(carica_ikonik_e_special())
