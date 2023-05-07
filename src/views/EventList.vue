<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { watchEffect } from 'vue'

const props = defineProps(['page'])

const router = useRouter()

const events = ref(null)
const totalEvents = ref(0)

watchEffect(async () => {
  events.value = null
  totalEvents.value = 0
  // get events from mock db when component is created
  try {
    const response = await EventService.getEvents(2, props.page)
    events.value = response.data
    totalEvents.value = response.headers['x-total-count']
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

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return props.page < totalPages
})
</script>

<template>
  <div>
    <h1>Events For Good</h1>
    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />

      <div class="pagination">
        <RouterLink
          id="page-prev"
          :to="{ name: 'event-list', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
        >
          &#60; Prev
        </RouterLink>

        <RouterLink
          id="page-next"
          :to="{ name: 'event-list', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage">
          Next &#62;
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* center horizontally */
}

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
