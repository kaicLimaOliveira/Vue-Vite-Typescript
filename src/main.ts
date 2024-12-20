import { createApp } from 'vue';
import App from './App.vue';

import { createPinia } from 'pinia';
import router from './router/routes';

import './router/guards';
import './plugins/fontawesome';

import vMask from './directives/vMask';
import vTooltip from './directives/vTooltip';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Input from './components/form/Input.vue';
import Button from './components/Button.vue';
import Modal from './components/modals/Modal.vue';
import Select from './components/form/Select.vue';
import i18n from './plugins/i18n';


const pinia = createPinia();
const app = createApp(App);

// Components
app.component('Icon', FontAwesomeIcon);
app.component('Input', Input);
app.component('Button', Button);
app.component('Modal', Modal);
app.component('Select', Select);

// Directives
app.directive('mask', vMask);
app.directive('tooltip', vTooltip);


app.use(pinia);
app.use(router);
app.use(i18n, 'pt');
app.mount('#app');
