<template>
  <div v-if="item.type === 'object'">
    <div class="text-blue-600">"{{ item.key }}" : object {</div>

    <div class="ml-4">
      <JsonNode
        v-for="(childValue, childKey) in item.value"
        :key="childKey"
        :item="{
          key: childKey,
          type: childValue.type,
          value: childValue.value,
        }"
      />
    </div>

    <div class="text-gray-600">}</div>
  </div>
  <div v-else>
    <div class="text-blue-600 font-mono">
      "{{ item.key }}" :
      <span class="text-gray-600 font-mono bg-gray-200 px-1">{{
        item.type
      }}</span>
      <span class="text-red-400 font-mono">{{ item.value }}</span>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: "JsonNode", // This allows you to use <JsonNode /> inside its own template!
  props: {
    item: Object,
    label: String,
  },
};
</script>
