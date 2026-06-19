import { createApp } from 'vue'
import { setupPulse } from '../install'
import '../style.css'
import App from './App.vue'

const app = createApp(App)
setupPulse(app)
app.mount('#app')
