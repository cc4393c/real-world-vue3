import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/EventLayout.vue'
import EventDetails from '../views/event/EventDetails.vue'
import EventRegister from '../views/event/EventRegister.vue'
import EventEdit from '../views/event/EventEdit.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'
import EventService from '@/services/EventService.js'
import GStore from '@/stores/global'

const AboutView = () => import('../views/AboutView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      // Parse & set the current page with function mode
      props: route => ({ page: parseInt(route.query.page) || 1 })
    },
    {
      path: '/events/:id',
      name: 'EventLayout',
      props: true,
      component: EventLayout,
      beforeEnter: async to => {
        // fetch event and set local event data
        try {
          const response = await EventService.getEvent(to.params.id)
          GStore.event = response.data
        } catch (error) {
          if (error.response && error.response.status == 404) {
            return {
              name: '404-resource',
              params: { resource: 'event' }
            }
          } else {
            return { name: 'network-error' }
          }
        }
      },
      children: [
        {
          path: '',
          name: 'event-details',
          component: EventDetails
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegister
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEdit,
          meta: { requireAuth: true }
        },
      ]
    },
    {
      path: '/event/:afterEvent(.*)',
      redirect: to => {
        return { path: '/events/' + to.params.afterEvent }
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFound,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkError
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach((to, from) => {
  NProgress.start()

  const notAuthorized = true
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to this page.'

    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)

    if (from.href) {
      return false
    } else {
      return { path: '/' }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
