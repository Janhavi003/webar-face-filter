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

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function resetOpacity() {
    opacity = 0;
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

    // Smooth fade-in
    opacity = Math.min(opacity + 0.05, 1);

    ctx.save();

    ctx.globalAlpha = opacity;
    ctx.translate(centerX, centerY);
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
    ctx.moveTo(-lensRadius * 0.6, 0);
    ctx.lineTo(lensRadius * 0.6, 0);
    ctx.stroke();

    ctx.restore();
    ctx.globalAlpha = 1;
  }

  return {
    clear,
    resetOpacity,
    drawGlasses,
  };
}
