import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import './styles/index.scss';

import Auth from './common/auth';
Vue.use(Auth);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

declare module 'vue/types/vue' {
    interface Vue {
      $auth: import('./common/authService').AuthService;
    }
  }