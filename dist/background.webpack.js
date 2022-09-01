/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/


chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  var _a, _b;

  if (msg.message === "SpeechClientResults" && ((_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id)) {
    chrome.tabs.sendMessage(sender.tab.id, {
      command: "insert-caption",
      captions: Object.assign({}, msg.results)
    });
  }

  if (msg.message === "PausedNotification" && ((_b = sender.tab) === null || _b === void 0 ? void 0 : _b.id)) {
    chrome.tabs.sendMessage(sender.tab.id, {
      command: "show-paused-notification"
    });
  }
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  var _a, _b;

  switch (tab.status) {
    case "complete":
      if ((_a = tab.url) === null || _a === void 0 ? void 0 : _a.includes("youtube.com/watch")) {
        chrome.tabs.sendMessage(tabId, {
          command: "load-content"
        });
        chrome.tabs.sendMessage(tabId, {
          command: "restart-speech-recognition"
        });
      }

      if (((_b = tab.url) === null || _b === void 0 ? void 0 : _b.includes("youtube.com")) && !tab.url.includes("/watch")) {
        chrome.tabs.sendMessage(tabId, {
          command: "pause-speech-recognition"
        });
      }

  }
});
/******/ })()
;
//# sourceMappingURL=background.webpack.js.map