import React from "react";

export default function PausedNotification({
  restartSpeechRecognition,
  stopSpeechClient,
}: {
  restartSpeechRecognition: () => void;
  stopSpeechClient: (callback?: (() => void) | undefined) => void;
}) {
  
  function hidePausedNotification() {
    const notification = document.getElementById("ghostity-notification")

    if (notification) {
      notification.style.display = "none"
    }
  }

  function handleYesOnClick() {
    restartSpeechRecognition()
    hidePausedNotification()
  }

  function handleNoOnClick() {
    stopSpeechClient()
    hidePausedNotification()
  }

  return (
    <div className="p-4">
      <div className="text-2xl">Are you still watching and using Ghostity?</div>
      <div className="flex justify-evenly my-2">
        <button
          className="hover:bg-gray-100/30 w-1/2 py-1"
          onClick={() => handleYesOnClick()}
        >
          Yes
        </button>
        <button
          className="hover:bg-gray-100/30 w-1/2 py-1"
          onClick={() => handleNoOnClick()}
        >
          No
        </button>
      </div>
    </div>
  );
}
