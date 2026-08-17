chrome.action.onClicked.addListener(async (tab) => {
  // Bail early if we know we can't inject here
  if (tab.url && (tab.url.startsWith("chrome://") || tab.url.startsWith("edge://") || tab.url.startsWith("https://chrome.google.com/webstore"))) {
    return;
  }

  // Inject the content script to show/hide the popup
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  } catch (err) {
    // Use console.warn instead of console.error so Chrome doesn't flag it in the dashboard
    console.warn("Cannot inject content script on this page:", err);
  }
});
