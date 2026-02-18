import { startCamera } from "./core/camera.js";
import { setupLandmarkCanvas } from "./rendering/landmarksCanvas.js";

let activeFilter = "none";
let canvasRenderer = null;

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  const canvas = document.getElementById("output");

  const enableCameraBtn = document.getElementById("enableCameraBtn");
  const permissionScreen = document.getElementById("permission-screen");

  const filterSelect = document.getElementById("filterSelect");
  const filterControls = document.getElementById("filterControls");

  filterSelect.addEventListener("change", (e) => {
    activeFilter = e.target.value;
  });

  enableCameraBtn.addEventListener("click", async () => {
    enableCameraBtn.disabled = true;
    enableCameraBtn.textContent = "Starting camera...";

    try {
      await startCamera(video);

      canvasRenderer = setupLandmarkCanvas(canvas, video);

      permissionScreen.style.display = "none";
      filterControls.classList.add("active");

      requestAnimationFrame(renderLoop);
    } catch (err) {
      console.error(err);
      alert("Unable to access the camera.");
      enableCameraBtn.disabled = false;
      enableCameraBtn.textContent = "Enable Camera";
    }
  });
});

function renderLoop() {
  if (!canvasRenderer) return;

  canvasRenderer.clear();
  canvasRenderer.drawCameraFrame(activeFilter);

  requestAnimationFrame(renderLoop);
}
