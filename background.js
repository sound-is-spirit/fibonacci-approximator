// background.js
chrome.action.onClicked.addListener(async (tab) => {
  // Inject the content script to show/hide the popup
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});
