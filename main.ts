import { createApp } from 'vue'
import App from './App.vue'
import { setupPulse } from '@/install'
import '@/style.css'

const app = createApp(App)
setupPulse(app)
app.mount('#app')
