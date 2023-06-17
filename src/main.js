import { createApp } from 'vue';
import './style.css';
import 'element-plus/theme-chalk/src/message.scss';
import App from './App.vue';
import router from './router';
import store from './store'


const app = createApp(App);

app.use(router);
app.use(store)
app.mount('#app');
