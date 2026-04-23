import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def get_players_from_ai(sport):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # ✅ stable model
            messages=[
                {
                    "role": "system",
                    "content": "You are a sports expert. Only return REAL players."
                },
                {
                    "role": "user",
                    "content": f"Give me 10 real {sport} players. Only return names in a list."
                }
            ],
            temperature=0.3
        )

        text = response.choices[0].message.content

        print("AI RAW RESPONSE:", text)  # 🔥 DEBUG

        players = [
            p.strip("- ").strip()
            for p in text.split("\n")
            if p.strip()
        ]

        return players

    except Exception as e:
        print("AI ERROR:", e)
        return []