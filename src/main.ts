import {createApp} from 'vue'
import App from './App.vue'
import mitt from 'mitt'
// import router from './router'

const $bus = mitt()
const app = createApp(App)

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $bus: typeof $bus
  }
}

app.config.globalProperties.$bus = $bus
// app.use(router).mount('#app')
app.mount('#bollard')
