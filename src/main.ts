import { createApp } from 'vue';
import App from './App.vue';

import './router/guards';
import './utils/configs/fontawesome';

import globalComponents from './utils/configs/globalComponents';
import globalDirectives from './utils/configs/globalDirectives';
import globalPlugins from './utils/configs/globalPlugins';

const app = createApp(App);

// Components
app.use(globalComponents);

// Directives
app.use(globalDirectives);

// plugins
app.use(globalPlugins);

app.mount('#app');