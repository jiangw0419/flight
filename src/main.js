import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import store from "@/store";
import {Button, Layout, Menu, Input, Form, Tabs, Upload} from 'ant-design-vue';
import handleAxiosConfig from "@/utils/http";
import axios from "axios";

handleAxiosConfig(axios)

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Button)
app.use(Layout)
app.use(Menu)
app.use(Input)
app.use(Form)
app.use(Tabs)
app.use(Upload)

window.vm = app.mount('#app')
