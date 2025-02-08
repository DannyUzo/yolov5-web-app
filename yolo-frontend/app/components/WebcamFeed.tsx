'use client';

import { useEffect, useRef, useState } from "react";

const WebcamFeed = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    startWebcam();
  }, []);

  const startRecording = () => {
    if (!canvasRef.current) return;
    const canvasStream = canvasRef.current.captureStream(30);

    const mediaRecorder = new MediaRecorder(canvasStream, { mimeType: "video/webm" });
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  const captureFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async (blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append("file", blob, "frame.jpg");

          try {
            const response = await fetch("http://localhost:5000/detect", {
              method: "POST",
              body: formData,
            });
            const data = await response.json();
            console.log("Detection Result:", data);

            if (data.detections) {
              drawDetections(data.detections);
            }
          } catch (err) {
            console.error("Error sending frame:", err);
          }
        }
      }, "image/jpeg");
    }
  };

  const drawDetections = (detections: any[]) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);

    detections.forEach((det) => {
      const [x1, y1, x2, y2] = det.box;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

      ctx.fillStyle = "red";
      ctx.font = "14px Arial";
      ctx.fillText(`${det.label} (${(det.confidence * 100).toFixed(1)}%)`, x1, y1 - 5);
    });
  };

  const startCapturing = () => {
    if (!isCapturing) {
      setIsCapturing(true);
      recordedChunks.current = []; 
      startRecording();
      intervalRef.current = setInterval(captureFrame, 1000);
    }
  };

  const stopCapturing = () => {
    setIsCapturing(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    stopRecording();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="relative">
        <video ref={videoRef} autoPlay className="border rounded-lg shadow-lg" />
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={startCapturing}
          disabled={isCapturing}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md disabled:bg-gray-400"
        >
          Start
        </button>
        <button
          onClick={stopCapturing}
          disabled={!isCapturing}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md disabled:bg-gray-400"
        >
          Stop
        </button>
      </div>

      {videoUrl && (
        <a href={videoUrl} download="detection_video.webm" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md">
          Download Video
        </a>
      )}
    </div>
  );
};

export default WebcamFeed;
