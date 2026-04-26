<template>
  <div class="popup">
    <h1>Vue Chrome Extension</h1>
    <button @click="saveData">Save to Chrome Storage</button>
  </div>
</template>

<script setup lang="ts">
const saveData = async () => {
  await chrome.storage.local.set({ message: "Hello from Vue Extension" });
  alert("Saved!");
};
</script>

<style scoped>
.popup {
  width: 300px;
  padding: 16px;
}
</style>