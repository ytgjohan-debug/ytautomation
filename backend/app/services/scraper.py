import requests
from bs4 import BeautifulSoup


# ✅ CLEAN NAME FILTER
def is_valid_player_name(name):
    words = name.split()

    # ❌ Remove junk / non-player stuff
    banned = [
        "List", "Category", "Template", "Wikipedia",
        "Help", "Edit", "Page", "URL", "Topic",
        "Union", "League", "Team", "Cup", "Stadium",
        "All", "Match", "Series"
    ]

    if any(b in name for b in banned):
        return False

    # ✅ Must be 2–3 words (real names)
    if not (2 <= len(words) <= 3):
        return False

    # ✅ Only letters
    if not name.replace(" ", "").isalpha():
        return False

    # ✅ Capitalized words
    for w in words:
        if not w[0].isupper():
            return False

    return True


# ✅ MAIN SCRAPER
def get_players_from_wikipedia(sport):
    players = []
    headers = {"User-Agent": "Mozilla/5.0"}

    try:
        # 🔍 Search Wikipedia
        search_url = "https://en.wikipedia.org/w/api.php"
        params = {
            "action": "query",
            "list": "search",
            "srsearch": f"{sport} players",
            "format": "json"
        }

        res = requests.get(search_url, params=params, headers=headers, timeout=5)
        data = res.json()

        results = data.get("query", {}).get("search", [])

        # 🔥 Loop limited pages (prevents freezing)
        for result in results[:3]:
            title = result.get("title", "")
            page_url = f"https://en.wikipedia.org/wiki/{title.replace(' ', '_')}"

            try:
                page = requests.get(page_url, headers=headers, timeout=5)
                soup = BeautifulSoup(page.text, "html.parser")

                # 🔍 Extract names
                for link in soup.select("a")[:300]:  # limit scan
                    name = link.text.strip()

                    if is_valid_player_name(name):
                        players.append(name)

            except Exception as e:
                print("PAGE ERROR:", e)
                continue

    except Exception as e:
        print("SCRAPER ERROR:", e)

    # ✅ Remove duplicates + limit
    clean = list(set(players))
    clean.sort()

    return clean[:50]  # limit results to keep it fast