export function setupLandmarkCanvas(canvas, video) {
  const ctx = canvas.getContext("2d");
  let opacity = 0;


  function resize() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  function toScreen(point) {
    return {
      x: point.x * canvas.width,
      y: point.y * canvas.height,
    };
  }

  function drawCircle(point, radius, color) {
    const { x, y } = toScreen(point);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawGlasses(anchors) {
  const left = toScreen(anchors.leftEye);
  const right = toScreen(anchors.rightEye);

  const centerX = (left.x + right.x) / 2;
  const centerY = (left.y + right.y) / 2;

  const eyeDistance = Math.hypot(
    left.x - right.x,
    left.y - right.y
  );

  const lensRadius = eyeDistance * 0.25;
  opacity = Math.min(opacity + 0.05, 1);
  ctx.globalAlpha = opacity;

  ctx.save();

  // Move to face center
  ctx.translate(centerX, centerY);

  // Rotate with head tilt
  ctx.rotate(anchors.roll);

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = eyeDistance * 0.12;
  ctx.lineCap = "round";

  // Left lens
  ctx.beginPath();
  ctx.arc(-eyeDistance / 2, 0, lensRadius, 0, Math.PI * 2);
  ctx.stroke();

  // Right lens
  ctx.beginPath();
  ctx.arc(eyeDistance / 2, 0, lensRadius, 0, Math.PI * 2);
  ctx.stroke();

  // Bridge
  ctx.beginPath();
  ctx.moveTo(-lensRadius, 0);
  ctx.lineTo(lensRadius, 0);
  ctx.stroke();

  ctx.restore();
  ctx.globalAlpha = 1;

}


  return {
    clear() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },

    drawLandmarks(landmarks) {
      ctx.fillStyle = "rgba(0, 255, 255, 0.3)";
      for (const p of landmarks) {
        const { x, y } = toScreen(p);
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    },

    drawAnchors(anchors) {
      drawCircle(anchors.leftEye, 4, "#ff5555");
      drawCircle(anchors.rightEye, 4, "#ff5555");
      drawCircle(anchors.center, 5, "#55ff55");
    },

    drawGlasses,
  };
}
