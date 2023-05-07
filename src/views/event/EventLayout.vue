<script setup>
import { inject } from 'vue'

const GStore = inject('GStore')
</script>

<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div id="nav">
      <RouterLink :to="{ name: 'event-details' }">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'event-register' }">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'event-edit' }">Edit</RouterLink>
    </div>
    <RouterView :event="GStore.event" />
  </div>
</template>