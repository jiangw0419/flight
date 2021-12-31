import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import store from "@/store";
import {Button, Layout, Menu, Input, Form} from 'ant-design-vue';


const app = createApp(App)
app.use(router)
app.use(store)
app.use(Button)
app.use(Layout)
app.use(Menu)
app.use(Input)
app.use(Form)

window.vm = app.mount('#app')
