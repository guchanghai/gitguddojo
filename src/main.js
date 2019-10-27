import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './app.vue';
import BootstrapVue from 'bootstrap-vue';

import Main from './pages/main.vue';
import Landing from './pages/landing.vue';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueRouter);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Routs for pages
const routes = [
  { path: '/', component: Landing },
  { path: '/landing', component: Landing },
  { path: '/main', component: Main },
  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
});

// render function to mount the whole application
new Vue({
  render: h => h( App ),
  router
}).$mount('#app-render-point');
