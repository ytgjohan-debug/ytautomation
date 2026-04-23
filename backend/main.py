import os
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.services.scraper import get_players_from_wikipedia

load_dotenv()

app = FastAPI()

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json"
}


# ✅ GET PLAYERS FROM SUPABASE
def load_players():
    res = requests.get(f"{SUPABASE_URL}/rest/v1/players?select=name", headers=HEADERS)

    if res.status_code != 200:
        print("LOAD ERROR:", res.text)
        return []

    data = res.json()
    return [p["name"] for p in data]


# ✅ SAVE PLAYERS TO SUPABASE
def save_players(players):
    new_players = []

    for p in players:
        res = requests.post(
            f"{SUPABASE_URL}/rest/v1/players",
            headers=HEADERS,
            json={"name": p}
        )

        if res.status_code in [200, 201]:
            new_players.append(p)

    return new_players


@app.get("/")
def root():
    return {"message": "Backend running 🚀"}


@app.get("/scan-players")
def scan_players(sport: str):
    db_players = load_players()

    scraped_players = get_players_from_wikipedia(sport)

    new_players = [p for p in scraped_players if p not in db_players]

    saved_players = save_players(new_players)

    return {
        "players": scraped_players,
        "new_players": saved_players,
        "new_count": len(saved_players),
        "total_database": len(db_players) + len(saved_players)
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)