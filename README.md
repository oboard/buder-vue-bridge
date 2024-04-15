# Buder-Vue-Bridge

This is a bridge between Vue.js and Buder. It allows you to use Vue.js components in Buder projects.

```typescript
import HelloWorld from "./helloworld.vue";

VueBridge(HelloWorld, { text: "Hello, World!" });
```

```vue
<template>
  <div>
    <h1>{{ text }}</h1>
  </div>
</template>

<script lang="ts">
defineProps({
  text: {
    type: String,
  },
});
</script>
```
