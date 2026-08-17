const ACTIVE_ICON_PATHS = {
  16: "icons/icon-16-active.png",
  48: "icons/icon-48-active.png",
  128: "icons/icon-128-active.png"
};

const INACTIVE_ICON_PATHS = {
  16: "icons/icon-16.png",
  48: "icons/icon-48.png",
  128: "icons/icon-128.png"
};

chrome.action.onClicked.addListener(async (tab) => {
  // Inject the content script to show/hide the popup
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === "FIBONACCI_STATE" && sender.tab) {
    const icon = msg.isVisible ? ACTIVE_ICON_PATHS : INACTIVE_ICON_PATHS;
    chrome.action.setIcon({ tabId: sender.tab.id, path: icon }).catch(() => {});
  }
});
