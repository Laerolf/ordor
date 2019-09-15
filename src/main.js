import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'

import 'bulma'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon);

import VModal from 'vue-js-modal'

Vue.use(VModal, {dynamic: true, injectModalsContainer: true})

import Notification from "vue-notification"

Vue.use(Notification)

import axios from 'axios'

axios.defaults.baseURL = "http://192.168.1.59:8000/api"

import cookies from 'vue-cookies'

Vue.use(cookies);

//import "@/services/websocket"

Vue.config.productionTip = false

import "@/filters/filters"

new Vue({
    router,
    store,
    axios,
    render: h => h(App)
}).$mount('#ordor')


