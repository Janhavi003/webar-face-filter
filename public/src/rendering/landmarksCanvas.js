export function setupLandmarkCanvas(canvas, video) {
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function applyFilter(filter) {
    switch (filter) {
      case "warm":
        ctx.filter = "brightness(1.1) saturate(1.3) sepia(0.15)";
        break;
      case "cool":
        ctx.filter = "brightness(1.05) saturate(0.9) hue-rotate(-10deg)";
        break;
      case "contrast":
        ctx.filter = "contrast(1.4) saturate(1.1)";
        break;
      case "soft-blur":
        ctx.filter = "blur(6px)";
        break;
      default:
        ctx.filter = "none";
    }
  }

  function drawCameraFrame(filter) {
    applyFilter(filter);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.filter = "none";
  }

  return {
    clear,
    drawCameraFrame,
  };
}
