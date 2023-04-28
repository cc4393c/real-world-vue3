<script setup>
import { onMounted, ref } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

const events = ref(null)

onMounted(async () => {
  // get events from mock db when component is created
  try {
    const response = await EventService.getEvents()
    events.value = response.data
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div>
    <h1>Events For Good</h1>
    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center; /* center horizontally */
}
</style>
