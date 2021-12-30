import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import {Button, message} from 'ant-design-vue';
// import 'ant-design-vue/lib/button/style';
// import 'ant-design-vue/lib/message/style';


const app = createApp(App)
app.use(router)
app.use(Button)
app.use(message)

app.mount('#app')
