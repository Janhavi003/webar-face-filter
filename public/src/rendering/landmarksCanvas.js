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

  function setFilter(type) {
    switch (type) {
      case "soft-blur":
        ctx.filter = "blur(8px)";
        break;
      case "warm":
        ctx.filter = "brightness(1.15) saturate(1.35) sepia(0.15)";
        break;
      case "cool":
        ctx.filter = "brightness(1.05) saturate(0.85) hue-rotate(-10deg)";
        break;
      case "contrast":
        ctx.filter = "contrast(1.4) saturate(1.1)";
        break;
      default:
        ctx.filter = "none";
    }
  }

  function drawCameraFrame(filter = "none") {
    setFilter(filter);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.filter = "none";
  }

  return {
    clear,
    drawCameraFrame,
  };
}
