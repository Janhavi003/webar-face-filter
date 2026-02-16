import { startCamera } from "./core/camera.js";
import { createFaceMesh } from "./tracking/faceMesh.js";
import { createFaceAnchors } from "./tracking/faceAnchors.js";
import { setupLandmarkCanvas } from "./rendering/landmarksCanvas.js";

const permissionScreen = document.getElementById("permission-screen");
const cameraScreen = document.getElementById("camera-screen");
const enableCameraBtn = document.getElementById("enable-camera-btn");
const video = document.getElementById("camera-video");
const canvas = document.getElementById("overlay-canvas");

let faceMesh;
let updateAnchors;
let canvasRenderer;

// Performance tuning
let lastFrameTime = 0;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

enableCameraBtn.addEventListener("click", async () => {
  enableCameraBtn.disabled = true;
  enableCameraBtn.textContent = "Starting camera...";

  try {
    await startCamera(video);

    permissionScreen.classList.remove("active");
    cameraScreen.classList.add("active");

    canvasRenderer = setupLandmarkCanvas(canvas, video);
    updateAnchors = createFaceAnchors();

    initFaceTracking();
  } catch (error) {
    console.error(error);
    alert("Unable to access the camera.");
    enableCameraBtn.disabled = false;
    enableCameraBtn.textContent = "Enable Camera";
  }
});

function initFaceTracking() {
  faceMesh = createFaceMesh(onFaceResults);

  const camera = new Camera(video, {
    onFrame: async () => {
      const now = performance.now();
      if (now - lastFrameTime < FRAME_INTERVAL) return;

      lastFrameTime = now;
      await faceMesh.send({ image: video });
    },
    width: video.videoWidth,
    height: video.videoHeight,
  });

  camera.start();
}

function onFaceResults(results) {
  canvasRenderer.clear();

  if (!results.multiFaceLandmarks?.length) return;

  const landmarks = results.multiFaceLandmarks[0];
  canvasRenderer.drawEyeliner(landmarks);
}


