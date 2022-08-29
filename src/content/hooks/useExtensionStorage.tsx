import { SpeechRecognitionLanguages } from "@Azure/types";
import { DeepLTargetLang } from "@DeepL/types";
import React, { useState } from "react";
import { useEffect } from "react";

export default function useStoredSettings() {
  const [ghostityContext, setGhostityContext] =
    useState<GhostityStorageContext>();
  const [sourceLanguage, setSourceLanguage] =
    useState<GhostityStorageContext["speechClient"]["source"]>();
  const [targetLanguage, setTargetLanguage] =
    useState<GhostityStorageContext["speechClient"]["target"]>();
  const [captionSettings, setCaptionSettings] =
    useState<GhostityStorageContext["captions"]>();

  useEffect(() => {
    chrome.storage.sync.get("ghostity").then((results) => {
      const { speechClient, captions } =
        results.ghostity as GhostityStorageContext;

      setGhostityContext(results.ghostity);
      setSourceLanguage(speechClient.source);
      setTargetLanguage(speechClient.target);
      setCaptionSettings(captions)
    });

    chrome.storage.onChanged.addListener((changes, areaName) => {
      switch (areaName) {
        case "sync":
          const { speechClient, captions } = changes.ghostity
            .newValue as GhostityStorageContext;

          setGhostityContext(changes.ghostity.newValue);
          setSourceLanguage(speechClient.source);
          setTargetLanguage(speechClient.target);
          setCaptionSettings(captions)
      }
    });
  }, []);

  useEffect(() => {
    console.log(ghostityContext);
  }, [ghostityContext]);

  function changeSourceLanguage(
    language: string,
    code: SpeechRecognitionLanguages
  ) {
    if (ghostityContext) {
      const newContext: GhostityStorageContext = {
        ...ghostityContext,
        speechClient: {
          ...ghostityContext.speechClient,
          source: {
            language,
            code,
          },
        },
      };

      chrome.storage.sync.set({
        ghostity: newContext,
      });
    }
  }

  function changeTargetLanguage(language: string, code: DeepLTargetLang) {
    if (ghostityContext) {
      const newContext: GhostityStorageContext = {
        ...ghostityContext,
        speechClient: {
          ...ghostityContext.speechClient,
          target: {
            language,
            code,
          },
        },
      };

      chrome.storage.sync.set({
        ghostity: newContext,
      });
    }
  }

  function toggleShowTranscribed() {
    if (ghostityContext) {
      const newContext: GhostityStorageContext = {
        ...ghostityContext,
        captions: {
          ...ghostityContext.captions,
          showTranscribed: !ghostityContext.captions.showTranscribed,
        },
      };

      chrome.storage.sync.set({
        ghostity: newContext,
      });
    }
  }

  function toggleShowTranslated() {
    if (ghostityContext) {
      const newContext: GhostityStorageContext = {
        ...ghostityContext,
        captions: {
          ...ghostityContext.captions,
          showTranslated: !ghostityContext.captions.showTranslated,
        },
      };

      chrome.storage.sync.set({
        ghostity: newContext,
      });
    }
  }

  function changeCaptionSpeed(speed: number) {
    if (ghostityContext) {
      const newContext: GhostityStorageContext = {
        ...ghostityContext,
        captions: {
          ...ghostityContext.captions,
          speed
        }
      }

      chrome.storage.sync.set({
        ghostity: newContext,
      });
    }
  }

  return {
    sourceLanguage,
    targetLanguage,
    captionSettings,
    changeSourceLanguage,
    changeTargetLanguage,
    toggleShowTranscribed,
    toggleShowTranslated,
    changeCaptionSpeed
  };
}
