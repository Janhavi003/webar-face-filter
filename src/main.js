const permissionScreen = document.getElementById("permission-screen");
const cameraScreen = document.getElementById("camera-screen");
const enableCameraBtn = document.getElementById("enable-camera-btn");

enableCameraBtn.addEventListener("click", () => {
  permissionScreen.classList.remove("active");
  cameraScreen.classList.add("active");
});
