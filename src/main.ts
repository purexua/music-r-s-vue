import { createApp } from 'vue'
import './style.css'

import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useUserStore } from './store/user'

const pinia = createPinia()
const app = createApp(App)


app.use(router)
app.use(pinia)

const userStore = useUserStore()
userStore.initializeFromStorage()

app.mount('#app')
