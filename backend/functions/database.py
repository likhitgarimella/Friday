# Imports
import json
import random

# Get recent messages
def get_recent_messages():

    # Prompt Engineering
    # Define the file name and learn instruction
    file_name = "stored_data.json"
    learn_instruction = {
        "role": "system",
        "content": "You are an AI voice assistant. Tell me all the latest news headlines in New Jersey, USA. Your name is Friday. The user is called Likhit."
    }

    # Initialise messages
    messages = []

    # Add a random element
    x = random.uniform(0,1)
    if x < 0.5:
        learn_instruction["content"] = learn_instruction["content"] + " Your response will include some dry humour."
    else:
        learn_instruction["content"] = learn_instruction["content"] + " Your response will include asking me if I want to know more."
    
    # Append instruction to messages
    messages.append(learn_instruction)