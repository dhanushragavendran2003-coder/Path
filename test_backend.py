import requests
import json

def test_prediction():
    url = "http://127.0.0.1:5000/predict"
    payload = {
        "features": {
            "Computer Architecture": 7.0,
            "Programming Skills": 8.0,
            "Project Management": 6.0,
            "Communication skills": 9.0,
            "Openness": 7.0,
            "Conscientousness": 8.0,
            "Extraversion": 6.0,
            "Agreeableness": 7.0,
            "Emotional_Range": 8.0,
            "Conversation": 7.0,
            "Openness to Change": 8.0,
            "Hedonism": 5.0,
            "Self-enhancement": 9.0,
            "Self-transcendence": 7.0
        }
    }
    
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        print("Response:")
        print(json.dumps(response.json(), indent=2))
    except Exception as e:
        print(f"Error connecting to backend: {e}")

if __name__ == "__main__":
    test_prediction()
