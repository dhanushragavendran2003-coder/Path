
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to access

# Global State
MODEL = None
LE = None
FEATURE_NAMES = None

def load_artifacts():
    global MODEL, LE, FEATURE_NAMES
    base_path = 'backend/models'
    try:
        MODEL = joblib.load(f'{base_path}/rf_model.pkl')
        LE = joblib.load(f'{base_path}/label_encoder.pkl')
        FEATURE_NAMES = joblib.load(f'{base_path}/feature_names.pkl')
        print("✅ Artifacts loaded successfully")
        print(f"✅ Class: {type(MODEL)}")
        print(f"✅ Features expected: {FEATURE_NAMES}")
    except Exception as e:
        print(f"❌ Error loading artifacts: {e}")

load_artifacts()

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'online',
        'model_loaded': MODEL is not None,
        'features_expected': FEATURE_NAMES
    })

@app.route('/predict', methods=['POST'])
def predict():
    if not MODEL:
        print("❌ Prediction failed: Model not loaded")
        return jsonify({'error': 'Model not loaded'}), 500

    try:
        data = request.json
        print(f"📥 Received prediction request: {data}")
        features_dict = data.get('features', {})
        
        # Validation: Check all expected features exist
        input_vector = []
        missing_features = []
        for feature in FEATURE_NAMES:
            if feature not in features_dict:
                missing_features.append(feature)
            else:
                try:
                    val = float(features_dict[feature])
                    
                    # --- SCALE ALIGNMENT ---
                    # The training data (CareerMapping1.csv) has mixed scales:
                    # - Technical Skills: 0 to 6
                    # - Personality Traits: 0 to 1
                    # The Frontend sends 0 to 10 for everything. 
                    # We must normalize these to match the model's expected ranges.
                    
                    tech_skills = ['Computer Architecture', 'Programming Skills', 'Project Management', 'Communication skills']
                    
                    if feature in tech_skills:
                        # Scale 0-10 down to 0-6
                        val = val * 0.6
                    else:
                        # Scale 0-10 down to 0-1
                        val = val * 0.1
                        
                    input_vector.append(val)
                except (ValueError, TypeError):
                    print(f"❌ Invalid value for feature {feature}: {features_dict[feature]}")
                    return jsonify({'error': f'Invalid value for feature: {feature}'}), 400
        
        if missing_features:
            print(f"❌ Missing features: {missing_features}")
            return jsonify({
                'error': 'Missing features in request',
                'missing': missing_features,
                'received': list(features_dict.keys())
            }), 400
            
        # Create DataFrame for prediction to maintain feature consistency
        input_df = pd.DataFrame([input_vector], columns=FEATURE_NAMES)
        
        # Inference
        prediction_idx = MODEL.predict(input_df)[0]
        probs = MODEL.predict_proba(input_df)[0]
        
        predicted_role = LE.inverse_transform([prediction_idx])[0]
        max_confidence = float(np.max(probs) * 100)
        
        # Build Probability Dict
        prob_dict = {}
        for idx, prob in enumerate(probs):
            role_name = LE.inverse_transform([idx])[0]
            prob_dict[role_name] = float(prob)
            
        print(f"✅ Prediction successful: {predicted_role} ({max_confidence:.1f}%)")
        
        # Prediction Result
        # Note: We NO LONGER override the role with "No strong match detected".
        # The ML-predicted role is returned as the absolute source of truth.
        return jsonify({
            'career': predicted_role,
            'confidence': max_confidence,
            'probabilities': prob_dict,
            'is_low_confidence': max_confidence < 40.0
        })

    except Exception as e:
        print(f"❌ Error during prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting Pure ML Backend...")
    # Using 0.0.0.0 to ensure it's accessible from both 127.0.0.1 and localhost
    app.run(host='0.0.0.0', port=5000, debug=True)
