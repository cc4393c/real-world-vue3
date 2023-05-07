import { createApp } from 'vue'
import 'nprogress/nprogress.css'

import App from './App.vue'
import router from './router'
import GStore from './stores/global'

const app = createApp(App)

app.use(router)


app.provide('GStore', GStore)

app.mount('#app')
