# Fashion Tag Generator (L E N S)

This is a project I built to help automate fashion tagging using the **Google Gemini 2.5 Flash** model. It takes product images and generates relevant descriptive tags.

##  Features
* **AI Tagging:** Uses Google Gemini to analyze images.
* **Dual Setup:** Python backend with a React (Vite) frontend.
* **Fast Processing:** Optimized for quick tag generation.

## Tech Stack
* **Frontend:** React, TypeScript, Vite
* **Backend:** Python (FastAPI), Google Generative AI SDK
* **Environment:** Managed with `.env` for security

## How to Run Locally
1. **Clone the project:** `git clone [URL]`
2. **Setup Backend:**
   * Go to `/backend`.
   * Create a `.env` file and add: `GEMINI_API_KEY=your_key`.
3. **Setup Frontend:**
   * Go to `/frontend`.
   * Run `npm install` then `npm run dev`.