import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index'; // Import the Vuex store
import { IonicVue } from '@ionic/vue';
import axios from 'axios';

// Import Ionic CSS
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

// Ionic Dark Mode
import '@ionic/vue/css/palettes/dark.system.css';

// Theme variables
import './theme/variables.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store); // Use the Vuex store

router.isReady().then(() => {
  app.mount('#app');
});
