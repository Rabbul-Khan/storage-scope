chrome.devtools.panels.create(
  "My Panel",
  "",
  "popup.html",
  () => {
    console.log("DevTools panel created");
  }
);