<template>
    <div>
        <h1>{{ text }}</h1>
    </div>
</template>

<script lang="ts" setup>

defineProps({
    text: {
        type: String,
        default: 'Hello World!'
    }
});
</script>