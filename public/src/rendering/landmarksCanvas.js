export function setupLandmarkCanvas(canvas, video) {
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  function toScreen(p) {
    return {
      x: p.x * canvas.width,
      y: p.y * canvas.height,
    };
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Accurate upper eyelid landmark indices
  const LEFT_EYE_UPPER = [33, 246, 161, 160, 159, 158, 157, 173, 133];
  const RIGHT_EYE_UPPER = [362, 398, 384, 385, 386, 387, 388, 466, 263];

  function drawEyeliner(landmarks) {
    ctx.strokeStyle = "rgba(15, 15, 15, 0.55)";
    ctx.lineWidth = Math.max(canvas.width * 0.002, 1.3);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    drawSmoothEyePath(LEFT_EYE_UPPER, landmarks);
    drawSmoothEyePath(RIGHT_EYE_UPPER, landmarks);
  }

  function drawSmoothEyePath(indices, landmarks) {
    const points = indices.map(i => toScreen(landmarks[i]));

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }

    ctx.lineTo(
      points[points.length - 1].x,
      points[points.length - 1].y
    );

    ctx.stroke();
  }

  return {
    clear,
    drawEyeliner,
  };
}
