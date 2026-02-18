import { startCamera } from "./core/camera.js";
import { setupLandmarkCanvas } from "./rendering/landmarksCanvas.js";

let activeFilter = "none";
let renderer = null;

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  const canvas = document.getElementById("output");

  const enableBtn = document.getElementById("enableCameraBtn");
  const permissionScreen = document.getElementById("permission-screen");

  const filterControls = document.getElementById("filterControls");
  const filterSelect = document.getElementById("filterSelect");

  filterSelect.addEventListener("change", (e) => {
    activeFilter = e.target.value;
  });

  enableBtn.addEventListener("click", async () => {
    enableBtn.disabled = true;
    enableBtn.textContent = "Starting camera...";

    try {
      await startCamera(video);
      renderer = setupLandmarkCanvas(canvas, video);

      permissionScreen.style.display = "none";
      filterControls.classList.add("active");

      requestAnimationFrame(renderLoop);
    } catch (err) {
      console.error(err);
      alert("Unable to access camera");
      enableBtn.disabled = false;
      enableBtn.textContent = "Enable Camera";
    }
  });
});

function renderLoop() {
  if (!renderer) return;

  renderer.clear();
  renderer.drawCameraFrame(activeFilter);

  requestAnimationFrame(renderLoop);
}
