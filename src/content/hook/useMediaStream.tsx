import React, { useEffect, useState } from "react";

export default function useMediaStream() {
  const [MediaStream, setMediaStream] = useState<MediaStream>();

  function startMediaStream() {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((stream) => {
        setMediaStream(stream);

        stream.getTracks().forEach((track) => {
          track.addEventListener("ended", () => setMediaStream(undefined));
          setMediaStream(undefined)
        });
      })
      .catch(() => {
        setMediaStream(undefined);
      });
  }

  function stopMediaStream() {
    MediaStream?.getTracks().forEach((track) => {
      if (track.readyState === "live") {
        track.stop();
      }
    });

    setMediaStream(undefined);
  }

  return { MediaStream, startMediaStream, stopMediaStream };
}
