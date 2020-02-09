import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import './style/main.css';
import db from './database';
import Toasted from 'vue-toasted';

Vue.config.productionTip = false

Vue.use(Toasted)
new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
