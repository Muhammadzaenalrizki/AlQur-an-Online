import '@/assets/css/style.css'
import {
    createApp
} from 'vue'
import * as VueRouter from 'vue-router'
import Root from './App.vue'
import routes from './routes/index.js'
import store from './store/index.js'


const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
})

const app=createApp(Root)
app.use(store)
app.use(router)
app.mount('#app')