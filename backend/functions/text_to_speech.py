import requests
from decouple import config

ELEVEN_LABS_API_KEY = config("ELEVEN_LABS_API_KEY")

# Eleven Labs
# Convert Text to Speech
def convert_text_to_speech(message):

    # Define data (body)
    body = {
        "text": message,
        "voice settings": {
            "stability": 0,
            "similarity_boost": 0,
        }
    }

    # Define voice
    voice_friday = "21m00Tcm4TlvDq8ikWAM"

    # Constructing headers & endpoint
    headers = {"xi-api-key": ELEVEN_LABS_API_KEY, "Content-Type": "application/json", "Accept": "audio/mpeg"}
    endpoint = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_friday}"

    # Send request
    try:
        response = requests.post(endpoint, json=body, headers=headers)
        print("RESPONSE", response)
    except Exception as e:
        return
    
    # Handle Response
    if response.status_code == 200:
        # Returns audio file we want
        return response.content
    else:
        return