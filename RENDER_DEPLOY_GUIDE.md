# 🚀 Step-by-Step Render Deployment Guide

Follow these steps to deploy your Career Prediction System to Render.

---

## 🏗️ Part 1: Prepare your Code
Render needs your code to be on GitHub or GitLab.
1. Create a new repository on GitHub.
2. Push all files from your project folder to that repository.
   - *Tip: Ensure `.env` is NOT on GitHub (check your `.gitignore`).*

---

## ⚙️ Part 2: Deploy the Backend (Python Flask)
1. Log in to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** > **Web Service**.
3. Connect your project repository.
4. **Settings:**
   - **Name:** `career-prediction-backend` (or similar)
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn wsgi:app`
5. **Environment Variables (Important!):**
   Click the **Environment** tab and add these:
   - `HOST`: `0.0.0.0`
   - `PORT`: `10000` (Render's default)
   - `DEBUG`: `False`
   - `PRODUCTION_FRONTEND_URL`: `https://your-frontend-name.onrender.com` (Add this later after you create the frontend)

---

## 🖼️ Part 3: Deploy the Frontend (Static Site)
1. In Render Dashboard, click **New +** > **Static Site**.
2. Connect the same project repository.
3. **Settings:**
   - **Name:** `career-prediction-web`
   - **Build Command:** (Leave blank)
   - **Publish Directory:** `web_app`
4. **Link the Backend:**
   Once the Static Site is created, Render will give you a URL (e.g., `https://career-prediction-web.onrender.com`).
   - Copy this URL.
   - Go back to your **Backend Service** > **Environment** tab and add/update `PRODUCTION_FRONTEND_URL` with this value.

---

## 🔗 Part 4: Final Linkage
1. Copy the URL of your **Backend Web Service** (e.g., `https://career-prediction-backend.onrender.com`).
2. Locally, open `web_app/app.js`.
3. Update `PRODUCTION_API_URL` (Line 5) with your actual backend URL:
   ```javascript
   PRODUCTION_API_URL: 'https://career-prediction-backend.onrender.com',
   ```
4. **Commit and Push** this change to GitHub. Render will automatically redeploy your frontend.

---

## ✅ Verification
1. Open your Frontend URL in the browser.
2. Start an assessment.
3. If it loads the result, your production system is live! 🏁
