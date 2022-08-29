import translate from "@DeepL/translate";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import getCredentials from "utils/getCredentials";

export async function attachClientListeners(
  SpeechRecognizer: SpeechSDK.SpeechRecognizer
) {
  const { DeepLCredentials } = await getCredentials();
  const { speechClient, captions } = await chrome.storage.sync
    .get("ghostity")
    .then((results) => results.ghostity as GhostityStorageContext);

  chrome.storage.onChanged.addListener((changes, areaName) => {
    switch (areaName) {
      case "sync":
        defaultListeners(changes.ghostity.newValue.captions);
    }
  });

  const defaultListeners = (captions: {
    showTranscribed: boolean;
    showTranslated: boolean;
  }) => {
    if (captions.showTranscribed && captions.showTranslated) {
      SpeechRecognizer.recognized = async (sender, event) => {
        console.log(JSON.stringify(event));
        const transcriptionResults = event.result.text;
        const translationResults = await translate(
          DeepLCredentials,
          transcriptionResults,
          speechClient.target.code
        );

        sendClientResults({
          transcribed: transcriptionResults,
          translated: translationResults,
        });
      };
    }

    if (captions.showTranscribed && !captions.showTranslated) {
      SpeechRecognizer.recognized = async (sender, event) => {
        console.log(JSON.stringify(event));
        const transcriptionResults = event.result.text;

        sendClientResults({
          transcribed: transcriptionResults,
        });
      };
    }

    if (!captions.showTranscribed && captions.showTranslated) {
      SpeechRecognizer.recognized = async (sender, event) => {
        console.log(JSON.stringify(event));
        const transcriptionResults = event.result.text;
        const translationResults = await translate(
          DeepLCredentials,
          transcriptionResults,
          speechClient.target.code
        );

        sendClientResults({
          translated: translationResults,
        });
      };
    }
  };

  function sendClientResults(SpeechResults: {
    transcribed?: string;
    translated?: string;
  }) {
    chrome.runtime.sendMessage({
      message: "SpeechClientResults",
      results: {
        transcribed: SpeechResults.transcribed,
        translated: SpeechResults.translated,
      },
    });
  }

  return defaultListeners(captions);
}
