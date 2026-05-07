import os
import random
from datetime import datetime
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

app = App(token=os.environ["SLACK_BOT_TOKEN"])

MONITORED_CHANNELS = {"G01832RHS31", "G018GDPCHEH"}  # lbc-ux-team, chanui

WATER_FALL_GIF = "water fall.gif"
BESTFRIEND_GIF = "bestfriend.gif"
WORRIED_GIF = "worried.gif"

PLAYLIST_DEJEUNER = "https://open.spotify.com/playlist/3bFinxXfLFNkzknmNoX6CC?si=64a5fd3012224956&nd=1&dlsi=195c8c8514754626"
PLAYLIST_PM = "https://open.spotify.com/playlist/11DYGhBlMhElQmifinXolu?si=6c446332e45645c3&nd=1&dlsi=16a8b41dc1594de2"
SPOTIFY_BESTFRIEND = "https://open.spotify.com/intl-fr/artist/7JQGwRm1fMAVSasvyR8UC7?si=eCx6KmRrRMGlRf-4mRaokg"

ANNE_SOPHIE_ID = "U07QP5WL4JX"


def get_message():
    hour = datetime.now().hour

    if 11 <= hour < 14 or (hour == 14 and datetime.now().minute <= 30):
        return {
            "text": f"Je suis en congés jusqu'au 26 mai inclus. Comme vous lisez ce message à l'heure du déjeuner vous pouvez cliquer <{PLAYLIST_DEJEUNER}|ici>",
            "gif": None,
        }

    if hour >= 17:
        return {
            "text": f"Je suis en congés jusqu'au 26 mai inclus mais en attendant je vous laisse avec la <{PLAYLIST_PM}|playlist d'un product manager>",
            "gif": None,
        }

    # Messages génériques
    generic = [
        {
            "text": "Je suis actuellement à la poursuite d'une carrière dans l'ostréiculture. Si cela ne fonctionne pas je serai de retour le 27 mai.",
            "gif": WATER_FALL_GIF,
        },
        {
            "text": f"Je suis actuellement en train de barboter jusqu'au 26 mai inclus, en cas d'urgence vous pouvez contacter <{SPOTIFY_BESTFRIEND}|ma meilleure amie> et lui expliquer pourquoi vous avez besoin de moi. Elle me transmettra l'information",
            "gif": BESTFRIEND_GIF,
        },
    ]
    return random.choice(generic)


def send_response(client, channel, thread_ts=None):
    msg = get_message()

    kwargs = {"channel": channel, "text": msg["text"]}
    if thread_ts:
        kwargs["thread_ts"] = thread_ts

    if msg["gif"]:
        client.files_upload_v2(
            channel=channel,
            file=msg["gif"],
            initial_comment=msg["text"],
            thread_ts=thread_ts,
        )
    else:
        client.chat_postMessage(**kwargs)

    # Message de suivi systématique
    client.files_upload_v2(
        channel=channel,
        file=WORRIED_GIF,
        initial_comment=f"En cas d'urgence vous pouvez contacter <@{ANNE_SOPHIE_ID}>",
        thread_ts=thread_ts,
    )


@app.event("message")
def handle_dm(event, client):
    if event.get("channel_type") != "im":
        return
    if event.get("bot_id") or event.get("subtype"):
        return

    send_response(client, event["channel"], event.get("ts"))


@app.event("app_mention")
def handle_mention(event, client):
    channel = event["channel"]
    if channel not in MONITORED_CHANNELS:
        return

    send_response(client, channel, event.get("ts"))


if __name__ == "__main__":
    handler = SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"])
    handler.start()
