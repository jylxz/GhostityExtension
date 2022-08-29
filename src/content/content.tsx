import React from "react";
import renderComponent from "../utils/renderComponent";
import insertNewElement from "../utils/insertNewElement";
import Button from "./components/Button";
import "./content.css";
import Menu from "./components/Menu";
import addCaptionContainer from "../utils/addCaptionContainer";
import Caption from "./components/Caption";
import { initializeSpeechClient } from "./speech-client";

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
    const doesButtonExists = document.getElementById("ghostity");

    if (!doesButtonExists) {
      // Create Ghostity button
      const ghostityButton = insertNewElement<"button">({
        parentElement: document.querySelector(
          ".ytp-right-controls"
        ) as HTMLDivElement,
        tag: "button",
        class: "ytp-button relative -top-[1.2rem] h-[48px] w-[48px]",
        id: "ghostity",
        prepend: true,
      });

      renderComponent(<Button />, ghostityButton);

      // For Tooltip
      ghostityButton.addEventListener("mouseenter", () => {
        const tooltip = document.querySelector(
          ".ytp-tooltip.ytp-bottom"
        ) as HTMLDivElement;

        const tooltipText = document.querySelector(
          ".ytp-tooltip-text"
        ) as HTMLSpanElement;

        // For smoother transition between YouTube tooltips and Ghostity tooltip
        tooltip.style.display = "none";

        setTimeout(() => {
          tooltip.style.display = "unset";
          tooltipText.innerHTML = "Ghostity";
          tooltip.style.left = `${ghostityButton.offsetLeft - 12}px`;
        }, 100);
      });

      ghostityButton.addEventListener("mouseleave", () => {
        const tooltip = document.querySelector(
          ".ytp-tooltip.ytp-bottom"
        ) as HTMLDivElement;

        tooltip.style.display = "none";
      });

      // Create Setting Menu
      const menuRoot = insertNewElement({
        parentElement: document.getElementById("movie_player") as Element,
        id: "ghostity-menu",
        class:
          "relative z-10 w-[26.5rem]  ytp-popup ytp-settings-menu",
      });

      menuRoot.style.display = "none";
      menuRoot.style.left = `${ghostityButton.offsetLeft - 12}px`;

      renderComponent(
        <Menu
          status={status}
          startSpeechClient={startSpeechClient}
          stopSpeechClient={stopSpeechClient}
        />,
        menuRoot
      );

      ghostityButton.addEventListener("click", () => {
        const captionsMenu = document.getElementById("ghostity-menu");
        const ghostityButton = document.getElementById("ghostity");

        if (captionsMenu) {
          if (captionsMenu.style.display === "none") {
            captionsMenu.style.left = ghostityButton
              ? `${ghostityButton.offsetLeft - 12}px`
              : "";
            captionsMenu.style.display = "unset";
          } else {
            captionsMenu.style.display = "none";
          }
        }
      });

      // Autohide Settings Menu with Youtube player
      const targetNode = document.getElementById("movie_player");

      const callback = function (
        mutationList: MutationRecord[],
        observer: MutationObserver
      ) {
        for (const mutation of mutationList) {
          const captionMenu = document.getElementById("ghostity-menu");

          if (mutation.type === "attributes" && captionMenu) {
            if (targetNode && targetNode.classList.contains("ytp-autohide")) {
              captionMenu.style.display = "none";
            }
          }
        }
      };

      const observer = new MutationObserver(callback);

      targetNode && observer.observe(targetNode, { attributes: true });

      // Create Caption Container
      const captionContainer = document.getElementById("ghostity-caption");

      if (!captionContainer) {
        addCaptionContainer();
      }
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
});
