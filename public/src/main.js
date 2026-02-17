import { startCamera } from "./core/camera.js";
import { setupLandmarkCanvas } from "./rendering/landmarksCanvas.js";

// -----------------------------
// DOM elements
// -----------------------------
const video = document.getElementById("video");
const canvas = document.getElementById("output");

// -----------------------------
// App state
// -----------------------------
let activeFilter = "none";
let canvasRenderer = null;

// -----------------------------
// Initialization
// -----------------------------
async function init() {
  try {
    await startCamera(video);

    canvasRenderer = setupLandmarkCanvas(canvas, video);

    requestAnimationFrame(renderLoop);
  } catch (err) {
    console.error("Failed to initialize camera:", err);
    alert("Unable to access the camera.");
  }
}

// -----------------------------
// Render loop
// -----------------------------
function renderLoop() {
  if (!canvasRenderer) return;

  canvasRenderer.clear();
  canvasRenderer.drawCameraFrame(activeFilter);

  requestAnimationFrame(renderLoop);
}

// -----------------------------
// Public API (for console / UI)
// -----------------------------
window.setActiveFilter = (filterName) => {
  activeFilter = filterName;
  console.log("Active filter set to:", filterName);
};

// -----------------------------
// Start app
// -----------------------------
init();
