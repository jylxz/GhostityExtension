import React from "react";
import renderComponent from "../utils/renderComponent";
import insertNewElement from "../utils/insertNewElement";
import Button from "./components/Button";
import "./content.css";
import Menu from "./components/Menu";
import addCaptionContainer from "../utils/addCaptionContainer";
import Caption from "./components/Caption";

chrome.storage.sync.get("ghostity", (results) => {
  if (!results.ghostity) {
    chrome.storage.sync.set({
      ghostity: {
        captions: {
          showTranscribed: true,
          showTranslated: true,
          fontSize: 12,
        },
      },
    });
  }
});

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command === "load-button") {
    const buttonExists = document.getElementById("ghostity");

    if (!buttonExists) {
      const parentElement =
        document.getElementsByClassName("ytp-right-controls")[0];

      const buttonRoot = insertNewElement<"button">({
        parentElement,
        tag: "button",
        class: "ytp-button relative -top-[1.2rem] h-[48px] w-[48px]",
        id: "ghostity",
        prepend: true,
      });

      // For Tooltip
      buttonRoot.addEventListener("mouseenter", () => {
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
          tooltip.style.left = `${buttonRoot.offsetLeft - 12}px`;
        }, 100);
      });

      buttonRoot.addEventListener("mouseleave", () => {
        const tooltip = document.querySelector(
          ".ytp-tooltip.ytp-bottom"
        ) as HTMLDivElement;

        tooltip.style.display = "none";
      });

      // Create Setting Menu
      const captionsMenu = document.getElementById("ghostity-menu");

      if (!captionsMenu) {
        const ytPlayer = document.querySelector("#movie_player") as Element;

        const menuRoot = insertNewElement({
          parentElement: ytPlayer,
          id: "ghostity-menu",
          class:
            "relative z-10 w-[26.5rem] h-[177px] ytp-popup ytp-settings-menu",
        });

        menuRoot.style.display = "none";
        menuRoot.style.left = `${buttonRoot.offsetLeft - 12}px`;

        renderComponent(<Menu />, menuRoot);
      }

      buttonRoot.addEventListener("click", () => {
        const captionsMenu = document.getElementById("ghostity-menu");
        const buttonRoot = document.getElementById("ghostity");

        if (captionsMenu) {
          if (captionsMenu.style.display === "none") {
            captionsMenu.style.left = buttonRoot
              ? `${buttonRoot.offsetLeft - 12}px`
              : "";
            captionsMenu.style.display = "unset";
          } else {
            captionsMenu.style.display = "none";
          }
        }
      });

      // Mutation Observer
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

      renderComponent(<Button />, buttonRoot);
    }
  }

  if (msg.command === "insert-caption") {
    chrome.storage.sync.get("ghostity", (results) => {
      const captions = msg.captions;
      const captionSettings = results.ghostity.captions;

      const captionContainer = document.getElementById("ghostity-caption");

      if (!captionContainer) {
        addCaptionContainer();
      } else {
        const caption = insertNewElement({
          parentElement: captionContainer,
        });

        const render = renderComponent(
          <Caption captions={captions} settings={captionSettings} />,
          caption
        );

        setTimeout(() => {
          var objDiv = document.getElementById("ghostity-caption");

          if (objDiv) {
            objDiv.scrollTop = objDiv.scrollHeight;
          }
        }, 0);

        setTimeout(() => {
          document.getElementById("ghostity-caption")?.firstElementChild?.remove()
        }, captionSettings.speed || 10000);
      }
    });
  }
});
