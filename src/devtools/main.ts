chrome.devtools.panels.create(
  "Storage Scope",       // Tab name
  "",                    // Optional icon path (16x16 png)
  "panel.html",          // Your panel UI page
  () => {
    console.log("DevTools panel created");
  }
);