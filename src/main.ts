import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import router from './router/routes';
import './plugins/fontawesome'

import vMask from './directives/vMask';
import vTooltip from './directives/vTooltip';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Input from './components/Input.vue'


const pinia = createPinia()
const app = createApp(App);

app.component('Icon', FontAwesomeIcon)
app.component('Input', Input)

// Directives
app.directive('mask', vMask);
app.directive('tooltip', vTooltip);


app.use(pinia)
app.use(router)
app.mount('#app')
