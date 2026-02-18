import { startCamera } from "./core/camera.js";
import { setupLandmarkCanvas } from "./rendering/landmarksCanvas.js";

/* --------------------------------------------------
   App state
-------------------------------------------------- */
let activeFilter = "none";
let renderer = null;

/* --------------------------------------------------
   DOM Ready
-------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Core elements
  const video = document.getElementById("video");
  const canvas = document.getElementById("output");

  // Permission UI
  const enableBtn = document.getElementById("enableCameraBtn");
  const permissionScreen = document.getElementById("permission-screen");

  // Filter UI (custom menu)
  const filterControls = document.getElementById("filterControls");
  const filterToggle = document.getElementById("filterToggle");
  const filterMenu = document.getElementById("filterMenu");
  const activeFilterLabel = document.getElementById("activeFilterLabel");

  /* ---------- Safety checks ---------- */
  if (!video || !canvas || !enableBtn) {
    console.error("Required DOM elements missing");
    return;
  }

  /* --------------------------------------------------
     Filter menu interactions
  -------------------------------------------------- */

  // Open / close menu
  filterToggle.addEventListener("click", () => {
    filterMenu.classList.toggle("active");
  });

  // Select filter
  filterMenu.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;
      activeFilterLabel.textContent = btn.textContent;
      filterMenu.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!filterControls.contains(e.target)) {
      filterMenu.classList.remove("active");
    }
  });

  /* --------------------------------------------------
     Enable camera
  -------------------------------------------------- */
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
      console.error("Camera error:", err);
      alert("Unable to access the camera.");
      enableBtn.disabled = false;
      enableBtn.textContent = "Enable Camera";
    }
  });
});

/* --------------------------------------------------
   Render loop
-------------------------------------------------- */
function renderLoop() {
  if (!renderer) return;

  renderer.clear();
  renderer.drawCameraFrame(activeFilter);

  requestAnimationFrame(renderLoop);
}
