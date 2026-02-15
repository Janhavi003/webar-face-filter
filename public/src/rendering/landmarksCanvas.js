export function setupLandmarkCanvas(canvas, video) {
  const ctx = canvas.getContext("2d");

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

    const eyeDistance = Math.hypot(
      left.x - right.x,
      left.y - right.y
    );

    const lensRadius = eyeDistance * 0.25;
    const bridgeWidth = eyeDistance * 0.15;

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = eyeDistance * 0.12;

    // Left lens
    ctx.beginPath();
    ctx.arc(left.x, left.y, lensRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Right lens
    ctx.beginPath();
    ctx.arc(right.x, right.y, lensRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Bridge
    ctx.beginPath();
    ctx.moveTo(left.x + lensRadius, left.y);
    ctx.lineTo(right.x - lensRadius, right.y);
    ctx.stroke();
    console.log("Drawing glasses");

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
