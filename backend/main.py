from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv
import os


load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    contents = await file.read()

   
    model = genai.GenerativeModel("models/gemini-2.5-flash")

    response = model.generate_content([
        {"mime_type": "image/jpeg", "data": contents},
        "Return fashion-related tags for this image as a comma-separated list."
    ])

   
    text_output = ""
    if response.candidates and response.candidates[0].content.parts:
        text_output = response.candidates[0].content.parts[0].text

   
    tags = [tag.strip() for tag in text_output.split(",") if tag.strip()]


    return {"tags": tags}