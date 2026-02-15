// Landmark indices from MediaPipe Face Mesh
const LEFT_EYE = 33;
const RIGHT_EYE = 263;
const NOSE_TIP = 1;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothPoint(prev, next, factor = 0.2) {
  if (!prev) return next;
  return {
    x: lerp(prev.x, next.x, factor),
    y: lerp(prev.y, next.y, factor),
    z: lerp(prev.z ?? 0, next.z ?? 0, factor),
  };
}

export function createFaceAnchors() {
  let smoothed = {};

  return function updateAnchors(landmarks) {
    const leftEye = landmarks[LEFT_EYE];
    const rightEye = landmarks[RIGHT_EYE];
    const nose = landmarks[NOSE_TIP];

    const center = {
      x: (leftEye.x + rightEye.x) / 2,
      y: (leftEye.y + rightEye.y) / 2,
      z: (leftEye.z + rightEye.z) / 2,
    };

    const eyeDistance = Math.hypot(
      leftEye.x - rightEye.x,
      leftEye.y - rightEye.y
    );

    smoothed.leftEye = smoothPoint(smoothed.leftEye, leftEye);
    smoothed.rightEye = smoothPoint(smoothed.rightEye, rightEye);
    smoothed.center = smoothPoint(smoothed.center, center);
    smoothed.nose = smoothPoint(smoothed.nose, nose);

    return {
      leftEye: smoothed.leftEye,
      rightEye: smoothed.rightEye,
      center: smoothed.center,
      nose: smoothed.nose,
      eyeDistance,
    };
  };
}
