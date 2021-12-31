import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import {Button} from 'ant-design-vue';
import store from "@/store";


const app = createApp(App)
app.use(router)
app.use(store)
app.use(Button)

window.vm = app.mount('#app')
