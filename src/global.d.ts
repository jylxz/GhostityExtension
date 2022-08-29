import { AzureCredentials, SpeechRecognitionLanguages } from "@Azure/types";
import { DeepLCredentials, DeepLTargetLang } from "@DeepL/types";

declare global {
  interface GhostityStorageContext {
    speechClient: {
      source: {
        language: string;
        code: SpeechRecognitionLanguages;
      };
      target: {
        language: string;
        code: DeepLTargetLang;
      };
    };
    captions: {
      showTranscribed: boolean;
      showTranslated: boolean;
      speed: number
    },
    keys: {
      azure: AzureCredentials,
      deepl: DeepLCredentials
    }
  }
}
