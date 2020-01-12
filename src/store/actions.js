import axios from "axios";
import Constant from "../constant/app-constants";

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
        status: Constant.FRIEND_STATUS.DEFAULT
      };
    });
    commit("recommendFriends", recommendFriends);
  }
};
