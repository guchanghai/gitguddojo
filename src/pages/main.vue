<template>
  <div class="main-page">
    <div class="side-bar">
      <b-container class="side-bar-container" fluid>
        <b-row class="side-bar-header">
          <b-col @click="changeMode" class="show-profile">{{modeTitle()}}</b-col>
        </b-row>
        <b-row class="side-bar-middle">
          <b-container fluid>
            <div v-if="this.mode === 'profile'">
              <b-row align-v="start">
                <b-col class="bar-middle-header">Profile</b-col>
              </b-row>
              <b-row align-v="start">
                <b-col>
                  <b-list-group>
                    <b-list-group-item @click="showProfile">Edit Profile</b-list-group-item>
                    <b-list-group-item @click="changePassword">Change Password</b-list-group-item>
                    <b-list-group-item @click="editPlatform">Edit Platform ID</b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>
            </div>
            <div v-else-if="this.mode === 'chat'">
              <chat-history />
            </div>
            <div v-else>
              <b-row align-v="start">
                <b-col class="bar-middle-header">Profile</b-col>
              </b-row>
              <b-row align-v="start">
                <b-col>
                  <b-list-group>
                    <b-list-group-item @click="showProfile">Edit Profile</b-list-group-item>
                    <b-list-group-item @click="changePassword">Change Password</b-list-group-item>
                    <b-list-group-item @click="editPlatform">Edit Platform ID</b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>
            </div>
          </b-container>
        </b-row>
        <b-row class="side-bar-footer" v-if="this.mode !== 'chat'">
          <b-container fluid>
            <b-row align-v="start">
              <b-col class="bar-middle-header">Contact Us</b-col>
            </b-row>
            <b-row align-v="start">
              <b-col>
                <b-list-group>
                  <b-list-group-item>Support</b-list-group-item>
                  <b-list-group-item @click="signOut">Logout</b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
          </b-container>
        </b-row>
      </b-container>
    </div>
    <div class="main-action">
      <div class="main-action-header">
        <div class="header-img">
          <img src="../assets/main-header.svg" />
        </div>
      </div>
      <div class="main-action-area">
        <router-view class="view"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import chatHistory from "../components/chat/chat-history";
import axios from "axios";
import { mapGetters } from "vuex";

const MODE = {
  dashboard: "dashboard",
  chat: "chat",
  profile: "profile"
};

export default {
  components: {
    chatHistory
  },
  data() {
    return {};
  },
  async mounted() {
    await this.checkUserSession();
    // default to dashboard
    this.$store.commit("mode", "dashboard");
  },
  methods: {
    async checkUserSession() {
      // get current user profile
      try {
        await this.$store.dispatch("profile");
      } catch (e) {
        this.$router.replace("/");
      }
    },
    changeMode(evt) {
      if (this.showDashboard()) {
        this.$store.commit("mode", MODE.profile);
        this.$router.replace("/main/profile");
      } else {
        this.$store.commit("mode", MODE.dashboard);
        this.$router.replace("/main");
      }

      evt.preventDefault();
    },
    showDashboard() {
      return this.mode === MODE.dashboard;
    },
    showProfile(evt) {
      this.changeToProfile();
      this.$router.replace("/main/profile");
      evt.preventDefault();
    },
    changePassword(evt) {
      this.changeToProfile();
      this.$router.replace("/main/password");
      evt.preventDefault();
    },
    editPlatform(evt) {
      this.changeToProfile();
      this.$router.replace("/main/platform");
      evt.preventDefault();
    },
    async signOut(evt) {
      try {
        await axios.get("/api/logout/");
      } catch (e) {
        // TODO: logging
      }
      this.$router.replace("/");
      evt.preventDefault();
    },
    modeTitle() {
      if (this.showDashboard()) {
        return "My Dojo";
      } else {
        return "< Look For Group";
      }
    },
    changeToProfile() {
      if (this.showDashboard()) {
        this.$store.commit("mode", MODE.profile);
      }
    },
    lookForGroup(evt) {
      const currentRoute = this.$route.path;
      if (currentRoute !== "/main/friend") {
        this.$router.replace("/main/friend");
      } else {
        this.$store.dispatch("friend");
      }
      evt.preventDefault();
    }
  },
  computed: {
    ...mapGetters(["mode"])
  }
};
</script>

<style scoped>
.main-page {
  height: 100%;
  display: flex;
  background-color: lightgray;
}

.side-bar {
  width: 20%;
  border-right: solid 1px gray;
}

.side-bar-container {
  height: 100%;
}

.side-bar-header {
  color: white;
  padding-top: 15px;
  font-size: 24px;
  font-weight: bold;
  height: 8%;
  background-color: red;
}

.side-bar-middle {
  margin-top: 50px;
  height: 60%;
}

.bar-middle-header {
  color: red;
  font-weight: bold;
  text-align: left;
  margin: 10px 0px;
  font-size: 18px;
}

.main-action {
  width: 80%;
}

.main-action-header {
  min-height: 10%;
  background-color: white;
  padding: 20px;
}

.main-action-area {
  padding-top: 30px;
}

.show-profile {
  cursor: pointer;
}

.list-group-item {
  cursor: pointer;
}

.classify-group-item {
  cursor: pointer;
}
</style>
