import { startCamera } from "./core/camera.js";
import { setupLandmarkCanvas } from "./rendering/landmarksCanvas.js";

// -----------------------------
// DOM elements
// -----------------------------
const video = document.getElementById("video");
const canvas = document.getElementById("output");
const filterSelect = document.getElementById("filterSelect");

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
    // Start camera
    await startCamera(video);

    // Setup renderer
    canvasRenderer = setupLandmarkCanvas(canvas, video);

    // Start render loop
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
// Filter UI handling
// -----------------------------
filterSelect.addEventListener("change", (e) => {
  activeFilter = e.target.value;
  console.log("Active filter:", activeFilter);
});

// -----------------------------
// Start app
// -----------------------------
init();
