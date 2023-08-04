import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

// unocss
import 'virtual:uno.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
