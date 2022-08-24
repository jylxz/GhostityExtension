/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/


chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  var _a;

  if (msg.message === "SpeechClientResults" && ((_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id)) {
    chrome.tabs.sendMessage(sender.tab.id, {
      command: "insert-caption",
      captions: Object.assign({}, msg.results)
    });
  }
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  var _a;

  if ( // tab.url?.includes("youtube.com/watch") ||
  (_a = changeInfo.url) === null || _a === void 0 ? void 0 : _a.includes("youtube.com/watch")) {
    chrome.tabs.sendMessage(tabId, {
      command: "load-button"
    });
  }
});
/******/ })()
;
//# sourceMappingURL=background.webpack.js.map