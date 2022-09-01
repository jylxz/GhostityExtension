chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.message === "SpeechClientResults" && sender.tab?.id) {
    chrome.tabs.sendMessage(sender.tab.id, {
      command: "insert-caption",
      captions: {
        ...msg.results,
      },
    });
  }

  if (msg.message === "PausedNotification" && sender.tab?.id) {
    chrome.tabs.sendMessage(sender.tab.id, {
      command: "show-paused-notification",
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  switch (tab.status) {
    case "complete":
      if (tab.url?.includes("youtube.com/watch")) {
        chrome.tabs.sendMessage(tabId, { command: "load-content" });
        chrome.tabs.sendMessage(tabId, {
          command: "restart-speech-recognition",
        });
      }

      if (tab.url?.includes("youtube.com") && !tab.url.includes("/watch")) {
        chrome.tabs.sendMessage(tabId, { command: "pause-speech-recognition" });
      }
  }
});
