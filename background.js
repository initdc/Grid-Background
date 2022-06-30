chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  const url = tab.url;
  if (url) {
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = tab.url;
  if (url) {
  }
});
