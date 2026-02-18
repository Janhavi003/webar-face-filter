export async function startCamera(videoElement) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error("Camera API not supported");
  }

  const constraints = {
    audio: false,
    video: {
      facingMode: "user"
    }
  };

  const stream = await navigator.mediaDevices.getUserMedia(constraints);

  videoElement.srcObject = stream;
  videoElement.playsInline = true;
  videoElement.muted = true;

  await videoElement.play();

  return stream;
}
