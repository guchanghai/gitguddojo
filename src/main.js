import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './app.vue';
import BootstrapVue from 'bootstrap-vue';

import Main from './pages/main.vue';
import Landing from './pages/landing.vue';
import Friend from './components/main/friend.vue';
import Welcome from './components/main/welcome.vue';
import Profile from './components/settings/profile.vue';
import Password from './components/settings/password.vue';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueRouter);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Routs for pages
const routes = [
  { path: '/', component: Landing },
  { path: '/landing', component: Landing },
  { path: '/main', component: Main,
    children: [
      // Friend card
      { path: 'friend', component: Friend },
      { path: 'profile', component: Profile },
      { path: 'password', component: Password },
      { path: '', component: Welcome },
    ]
  },
  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
});

// render function to mount the whole application
new Vue({
  render: createElement => createElement( App ),
  router
}).$mount('#app-render-point');
