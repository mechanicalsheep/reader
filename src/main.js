import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import './style/main.css';
import db from './database';
// import tester from './scripts/test.js';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  // tester,
  render: function (h) { return h(App) }
}).$mount('#app')
