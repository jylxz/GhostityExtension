import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import { initializeSpeechRecognizer } from "@Azure/index";
import { SpeechRecognitionLanguages } from "@Azure/types";
import getCredentials from "utils/getCredentials";
import { attachClientListeners } from "./clientListeners";

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
  let recognitionLang: SpeechRecognitionLanguages = "ja-JP";
  let SpeechRecognizerStatus: "active" | "inactive" = "inactive";

  const { AzureCredentials } = await getCredentials();

  async function startSpeechClient(callback?: () => void) {
    return navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then(async (stream) => {
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

        await attachClientListeners(SpeechRecognizer)

        SpeechRecognizer?.startContinuousRecognitionAsync(() => {
          SpeechRecognizerStatus = "active";
          callback && callback();
        });
      });
  }

  function stopSpeechClient(callback?: () => void) {
    SpeechRecognizer?.stopContinuousRecognitionAsync(() => {
      SpeechRecognizerStatus = "inactive";
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
      });
    }
  }

  function pauseSpeechRecognition() {
    SpeechRecognizer?.stopContinuousRecognitionAsync(() => {
      SpeechRecognizerStatus = "inactive";
    });
  }

  function status() {
    return {
      SpeechRecognizerStatus,
    };
  }

  return {
    status,
    startSpeechClient,
    stopSpeechClient,
    restartSpeechRecognition,
    pauseSpeechRecognition,
  };
}
