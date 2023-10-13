export {}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  }
});
