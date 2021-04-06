import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import APlayer from '@moefe/vue-aplayer';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(APlayer, {
  defaultCover: 'http://zbmusic.com/logo256.png',
  productionTip: true,
});
import "@/styles/index.scss";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
