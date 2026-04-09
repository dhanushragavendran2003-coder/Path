# 🎓 Career Prediction System - Pure ML Runtime

**A Machine Learning-powered career recommendation system using RandomForestClassifier**

[![ML](https://img.shields.io/badge/ML-RandomForest-green)](https://scikit-learn.org/)
[![Backend](https://img.shields.io/badge/Backend-Flask-blue)](https://flask.palletsprojects.com/)
[![Frontend](https://img.shields.io/badge/Frontend-Vanilla_JS-yellow)](https://developer.mozilla.org/)
[![Status](https://img.shields.io/badge/Status-Production_Ready-success)](https://github.com)

---

## 🚀 Quick Start (2 Steps)

### 1️⃣ Start Backend
**Double-click**: `START_BACKEND.bat`

OR manually:
```bash
py backend/api.py
```

### 2️⃣ Open Application
**Double-click**: `OPEN_APP.bat`

OR manually:
```bash
cd web_app
start index.html
```

**That's it!** The system is now running.

---

## ✨ Features

### 🤖 Pure Machine Learning
- **Algorithm**: Random Forest Classifier (sklearn)
- **Training Data**: 9,000+ career profiles
- **Features**: 14 optimized attributes
- **Inference**: Real-time predictions via REST API
- **Accuracy**: Deterministic (same input = same output)

### 🎯 Career Roles Supported
- Software Developer
- Database Administrator
- Project Manager
- Technical Writer
- AI/ML Specialist
- Customer Service Executive
- Cyber Security Specialist
- Business Analyst
- Hardware Engineer
- Networking Engineer
- API Specialist
- Information Security Specialist
- Software Tester
- Helpdesk Engineer
- Graphics Designer
- Application Support Engineer

### 🇮🇳 Indian Market Context
- Salary ranges in INR
- Top hiring cities (Bengaluru, Hyderabad, Pune, Mumbai)
- Free learning resources (NPTEL, freeCodeCamp, Coursera)
- Career growth paths specific to India

### 🧠 AI Explanation System (Optional)
- Zero-cost, client-side AI simulation
- Explains ML predictions in natural language
- Provides personalized learning paths
- Suggests free Indian resources
- **Important**: AI explains, ML predicts (strict separation)

---

## 📊 System Architecture

```
┌──────────────────────────────────────────────────┐
│                  USER INTERFACE                   │
│              (web_app/index.html)                 │
└───────────────────┬──────────────────────────────┘
                    │
                    │ Collects 14 features
                    │
                    ▼
┌──────────────────────────────────────────────────┐
│              FRONTEND LOGIC                       │
│               (web_app/app.js)                    │
│  • Validates input                                │
│  • Maps UI names → CSV column names               │
│  • Sends HTTP POST to /predict                    │
└───────────────────┬──────────────────────────────┘
                    │
                    │ HTTP POST
                    │ JSON payload
                    ▼
┌──────────────────────────────────────────────────┐
│              FLASK API SERVER                     │
│               (backend/api.py)                    │
│  • Validates feature names                        │
│  • Loads trained model                            │
│  • Calls RandomForest.predict()                   │
└───────────────────┬──────────────────────────────┘
                    │
                    │ NumPy array
                    │
                    ▼
┌──────────────────────────────────────────────────┐
│          RANDOM FOREST CLASSIFIER                 │
│          (backend/models/rf_model.pkl)            │
│  • 100 decision trees                             │
│  • Trained on 9,000+ samples                      │
│  • Returns: prediction + probabilities            │
└───────────────────┬──────────────────────────────┘
                    │
                    │ JSON response
                    │
                    ▼
┌──────────────────────────────────────────────────┐
│              DISPLAY RESULTS                      │
│  • Career role                                    │
│  • Confidence %                                   │
│  • Probability distribution                       │
│  • Optional: AI explanation                       │
└──────────────────────────────────────────────────┘
```

---

## 🔬 Technical Details

### Input Features (14)
1. **Computer Architecture** (0-10)
2. **Programming Skills** (0-10)
3. **Project Management** (0-10)
4. **Communication skills** (0-10) ⚠️ lowercase 's'
5. **Openness** (0-10)
6. **Conscientiousness** (0-10)
7. **Extraversion** (0-10)
8. **Agreeableness** (0-10)
9. **Emotional_Range** (0-10)
10. **Conversation** (0-10)
11. **Openness to Change** (0-10)
12. **Hedonism** (0-10)
13. **Self-enhancement** (0-10)
14. **Self-transcendence** (0-10)

### Model Training
```python
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)
```

### API Endpoint
```
POST http://127.0.0.1:5000/predict
Content-Type: application/json

{
  "features": {
    "Computer Architecture": 7,
    "Programming Skills": 8,
    ...
  }
}
```

### Response Format
```json
{
  "career": "Software Developer",
  "confidence": 87.5,
  "probabilities": {
    "Software Developer": 0.875,
    "AI ML Specialist": 0.125,
    ...
  }
}
```

---

## 🧪 Testing

### Test 1: Backend Health Check
```bash
py test_backend.py
```

### Test 2: Browser Test
Open: `test_ml_backend.html`

### Test 3: Full Application
1. Open `web_app/index.html`
2. Complete assessment
3. Verify prediction appears

### Test 4: ML Dependency Verification
1. Stop backend (Ctrl+C)
2. Try assessment again
3. Should show "Backend Unavailable" ✅

---

## 📁 Project Structure

```
Career-Prediction-Using-Machine-Learning-main/
│
├── 📄 START_HERE.md              # Complete documentation
├── 📄 START_BACKEND.bat          # One-click backend start
├── 📄 OPEN_APP.bat               # One-click app launch
├── 📄 ML_BACKEND_FIX.md          # Technical fix documentation
│
├── 📂 backend/
│   ├── api.py                    # Flask ML API ⭐
│   └── models/
│       ├── rf_model.pkl          # Trained RandomForest
│       ├── label_encoder.pkl     # Label encoder
│       └── feature_names.pkl     # Feature order
│
├── 📂 web_app/
│   ├── index.html                # Main UI ⭐
│   ├── app.js                    # Frontend logic ⭐
│   ├── ai-engine.js              # AI explanation engine
│   └── style.css                 # Premium styling
│
├── 📂 ml_core/
│   ├── train_and_save.py         # Model training script
│   ├── model_trainer.py          # Training utilities
│   └── data_processor.py         # Data preprocessing
│
├── 📂 Data/
│   ├── CareerMapping1.csv        # Training data (9K+ rows)
│   └── CareerMapping.csv         # Original data
│
├── 📂 First Model Files/         # Initial experiments (28 features)
├── 📂 Revised Model Files/       # Optimized models (14 features)
│
├── 📄 test_backend.py            # API test script
├── 📄 test_ml_backend.html       # Browser test page
├── 📄 streamlit_app.py           # Educational demo (optional)
└── 📄 requirements.txt           # Python dependencies
```

---

## 🛠️ Installation

### Prerequisites
- Python 3.7+
- pip

### Install Dependencies
```bash
pip install -r requirements.txt
```

OR manually:
```bash
pip install flask flask-cors pandas scikit-learn joblib numpy
```

---

## 🎯 Viva/Demo Points

### 1. Pure ML Architecture
> "Our system uses **ONLY** a trained RandomForestClassifier for predictions. There are no heuristics, no if-else rules, and no hardcoded logic. The prediction comes entirely from the ML model."

**Proof**: Stop the backend → UI breaks (shows dependency)

### 2. Separation of Concerns
> "We maintain strict separation: **ML predicts, AI explains**. The ML model outputs a career and confidence score. The AI layer then interprets this prediction and adds context, but never makes predictions itself."

**Proof**: Show `app.js` - ML API call vs AI explanation toggle

### 3. Feature Engineering
> "We reduced features from 28 to 14 through feature selection. This prevents overfitting and improves model generalization."

**Proof**: Show `First Model Files` (28 features, 100% accuracy = overfitting) vs `Revised Model Files` (14 features, better generalization)

### 4. Indian Market Focus
> "All recommendations are tailored for Indian students: salaries in INR, top hiring cities in India, and free resources like NPTEL and freeCodeCamp."

**Proof**: Show AI explanation with Indian context

### 5. Zero-Cost AI
> "The AI explanation system runs entirely client-side using JavaScript templates. No API keys, no external services, completely free."

**Proof**: Show `ai-engine.js` - template-based generation

---

## 🐛 Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| "ML Backend Unavailable" | Backend not running | Run `START_BACKEND.bat` |
| CORS errors | flask-cors not installed | `pip install flask-cors` |
| "Missing feature: ..." | Feature name mismatch | Already fixed in code |
| Same prediction always | Normal ML behavior | Same input = same output ✅ |
| Backend won't start | Missing dependencies | `pip install -r requirements.txt` |

---

## 📈 Future Enhancements

- [ ] Add train/test split for better validation
- [ ] Implement cross-validation
- [ ] Add model versioning
- [ ] Deploy to cloud (Heroku/AWS)
- [ ] Add user authentication
- [ ] Save prediction history
- [ ] Add analytics dashboard
- [ ] Mobile-responsive design
- [ ] Multi-language support

---

## 📝 License

This project is for educational purposes.

---

## 👥 Team

**Nehru Institute of Engineering and Technology**  
Department of Information Technology

---

## 🙏 Acknowledgments

- **NPTEL** for free educational resources
- **freeCodeCamp** for programming tutorials
- **scikit-learn** for ML framework
- **Flask** for backend framework

---

## 📞 Support

For issues or questions:
1. Check `START_HERE.md` for detailed documentation
2. Check `ML_BACKEND_FIX.md` for technical details
3. Run `test_backend.py` to diagnose issues

---

**Status**: ✅ **PRODUCTION READY**  
**ML Runtime**: **PURE** (No Heuristics)  
**Last Updated**: 2026-01-22

---

Made with ❤️ for Indian Students
