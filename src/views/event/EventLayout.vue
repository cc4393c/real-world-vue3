<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EventService from '@/services/EventService.js'

const props = defineProps({
  id: {
    required: true
  }
})

const router = useRouter()

const event = ref(null)

onMounted(async () => {
  // fetch event and set local event data
  try {
    const response = await EventService.getEvent(props.id)
    event.value = response.data
  } catch (error) {
    if (error.response && error.response.status == 404) {
      router.push({
        name: '404-resource',
        params: { resource: 'event' }
      })
    } else {
      router.push({ name: 'network-error' })
    }
  }
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <RouterLink :to="{ name: 'event-details' }">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'event-register' }">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'event-edit' }">Edit</RouterLink>
    </div>
    <RouterView :event="event" />
  </div>
</template>