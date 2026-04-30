<template>
  <div class="p-4">
    <h1 class="text-xl font-bold">Local Storage Viewer</h1>

    <button class="bg-gray-200 rounded p-2" @click="loadLocalStorage">
      Load Local Storage
    </button>

    <template v-if="localStorageItems.length > 0">
      <template v-for="item in localStorageItems">
        <JsonNode :item="item" />
      </template>
    </template>

    <p v-else>No localStorage data found.</p>
    <div>{{ log }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import JsonNode from "./JsonNode.vue";

let log = ref("");
let localStorageItems = ref({});

const loadLocalStorage = () => {
  chrome.devtools.inspectedWindow.eval(
    `JSON.stringify(Object.keys(localStorage).map(key => ({
        key,
        value: localStorage.getItem(key),
      })))`,
    (result) => {
      let parsedResults = JSON.parse(result);
      localStorageItems.value = parsedResults.map((item) => {
        let realType = inferType(item);
        let parsedValue = safeParse(item.value);

        // If it's a complex type, build the tree and set it as the value!
        let finalValue =
          realType === "object" || realType === "array"
            ? buildTypeTree(parsedValue)
            : parsedValue;
        return {
          key: item.key,
          value: finalValue,
          type: realType,
        };
      });
    },
  );
};

const inferType = (item) => {
  let parsedValue = safeParse(item.value);
  try {
    if (parsedValue === null) {
      return "null";
    } else if (Array.isArray(parsedValue)) {
      return "array";
    } else if (typeof parsedValue === "object") {
      return "object";
    } else {
      return typeof parsedValue;
    }
  } catch (error) {
    return "string";
  }
};

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const buildTypeTree = (data) => {
  // 1. Array Check (Arrays are technically "objects", so check this first!)
  if (Array.isArray(data)) {
    // Return a mapped version of the array where each item
    // is passed back into buildTypeTree
    return data.map((d) => buildTypeTree(d));
  }

  // 2. Object Check (Make sure it's not null, since typeof null is "object"!)
  if (typeof data === "object" && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        return [{ value, type: buildTypeTree(value) }];
      }),
    );
    // 1. Break data apart with Object.entries(data)
    // 2. .map() over the pairs. Keep the key, but pass the innerValue back into buildTypeTree
    // 3. Zip it all back together with Object.fromEntries()
    // 4. Return the new object!
    return /* ... */;
  }

  // 3. The Base Case (Primitives like numbers, strings, booleans, null)
  if (data === null) return "null";

  // If it's not an object, array, or null, it's a basic primitive.
  // Just use standard typeof! No need for inferType.
  return typeof data;
};
</script>
