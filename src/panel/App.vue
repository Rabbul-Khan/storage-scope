<template>
  <div class="p-4">
    <h1>Storage Scope DevTools</h1>
    <button @click="inspectStorage">Check Storage</button>
  </div>
</template>

<script setup lang="ts">
const inspectStorage = async () => {
  const data = await chrome.storage.local.get();
  console.log("Storage:", data);
};
</script>