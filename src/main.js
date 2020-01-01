import Vue from 'vue';
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import LoadScript from 'vue-plugin-load-script';

import App from './app.vue';
import BootstrapVue from 'bootstrap-vue';

import Main from './pages/main.vue';
import Landing from './pages/landing.vue';
import Friend from './components/main/friend.vue';
import ChatMain from './components/chat/chat-main.vue';
import Welcome from './components/main/welcome.vue';
import Profile from './components/settings/profile.vue';
import Password from './components/settings/password.vue';
import Platform from './components/settings/platform.vue';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(LoadScript);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Vuex store
const store = new Vuex.Store({
  state: {
    profile: {},
    friends: [],
    currentChatRoom: {},
    chatHistoryRooms: [],
    chatHistory: [],
    mode: '',
    notification: {
      content: '',
      dismissSecs: 0
    }
  },
  getters: {
    profile: state => state.profile,
    friends: state => state.friends,
    currentChatRoomId: state => state.currentChatRoom.id,
    currentChatRoom: state => state.currentChatRoom,
    chatHistoryRooms: state => state.chatHistoryRooms,
    chatHistory: state => state.chatHistory,
    mode: state => state.mode,
    notification: state => state.notification
  },
  mutations: {
    profile(state, profile) {
      state.profile = profile;
    },
    friends(state, friends) {
      state.friends = friends;
    },
    currentChatRoom(state, currentChatRoomId) {
      state.currentChatRoom = state.chatHistoryRooms.find(room => room.id === currentChatRoomId)
    },
    chatHistoryRooms(state, chatHistoryRooms) {
      state.chatHistoryRooms = chatHistoryRooms;
    },
    chatHistory(state, chatHistory) {
      state.chatHistory = chatHistory;
    },
    chatMessage(state, message) {
      state.chatHistory.push(message);
    },
    mode: (state, mode) => {
      state.mode = mode;
    },
    notification: (state, notification) => {
      if (typeof notification === "string") {
        state.notification.content = notification.content;
      } else if (typeof notification === "number") {
        state.notification.dismissSecs = notification.dismissSecs;
      } else {
        state.notification.content = notification.content;
        state.notification.dismissSecs = notification.dismissSecs !== undefined ? notification.dismissSecs : 1;
      }
    }
  }
});

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