import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

export interface AzureCredentials {
  subscriptionKey: string;
  serviceRegion: string;
}

function initializeSpeechRecognizer(
  stream: MediaStream,
  credentials: AzureCredentials,
  recognitionLanguage: string
) {
  const audioConfig = SpeechSDK.AudioConfig.fromStreamInput(stream);

  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
    credentials.subscriptionKey,
    credentials.serviceRegion
  );

  speechConfig.speechRecognitionLanguage = recognitionLanguage;

  return new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
}

export { initializeSpeechRecognizer };
