chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.message === "SpeechClientResults" && sender.tab?.id) {
    chrome.tabs.sendMessage(sender.tab.id, {
      command: "insert-caption",
      captions: {
        ...msg.results,
      },
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    // tab.url?.includes("youtube.com/watch") ||
    changeInfo.url?.includes("youtube.com/watch")
  ) {
    chrome.tabs.sendMessage(tabId, { command: "load-button" });
  }
});
