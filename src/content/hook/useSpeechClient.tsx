import React, { useEffect, useState } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import {
  AzureCredentials,
  initializeSpeechRecognizer,
} from "../../services/Azure/Speech";
import { DeepLCredentials, translate } from "../../services/DeepL";

export default function useSpeechClient() {
  const [MediaStream, setMediaStream] = useState<MediaStream>();
  const [SpeechRecognizer, setSpeechRecognizer] =
    useState<SpeechSDK.SpeechRecognizer>();
  const [recognitionLang, setRecognitionLang] = useState("ja-JP");
  const [targetLang, setTargetLang] = useState("EN");
  const [DeepLCredentials, setDeepLCredentials] = useState<DeepLCredentials>();
  const [AzureCredentials, setAzureCredentials] = useState<AzureCredentials>();

  function startSpeechClient() {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((stream) => {
        chrome.storage.sync.get("keys", (results) => {
          setDeepLCredentials({
            authorizationKey: results.keys.deepl.authorization_key,
            plan: results.keys.deepl.plan,
          });

          setAzureCredentials({
            subscriptionKey: results.keys.azure.subscription_key,
            serviceRegion: results.keys.azure.service_region,
          });

          const recognizer = initializeSpeechRecognizer(
            stream,
            {
              subscriptionKey: results.keys.azure.subscription_key,
              serviceRegion: results.keys.azure.service_region,
            },
            recognitionLang
          );

          stream.getTracks().forEach((track) => {
            track.addEventListener("ended", () => {
              recognizer.stopContinuousRecognitionAsync();
              setMediaStream(undefined);
              setSpeechRecognizer(undefined);
            });
          });

          setMediaStream(stream);

          recognizer.recognized = async (sender, event) => {
            window.alert(JSON.stringify(event));
            const transcriptionResults = event.result.text;
            const translationResults = await translate(
              {
                authorizationKey: results.keys.deepl.authorization_key,
                plan: results.keys.deepl.plan,
              },
              transcriptionResults,
              targetLang
            );

            chrome.runtime.sendMessage({
              message: "SpeechClientResults",
              results: {
                transcribed: transcriptionResults,
                translated: translationResults,
              },
            });
          };

          setSpeechRecognizer(recognizer);

          return recognizer.startContinuousRecognitionAsync();
        });
      })
      .catch((e) => {
        window.alert(e);
        setMediaStream(undefined);
        setSpeechRecognizer(undefined);
      })
      .finally(() => {
      });
  }

  function stopSpeechClient() {
    SpeechRecognizer?.stopContinuousRecognitionAsync();

    MediaStream?.getTracks().forEach((track) => {
      if (track.readyState === "live") {
        track.stop();
      }
    });

    setSpeechRecognizer(undefined);
    setMediaStream(undefined);
  }

  return { MediaStream, SpeechRecognizer, startSpeechClient, stopSpeechClient };
}
