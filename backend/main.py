# Backend
# Dev
# uvicorn main:app --reload
# Deploy
# uvicorn main:app

# Frontend
# Dev
# yarn dev
# Deploy
# yarn start --> did not work

# Main Imports
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from decouple import config #allows to bring in variables from .env setup section
import openai

# Custom Function Imports
from functions.database import store_messages, reset_messages
from functions.openai_requests import convert_audio_to_text, get_chat_response
from functions.text_to_speech import convert_text_to_speech

# Initiate App
app = FastAPI()

# CORS: Cross-Origin Resource Sharing
# CORS - Origins
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:4174",
    "http://localhost:3000"
]

# CORS - Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Check Health
@app.get("/health")
async def check_health():
    print("Hello World")
    return {"message": "healthy"}

# Reset Messages
@app.get("/reset")
async def reset_conversation():
    reset_messages()
    print("Reset Messages")
    return {"message": "conversation reset"}

# Get audio
@app.post("/post-audio-get/")
# Changing from get to post
async def post_audio(file: UploadFile = File(...)):

    # Commenting below 2 lines to avoid giving the same audio input every time
    # # Get saved audio
    # audio_input = open("voice.mp3", "rb")

    # Save file from Frontend
    with open(file.filename, "wb") as buffer:
        buffer.write(file.file.read())
    audio_input = open(file.filename, "rb")

    # Decode audio
    message_decoded = convert_audio_to_text(audio_input)
    print("MY DECODED AUDIO: ", message_decoded)

    # Guard: Ensure message decoded
    if not message_decoded:
        return HTTPException(status_code=400, detail="Failed to decode audio")
    
    # Get ChatGPT Response
    chat_response = get_chat_response(message_decoded)

    # Guard: Ensure chat response
    if not chat_response:
        return HTTPException(status_code=400, detail="Failed to get chat response")

    # Store messages
    store_messages(message_decoded, chat_response)
    # message_decoded is our msg we send to chatgpt, chat_response is chatgpt's response

    print("FRIDAY'S CHAT RESPONSE: ", chat_response)

    # Convert chat response to audio
    audio_output = convert_text_to_speech(chat_response)

    # Guard: Ensure audio response
    if not audio_output:
        return HTTPException(status_code=400, detail="Failed to get Elevent Labs audio response")
    
    # Create a generator that yields chunks of data
    def iterfile():
        yield audio_output

    # Return audio file
    return StreamingResponse(iterfile(), media_type="application/octet-stream")

    return "Done"

# # Post Bot Response
# # Note: Not playing in browser when using post request
# @app.post("/post-audio/")
# async def post_audio(file: UploadFile = File(...)):
#     print("audio")