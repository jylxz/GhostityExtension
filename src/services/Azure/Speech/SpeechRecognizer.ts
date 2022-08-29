import { AzureCredentials, SpeechRecognitionLanguages } from "@Azure/types";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

function initializeSpeechRecognizer(
  stream: MediaStream,
  credentials: AzureCredentials,
  recognitionLanguage: SpeechRecognitionLanguages
) {
  const audioConfig = SpeechSDK.AudioConfig.fromStreamInput(stream);

  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
    credentials.subscription_key,
    credentials.service_region
  );

  speechConfig.speechRecognitionLanguage = recognitionLanguage;

  return new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
}

export { initializeSpeechRecognizer };
