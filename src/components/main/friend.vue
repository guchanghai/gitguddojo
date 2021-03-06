<template>
  <div>
    <div class="friend-card-section">
      <div v-for="friend in recommendFriends" :key="friend.id">
        <b-container
          v-if="friend.status !== -1"
          class="friend-card"
          :class="friend.status === 1 ? 'selected' : ''"
        >
          <b-row class="title">
            <b-col>
              <img class="platform-item-img" src="../../assets/profile-header-icon.png" />
              <span class="title-text">{{ friend.streamId }}</span>
            </b-col>
          </b-row>
          <b-row class="detail">
            <b-col class="detail-title">Platform ID</b-col>
            <b-col class="detail-platform">
              <div v-for="platform in friend.platforms" :key="platform">
                <b-col class="platform-item">
                  <span>
                    <img class="platform-item-img" src="../../assets/platform-a.svg" />
                  </span>
                  <span>{{ platform }}</span>
                </b-col>
              </div>
            </b-col>
            <b-col class="detail-action">
              <b-button
                class="action-button invite"
                :disabled="friend.status === 1"
                @click="confirm(friend.id)"
              >Select</b-button>
              <b-button
                class="action-button decline"
                :disabled="friend.status === -1"
                @click="decline(friend.id)"
              >Decline</b-button>
            </b-col>
          </b-row>
          <b-row class="operation">
            <b-col class="operation-title">Top Operations</b-col>
            <b-col class="operation-platform">
              <img class="operation-item" :src="getImgUrl(friend.operators[0])" />
              <img class="operation-item" :src="getImgUrl(friend.operators[1])" />
              <img class="operation-item" :src="getImgUrl(friend.operators[2])" />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <b-button
      type="submit"
      variant="info"
      class="friend-action-button"
      @click="goToChat"
    >Back to chat</b-button>
    <b-button
      type="submit"
      variant="success"
      class="friend-action-button"
      @click="lookForGroup"
    >Restart</b-button>
    <b-button type="submit" variant="primary" class="friend-action-button" @click="startChat">OK</b-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { CONST } from "../../constant/app-constants";

export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("friend");
  },
  methods: {
    startChat(evt) {
      this.updateFriends();
      this.$store.commit("mode", "chat");
      this.$router.replace("/main/chat");
      evt.preventDefault();
    },
    goToChat(evt) {
      this.$store.commit("mode", "chat");
      this.$router.replace("/main/chat");
      evt.preventDefault();
    },
    confirm(friendId) {
      const friend = this.recommendFriends.find(
        friend => friend.id === friendId
      );
      friend.status = CONST.FRIEND_STATUS.SELECTED;
    },
    decline(friendId) {
      const friend = this.recommendFriends.find(
        friend => friend.id === friendId
      );
      friend.status = CONST.FRIEND_STATUS.DECLINED;

      this.checkFriends();
    },
    checkFriends() {
      const selected = this.recommendFriends.filter(
        friend => friend.status !== CONST.FRIEND_STATUS.DECLINED
      );

      // Restart if no friend selected
      if (selected.length === 0) {
        this.$store.dispatch("friend");
      }
    },
    updateFriends() {
      let selected = this.recommendFriends.filter(
        friend => friend.status === CONST.FRIEND_STATUS.SELECTED
      );
      if (selected.length === 0) {
        selected = this.recommendFriends.filter(
          friend => friend.status !== CONST.FRIEND_STATUS.DECLINED
        );
      }

      this.$store.commit("friends", selected);
    },
    getImgUrl(pic) {
      try {
        const operatorPicName = pic.toUpperCase();
        return require(`../../assets/${operatorPicName}.png`);
      } catch (e) {
        return require(`../../assets/VIGIL.png`);
      }
    },
    lookForGroup(evt) {
      this.$store.dispatch("friend");
      evt.preventDefault();
    }
  },
  computed: {
    ...mapGetters(["recommendFriends"]),
    isFriendConfirmed: friendId => {
      const friend = this.recommendFriends.find(
        friend => friend.id === friendId
      );
      return friend.status == 1;
    }
  }
};
</script>

<style scoped>
.friend-card-section {
  margin: auto 100px;
  display: flex;
  flex-wrap: wrap;
  height: 520px;
  overflow-y: scroll;
}

.friend-card {
  background-color: white;
  width: 500px;
  height: 250px;
  border: 1px solid gray;
  border-radius: 10px;
  margin: 5px 35px;
}

.selected {
  background-color: azure;
}

.title {
  margin: 5px 0px;
  text-align: left;
  font-size: 36px;
  min-height: 50px;
}

.title-text {
  vertical-align: bottom;
}

.detail-title {
  max-width: 160px;
  margin-top: 10px;
  font-size: 18px;
  border-right: solid 2px lightgray;
}

.detail-platform {
  margin-top: 5px;
}

.platform-item-img {
  margin-right: 10px;
}

.platform-item {
  font-size: 24px;
  display: flex;
  padding: 0px 5px;
}

.action-button {
  width: 150px;
  font-size: 12px;
  color: white;
  font-weight: bold;
  border-radius: 7px;
  border-width: 2px;
  margin: 5px 0px;
  border-color: red;
}

.invite {
  background-color: red;
}

.decline {
  background-color: white;
  color: red;
}

.operation {
  margin-top: 20px;
}

.operation-title {
  max-width: 160px;
  margin-top: 10px;
  font-size: 18px;
  border-right: solid 2px lightgray;
}

.operation-item {
  width: 48px;
  height: 48px;
  margin: 0px 20px;
}

.friend-action-button {
  margin: 30px 10px 0 10px;
  bottom: 20px;
  width: 200px;
  height: 50px;
  font-weight: bold;
  font-size: 24px;
}
</style>
