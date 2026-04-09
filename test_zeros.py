
import joblib
import pandas as pd
import numpy as np

def test_zeros():
    base_path = 'backend/models'
    model = joblib.load(f'{base_path}/rf_model.pkl')
    le = joblib.load(f'{base_path}/label_encoder.pkl')
    feature_names = joblib.load(f'{base_path}/feature_names.pkl')

    # All zeros
    zeros = [0.0] * len(feature_names)
    input_df = pd.DataFrame([zeros], columns=feature_names)
    
    prediction_idx = model.predict(input_df)[0]
    probs = model.predict_proba(input_df)[0]
    
    predicted_role = le.inverse_transform([prediction_idx])[0]
    max_confidence = float(np.max(probs) * 100)
    
    print(f"Prediction for all zeros: {predicted_role} ({max_confidence:.1f}%)")

if __name__ == "__main__":
    test_zeros()
