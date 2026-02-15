export function setupLandmarkCanvas(canvas, video) {
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  function drawPoint(point, color, size = 4) {
    const x = point.x * canvas.width;
    const y = point.y * canvas.height;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  return {
    drawLandmarks(landmarks) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 255, 255, 0.6)";
      for (const p of landmarks) {
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    },

    drawAnchors(anchors) {
      drawPoint(anchors.leftEye, "#ff5555", 5);
      drawPoint(anchors.rightEye, "#ff5555", 5);
      drawPoint(anchors.center, "#55ff55", 6);
      drawPoint(anchors.nose, "#5555ff", 5);
    },
  };
}
