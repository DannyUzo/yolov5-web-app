from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import cv2
import numpy as np
from PIL import Image

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

@app.route('/detect', methods=['POST'])
def detect_objects():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    img = Image.open(file.stream).convert('RGB')

    # Run YOLOv5 inference
    results = model(img)

    # Extract detected objects
    detections = []
    for *box, conf, cls in results.xyxy[0].tolist():
        detections.append({
            "label": model.names[int(cls)],
            "confidence": float(conf),
            "box": [int(box[0]), int(box[1]), int(box[2]), int(box[3])]
        })

    return jsonify({"detections": detections})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)
