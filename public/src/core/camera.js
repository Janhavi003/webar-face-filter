export async function startCamera(videoElement) {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("Camera API not supported");
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user" },
    audio: false,
  });

  videoElement.srcObject = stream;
  videoElement.playsInline = true;
  videoElement.muted = true;

  await videoElement.play();

  return stream;
}
