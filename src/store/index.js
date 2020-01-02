import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Vuex store
export default new Vuex.Store({
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
                state.notification.content = notification;
                state.notification.dismissSecs = 1;
            } else if (typeof notification === "number") {
                state.notification.dismissSecs = notification.dismissSecs;
            } else {
                state.notification.content = notification.content;
                state.notification.dismissSecs = notification.dismissSecs !== undefined ? notification.dismissSecs : 1;
            }
        }
    }
});
