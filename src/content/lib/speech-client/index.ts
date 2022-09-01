import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import { initializeSpeechRecognizer } from "@Azure/index";
import { SpeechRecognitionLanguages } from "@Azure/types";
import getCredentials from "utils/getCredentials";
import { attachSpeechListeners } from "./SpeechListeners";

export interface SpeechClient {
  status: () => {
    SpeechRecognizerStatus: "active" | "inactive";
  };
  startSpeechClient: (callback?: () => void) => void;
  stopSpeechClient: (callback?: () => void) => void;
  restartSpeechRecognition: () => void;
  pauseSpeechRecognition: () => void;
}

export async function initializeSpeechClient(): Promise<SpeechClient> {
  let MediaStream: MediaStream | undefined;
  let SpeechRecognizer: SpeechSDK.SpeechRecognizer | undefined;
  let SpeechRecognizerStatus: "active" | "inactive" = "inactive";
  let pauseTimeout: NodeJS.Timeout

  const { AzureCredentials } = await getCredentials();

  chrome.storage.onChanged.addListener(async (changes, areaName) => {
    switch (areaName) {
      case "sync":
        if (
          changes.ghostity.newValue.speechClient.source.code !==
            changes.ghostity.oldValue.speechClient.source.code &&
          MediaStream &&
          SpeechRecognizer
        ) {
          SpeechRecognizer.stopContinuousRecognitionAsync(() => {
            SpeechRecognizerStatus = "inactive";
          });

          SpeechRecognizer = initializeSpeechRecognizer(
            MediaStream,
            AzureCredentials,
            changes.ghostity.newValue.speechClient.source.code
          );

          await attachSpeechListeners(SpeechRecognizer);

          SpeechRecognizer.startContinuousRecognitionAsync(() => {
            SpeechRecognizerStatus = "active";
          });
        }
    }
  });

  async function startSpeechClient(callback?: () => void) {
    return navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then(async (stream) => {
        const recognitionLang: SpeechRecognitionLanguages =
          await chrome.storage.sync
            .get("ghostity")
            .then((results) => results.ghostity.speechClient.source.code);

        stream.getTracks().forEach((track) => {
          track.addEventListener("ended", () => {
            SpeechRecognizer?.stopContinuousRecognitionAsync(() => {
              SpeechRecognizerStatus = "inactive";
            });

            SpeechRecognizer = undefined;
          });
        });

        MediaStream = stream;

        SpeechRecognizer = initializeSpeechRecognizer(
          stream,
          AzureCredentials,
          recognitionLang
        );

        await attachSpeechListeners(SpeechRecognizer);

        SpeechRecognizer?.startContinuousRecognitionAsync(() => {
          SpeechRecognizerStatus = "active";
          _autoPause()
          callback && callback();
        });
      });
  }

  function stopSpeechClient(callback?: () => void) {
    SpeechRecognizer?.stopContinuousRecognitionAsync(() => {
      SpeechRecognizerStatus = "inactive";
      clearTimeout(pauseTimeout)
      callback && callback();
    });

    MediaStream?.getTracks().forEach((track) => {
      if (track.readyState === "live") {
        track.stop();
      }
    });

    SpeechRecognizer = undefined;
    MediaStream = undefined;
  }

  function restartSpeechRecognition() {
    if (SpeechRecognizer) {
      SpeechRecognizer?.startContinuousRecognitionAsync(() => {
        SpeechRecognizerStatus = "active";
        _autoPause()
      });
    }
  }

  function pauseSpeechRecognition() {
    SpeechRecognizer?.stopContinuousRecognitionAsync(() => {
      SpeechRecognizerStatus = "inactive";
      clearTimeout(pauseTimeout)
    });
  }

  function status() {
    return {
      SpeechRecognizerStatus,
    };
  }

  function _autoPause() {
    pauseTimeout = setTimeout(() => {
      pauseSpeechRecognition();

      chrome.runtime.sendMessage({ message: "PausedNotification" });
    }, 900000);
  }

  return {
    status,
    startSpeechClient,
    stopSpeechClient,
    restartSpeechRecognition,
    pauseSpeechRecognition,
  };
}
