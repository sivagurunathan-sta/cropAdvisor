import os
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model and scaler
MODEL_PATH = './data/crop_recommendation_model.pkl'
SCALER_PATH = './data/crop_scaler.pkl'

# Check if model exists, if not, train and save it
if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
    import pandas as pd
    from sklearn.model_selection import train_test_split
    from sklearn.ensemble import RandomForestClassifier
    
    # Load data
    crop = pd.read_csv("./data/Crop_recommendation.csv")
    
    # Create crop number mapping
    crop_dict = {
        'rice': 1, 'maize': 2, 'jute': 3, 'cotton': 4, 'coconut': 5, 'papaya': 6, 'orange': 7,
        'apple': 8, 'muskmelon': 9, 'watermelon': 10, 'grapes': 11, 'mango': 12, 'banana': 13,
        'pomegranate': 14, 'lentil': 15, 'blackgram': 16, 'mungbean': 17, 'mothbeans': 18,
        'pigeonpeas': 19, 'kidneybeans': 20, 'chickpea': 21, 'coffee': 22
    }
    
    # Map text labels to numeric labels
    crop['crop_num'] = crop['label'].map(crop_dict)
    
    # Prepare features and target
    X = crop.drop(['label', 'crop_num'], axis=1)
    y = crop['crop_num']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale features
    ms = MinMaxScaler()
    X_train = ms.fit_transform(X_train)
    
    # Train model
    rfc = RandomForestClassifier()
    rfc.fit(X_train, y_train)
    
    # Save model and scaler
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(rfc, f)
    
    with open(SCALER_PATH, 'wb') as f:
        pickle.dump(ms, f)
    
    print("Model and scaler trained and saved successfully!")

# Load the saved model and scaler
with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

with open(SCALER_PATH, 'rb') as f:
    scaler = pickle.load(f)

# Crop dictionary (reverse mapping for prediction results)
crop_dict = {
    1: 'rice', 2: 'maize', 3: 'jute', 4: 'cotton', 5: 'coconut', 6: 'papaya', 7: 'orange',
    8: 'apple', 9: 'muskmelon', 10: 'watermelon', 11: 'grapes', 12: 'mango', 13: 'banana',
    14: 'pomegranate', 15: 'lentil', 16: 'blackgram', 17: 'mungbean', 18: 'mothbeans',
    19: 'pigeonpeas', 20: 'kidneybeans', 21: 'chickpea', 22: 'coffee'
}

# Additional information about each crop
crop_info = {
    'rice': {
        'description': 'A staple food crop in many regions, especially Asia.',
        'growing_season': '90-150 days',
        'water_needs': 'High',
        'image_url': 'https://example.com/rice.jpg'
    },
    'maize': {
        'description': 'Also known as corn, a versatile grain used for food and feed.',
        'growing_season': '90-120 days',
        'water_needs': 'Medium',
        'image_url': 'https://example.com/maize.jpg'
    },
    # Add information for other crops similarly
    'coffee': {
        'description': 'A beverage crop grown for its beans used to make coffee.',
        'growing_season': '3-4 years for first harvest, then annual',
        'water_needs': 'Medium',
        'image_url': 'https://example.com/coffee.jpg'
    }
}

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract features
        N = float(data['nitrogen'])
        P = float(data['phosphorus'])
        K = float(data['potassium'])
        temperature = float(data['temperature'])
        humidity = float(data['humidity'])
        ph = float(data['ph'])
        rainfall = float(data['rainfall'])
        
        # Create feature array
        features = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
        
        # Scale features
        scaled_features = scaler.transform(features)
        
        # Make prediction
        prediction = model.predict(scaled_features)
        crop_number = prediction[0]
        crop_name = crop_dict[crop_number]
        
        # Get top 3 probabilities
        probabilities = model.predict_proba(scaled_features)[0]
        top_indices = probabilities.argsort()[-3:][::-1]
        top_predictions = [
            {
                'crop': crop_dict[i+1],
                'probability': float(probabilities[i]),
                'info': crop_info.get(crop_dict[i+1], {'description': 'No information available'})
            }
            for i in top_indices
        ]
        
        return jsonify({
            'success': True,
            'predicted_crop': crop_name,
            'top_predictions': top_predictions
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/crops', methods=['GET'])
def get_crops():
    return jsonify({
        'success': True,
        'crops': {v: k for k, v in crop_dict.items()}
    })

if __name__ == '__main__':
    app.run(debug=True)
