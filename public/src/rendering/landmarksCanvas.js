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

  function drawCameraFrame() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  }

  return {
    clear,
    drawCameraFrame,
  };
}
