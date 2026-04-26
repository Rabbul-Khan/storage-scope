import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "Storage Scope",
  version: "1.0.0",
  description: "storage-scope",
  background: {
    service_worker: "src/background/index.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/index.ts"],
    },
  ],
  permissions: ["storage", "activeTab", "scripting"],
  host_permissions: ["<all_urls>"],
  devtools_page: "devtools.html",
});