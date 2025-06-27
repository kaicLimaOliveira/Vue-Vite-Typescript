import { App } from 'vue';
import { createPinia } from 'pinia';
import router from '../../router/routes';
import i18n from '../../plugins/i18n';

const pinia = createPinia();

export default {
  install(app: App) {
    app.use(pinia);
    app.use(i18n);
    app.use(router);
  },
};