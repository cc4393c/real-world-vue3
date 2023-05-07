<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['event'])

const GStore = inject('GStore')

const router = useRouter()

const register = () => {
  // Call to API
  // If registered then redirect to event details
  GStore.flashMessage = 'You are successfully registered for ' + props.event.title

  setTimeout(() => {
    GStore.flashMessage = ''
  }, 3000)

  router.push({
    name: 'event-details'
  })
}
</script>

<template>
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
</template>