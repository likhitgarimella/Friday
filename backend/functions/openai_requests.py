# Imports
import openai
from decouple import config

# Import custom functions
from functions.database import get_recent_messages

# Retrieve Environment Variables
openai.organization = config("OPEN_AI_ORG")
openai.api_key = config("OPEN_AI_KEY")

# Open AI - Whisper
# Convert audio to text
def convert_audio_to_text(audio_file):
    try:
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        message_text = transcript["text"]
        return message_text
    except Exception as e:
        print(e)
        return

# Open AI - ChatGPT
# Get response to our message
def get_chat_response(message_input):

    messages2 = get_recent_messages()
    user_message = {"role": "user", "content": message_input}
    messages2.append(user_message)
    print(messages2)

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages2
        )
        print(response)
        message_text = response["choices"][0]["message"]["content"]
        return message_text
    except Exception as e:
        print(e)
        return