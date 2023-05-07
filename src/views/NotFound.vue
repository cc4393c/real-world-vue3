<script setup>
const props = defineProps({
  resource: {
    type: String,
    required: true,
    default: 'page'
  }
})
</script>

<template>
  <h1>Oops!</h1>
  <h3>The {{ props.resource }} you're looking for is not here.</h3>
  <RouterLink :to="{ name: 'event-list' }">
    Back to the home page
  </RouterLink>
</template>