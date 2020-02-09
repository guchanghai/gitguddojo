import axios from "axios";
import { CONST } from "../constant/app-constants";
import io from "socket.io-client";

export default {
  async profile({ commit }) {
    const profile = await axios.get("/api/profile");
    commit("profile", profile.data.user);
  },
  async friend({ commit }) {
    const friends = await axios.get("/api/friends");
    const recommendFriends = friends.data.friends.map(friend => {
      return {
        ...friend,
        status: CONST.FRIEND_STATUS.DEFAULT
      };
    });
    commit("recommendFriends", recommendFriends);
  },
  async changeRoom({ getters, commit, dispatch }, roomId) {
    // no action if room doesn't change
    if (getters.currentChatRoomId === roomId) {
      return;
    }

    // Setup a new message channel
    const socket = io.connect(`/api/chat/${roomId}`);

    socket.on("welcome-message", message => {
      if (getters.chatHistory && getters.chatHistory.lengh === 0) {
        commit("chatMessage", message);
      }
    });

    socket.on("broadcast-message", message => {
      commit("chatMessage", message);
    });

    const response = await axios.get("/api/chat/room", {
      params: {
        roomId
      }
    });

    // fill in chat history
    commit("chatHistory", response.data.history);

    // set active room
    commit("currentChatRoom", roomId);

    // remember socket
    dispatch("activeSocket", socket);
  },
  activeSocket({ commit, getters }, newSocket) {
    if (getters.activeSocket && getters.activeSocket.disconnect) {
      getters.activeSocket.disconnect();
    }

    commit("activeSocket", newSocket);
  }
};
