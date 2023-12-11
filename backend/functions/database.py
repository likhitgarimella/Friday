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
    if x < 0.7:
        learn_instruction["content"] = learn_instruction["content"] + " Your response will include some dry humour."
    else:
        learn_instruction["content"] = learn_instruction["content"] + " Your response will include a casual question."
    
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

# Store Messages
def store_messages(request_message, response_message):

    # Define the file name
    file_name = "stored_data.json"

    # Get recent messages
    messages = get_recent_messages()[1:]
    # Exclude the first message that's added into the list ("learn_instruction")

    # Add messages to data
    user_message = {"role": "user", "content": request_message}
    assistant_message = {"role": "assistant", "content": response_message}
    messages.append(user_message)
    messages.append(assistant_message) # Most recent message

    # Save the updated file
    with open(file_name, "w") as f:
        json.dump(messages, f)

# Reset Messages
def reset_messages():

    # Overwrite current file with nothing
    open("stored_data.json", "w")