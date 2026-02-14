export function setupLandmarkCanvas(canvas, video) {
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  return {
    drawLandmarks(landmarks) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 255, 255, 0.8)";

      for (const point of landmarks) {
        const x = point.x * canvas.width;
        const y = point.y * canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  };
}
