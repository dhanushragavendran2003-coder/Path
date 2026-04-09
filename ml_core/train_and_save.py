
import pandas as pd
import joblib
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

def train_and_save():
    # Load Data
    data_path = 'Data/CareerMapping1.csv'
    if not os.path.exists(data_path):
        print(f"Error: {data_path} not found.")
        return

    df = pd.read_csv(data_path)
    
    # Drop likely irrelevant columns
    if 'Unnamed: 0' in df.columns:
        df = df.drop(columns=['Unnamed: 0'])

    # Features and Target
    target_col = 'Role'
    X = df.drop(columns=[target_col])
    y = df[target_col]

    # Feature names
    feature_names = list(X.columns)
    print("Feature Names:", feature_names)

    # Encode Target
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)

    # Train Model
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X, y_encoded)

    # Evaluate (simple)
    print("Training Score:", clf.score(X, y_encoded))

    # Save Artifacts
    output_dir = 'backend/models'
    os.makedirs(output_dir, exist_ok=True)

    joblib.dump(clf, f'{output_dir}/rf_model.pkl')
    joblib.dump(le, f'{output_dir}/label_encoder.pkl')
    joblib.dump(feature_names, f'{output_dir}/feature_names.pkl')
    
    print(f"Model and artifacts saved to {output_dir}")

if __name__ == "__main__":
    train_and_save()
