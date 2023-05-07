<script setup>
import { useRouter } from 'vue-router'

defineProps(['event'])

const router = useRouter()

const register = () => {
  // Call to API
  // If registered then redirect to event details
  router.push({
    name: 'event-details'
  })
}
</script>

<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>