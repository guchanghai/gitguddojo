import Vue from 'vue'
import Vuex from 'vuex'

import actions from "./actions"
import getters from "./getters"
import mutations from "./mutations"

Vue.use(Vuex);

// Vuex store
export default new Vuex.Store({
    state: {
        profile: {},
        friends: [],
        recommendFriends: [],
        currentChatRoom: {},
        chatHistoryRooms: [],
        chatHistory: [],
        mode: '',
        notification: {
            content: '',
            dismissSecs: 0
        }
    },
    actions,
    getters,
    mutations
});
