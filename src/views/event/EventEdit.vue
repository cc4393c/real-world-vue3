<script setup>
import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const unsavedChanges = ref(true)

onBeforeRouteLeave(() => {
  if (unsavedChanges.value) {
    const answer = window.confirm(
      'Do you really want to leave? You have unsaved changes.'
    )
    if (!answer) {
      return false
    }
  }
})
</script>

<template>
  <p>Edit the event here</p>
</template>