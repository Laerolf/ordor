import '@/assets/styling/_main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { errorHandler } from './utils/errorHandler'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(errorHandler)

app.mount('#ordor-ui')
