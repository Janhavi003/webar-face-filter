import { startCamera } from "./core/camera.js";

const permissionScreen = document.getElementById("permission-screen");
const cameraScreen = document.getElementById("camera-screen");
const enableCameraBtn = document.getElementById("enable-camera-btn");
const video = document.getElementById("camera-video");

enableCameraBtn.addEventListener("click", async () => {
  enableCameraBtn.disabled = true;
  enableCameraBtn.textContent = "Starting camera...";

  try {
    await startCamera(video);

    permissionScreen.classList.remove("active");
    cameraScreen.classList.add("active");
  } catch (error) {
    console.error(error);
    alert("Unable to access the camera. Please allow camera permissions.");
    enableCameraBtn.disabled = false;
    enableCameraBtn.textContent = "Enable Camera";
  }
});
