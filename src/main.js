import { createApp } from 'vue'
import store from './store'
import App from './app.vue'
import './assets/global.css'

store.commit('initialiseStore')

createApp(App).use(store).mount('#app')
