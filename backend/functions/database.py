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
        "content": "You are interviewing the user for a job as a software engineer. Ask short questions that are relevant to the entry level software engineer position. Your name is Friday. The user is called Likhit. Keep your answers to under 30 words. Your response will include some dry humour."
    }

    # Initialise messages
    messages1 = []

    # Add a random element
    x = random.uniform(0,1)
    if x < 0.5:
        learn_instruction["content"] = learn_instruction["content"] + " Your response will include some dry humour."
    else:
        learn_instruction["content"] = learn_instruction["content"] + " Your response will include a rather challenging question on job type specfically in software engineering."
    
    # Append instruction to messages
    messages1.append(learn_instruction)

    # Get last messages
    try:
        with open(file_name) as user_file:
            data = json.load(user_file)

            # Append last 5 items of data
            if data:
                if len(data)<5:
                    for item in data:
                        messages1.append(item)
                else:
                    for item in data[-5:]:
                        messages1.append(item)
    except Exception as e:
        print(e)
        pass

    # Return messages
    return messages1
