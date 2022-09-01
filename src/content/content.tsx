import React from "react";
import renderComponent from "../utils/renderComponent";
import insertNewElement from "../utils/insertNewElement";
import "./content.css";
import Caption from "./components/Caption";
import { initializeSpeechClient } from "./lib/speech-client";

import {
  insertMenu,
  insertNotification,
  insertButton,
  insertCaptionContainer,
} from "./lib/insert";

const {
  status,
  startSpeechClient,
  stopSpeechClient,
  pauseSpeechRecognition,
  restartSpeechRecognition,
} = await initializeSpeechClient();

chrome.storage.sync.get("ghostity", (results) => {
  if (!results.ghostity) {
    chrome.storage.sync.set({
      ghostity: {
        speechClient: {
          source: {
            language: "Japanese",
            code: "ja-JP",
          },
          target: {
            language: "English",
            code: "EN",
          },
        },
        captions: {
          showTranscribed: true,
          showTranslated: true,
        },
      },
    });
  }
});

chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  const { SpeechRecognizerStatus } = status();

  if (msg.command === "pause-speech-recognition") {
    if (SpeechRecognizerStatus === "active") {
      pauseSpeechRecognition();
    }
  }

  if (msg.command === "restart-speech-recognition") {
    if (SpeechRecognizerStatus === "inactive") {
      restartSpeechRecognition();
    }
  }

  if (msg.command === "load-content") {
    const ghostity = document.getElementById("ghostity");

    if (!ghostity) {
      insertButton();

      insertMenu({
        status,
        startSpeechClient,
        stopSpeechClient,
      });

      insertNotification({
        restartSpeechRecognition,
        stopSpeechClient,
      });

      insertCaptionContainer();
    }
  }

  if (msg.command === "insert-caption") {
    chrome.storage.sync.get("ghostity", (results) => {
      const captions = msg.captions;
      const captionSettings = results.ghostity.captions;

      const captionContainer = document.getElementById("ghostity-caption");

      if (captionContainer) {
        const caption = insertNewElement({
          parentElement: captionContainer,
        });

        renderComponent(
          <Caption captions={captions} settings={captionSettings} />,
          caption
        );

        setTimeout(() => {
          const caption = document.getElementById("ghostity-caption");

          if (caption) {
            caption.scrollTop = caption.scrollHeight;
          }
        }, 0);

        setTimeout(() => {
          document
            .getElementById("ghostity-caption")
            ?.firstElementChild?.remove();
        }, 10000 / captionSettings.speed);
      }
    });
  }

  if (msg.command === "show-paused-notification") {
    pauseSpeechRecognition();

    const pauseNotification = document.getElementById("ghostity-notification");

    if (pauseNotification) {
      pauseNotification.style.display = "block";
    }
  }
});
