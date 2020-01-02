import Vue from 'vue';
import VueRouter from 'vue-router';
import LoadScript from 'vue-plugin-load-script';

import App from './app.vue';
import BootstrapVue from 'bootstrap-vue';

import store from './store'

import Main from './pages/main.vue';
import Landing from './pages/landing.vue';
import Friend from './components/main/friend.vue';
import ChatMain from './components/chat/chat-main.vue';
import Welcome from './components/main/welcome.vue';
import Profile from './components/settings/profile.vue';
import Password from './components/settings/password.vue';
import Platform from './components/settings/platform.vue';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(LoadScript);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Routs for pages
const routes = [{
    path: '/',
    component: Landing
  },
  {
    path: '/landing',
    component: Landing
  },
  {
    path: '/main',
    component: Main,
    children: [
      // Friend card
      {
        path: 'friend',
        component: Friend
      },
      {
        path: 'chat',
        component: ChatMain
      },
      {
        path: 'profile',
        component: Profile
      },
      {
        path: 'password',
        component: Password
      },
      {
        path: 'platform',
        component: Platform
      },
      {
        path: '',
        component: Welcome
      },
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
});

// render function to mount the whole application
new Vue({
  render: createElement => createElement(App),
  store,
  router
}).$mount('#app-render-point');