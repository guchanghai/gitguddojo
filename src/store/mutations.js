export default {
  profile(state, profile) {
    state.profile = profile;
  },
  friends(state, friends) {
    state.friends = friends;
  },
  currentChatRoom(state, currentChatRoomId) {
    state.currentChatRoom = state.chatHistoryRooms.find(
      room => room.id === currentChatRoomId
    );
  },
  activeSocket(state, activeSocket) {
    state.activeSocket = activeSocket;
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
      state.notification.dismissSecs =
        notification.dismissSecs !== undefined ? notification.dismissSecs : 1;
    }
  },
  recommendFriends: (state, recommendFriends) => {
    state.recommendFriends = recommendFriends;
  }
};
