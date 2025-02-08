### 📌 YOLOv5 Object Detection Web App  

Real-time object detection in your browser using a webcam feed and **YOLOv5**, powered by a simple backend. Detect objects, draw bounding boxes, and even **download** the processed video!  


## 🚀 Features  

✅ **Live Webcam Feed** – Capture frames directly from your webcam.  
✅ **Real-Time Object Detection** – Detect objects using YOLOv5 with a backend server.  
✅ **Bounding Boxes & Labels** – Draw boxes and labels over detected objects.  
✅ **Download Processed Video** – Save the detection footage after stopping.  
✅ **Open Source & Extendable** – Modify, improve, and contribute to make it better!  


## 🛠 Installation  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/DannyUzo/yolov5-web-app.git
cd yolov5-web-app
```

### 2️⃣ Install Dependencies  

#### 🔹 Backend (Python + Flask)  
```sh
cd yolo-backend
pip install -r requirements.txt
```

#### 🔹 Frontend (Next.js + React)  
```sh
cd yolo-frontend
npm install
```

---

## 🚀 Usage  

### 1️⃣ Start the Backend  
Make sure **YOLOv5 is set up** before running the backend.  

```sh
cd yolo-backend
python app.py
```

### 2️⃣ Start the Frontend  
```sh
cd yolo-frontend
npm run dev
```
Now open **http://localhost:3000** in your browser! 🎉  

---

## 🖥️ How It Works  

1️⃣ The **webcam captures frames** and sends them to the backend.  
2️⃣ The **backend runs YOLOv5** to detect objects.  
3️⃣ The **results (bounding boxes, labels) are sent back** to the frontend.  
4️⃣ The **frontend draws** the boxes on a canvas overlay.  
5️⃣ You can **download the processed video** when you stop detection.  

---

## 🎨 Tech Stack  

- **Frontend**: Next.js, React, Tailwind CSS, HTML5 Canvas  
- **Backend**: Flask, Python, YOLOv5  
- **ML Model**: YOLOv5 (pre-trained on COCO dataset)  

---

## 🤝 Contributing  

Want to improve the project? Follow these steps:  

1. **Fork** the repo.  
2. Create a **new branch** (`feature-xyz`).  
3. **Commit** your changes.  
4. Open a **pull request**.  

---

## 📝 License  

This project is licensed under the **MIT License** – feel free to use, modify, and distribute!  

---

## 📧 Contact  

📩 **Your Name** – uzodinmadaniel42@gmail.com  
🌐 **GitHub** – [DannyUzo](https://github.com/DannyUzo)  

---

### 🎯 Ready to Detect Objects? Start Now! 🚀  
