<script>
import NProgress from 'nprogress'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

export default {
  props: ['page'],
  components: {
    EventCard
  },
  data() {
    return {
      events: null,
      totalEvents: 0
    }
  },
  async beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start()
    try {
      // Parse the page number from the route we're navigating to
      const response = await EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      // comp: component (View Model)
      next(comp => {
        comp.events = response.data
        comp.totalEvents = response.headers['x-total-count']
      })
    } catch (error) {
      if (error.response && error.response.status == 404) {
        next({
          name: '404-resource',
          params: { resource: 'event' }
        })
      } else {
        next({ name: 'network-error' })
      }
    } finally {
      NProgress.done()
    }
  },
  async beforeRouteUpdate(routeTo) {
    NProgress.start()
    try {
      // Parse the page number from the route we're navigating to
      const response = await EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      // we can access this here
      this.events = response.data
      this.totalEvents = response.headers['x-total-count']
    } catch (error) {
      if (error.response && error.response.status == 404) {
        return {
          name: '404-resource',
          params: { resource: 'event' }
        }
      } else {
        return { name: 'network-error' }
      }
    } finally {
      NProgress.done()
    }
  },
  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / 2)
      return this.page < totalPages
    }
  }
} 
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
