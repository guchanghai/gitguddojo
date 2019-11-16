<template>
  <div class="main-page">
    <div class="side-bar">
      <b-container class="side-bar-container" fluid>
        <b-row class="side-bar-header">
          <b-col @click="showProfile" class="show-profile">My Dojo</b-col>
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
                    <b-list-group-item>Edit Platform ID</b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>
            </div>
            <div v-else>
              <b-row align-v="start">
                <b-col class="bar-middle-header">LFG Settings</b-col>
              </b-row>
              <b-row align-v="start">
                <b-col>
                  <b-list-group>
                    <b-list-group-item>Region</b-list-group-item>
                    <b-list-group-item>Ranked</b-list-group-item>
                    <b-list-group-item>Style</b-list-group-item>
                    <b-list-group-item>Platform</b-list-group-item>
                  </b-list-group>
                </b-col>
              </b-row>
            </div>
          </b-container>
        </b-row>
        <b-row class="side-bar-footer">
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
export default {
  data() {
    return {
      mode: ""
    };
  },
  methods: {
    showProfile() {
      this.mode = "profile";
      this.$router.replace("/main/profile");
      evt.preventDefault();
    },
    changePassword() {
      this.$router.replace("/main/password");
      evt.preventDefault();
    },
    signOut() {
      this.$router.replace("/");
      evt.preventDefault();
    }
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
  padding-top: 50px;
}

.show-profile {
  cursor: pointer;
}

.list-group-item {
  cursor: pointer;
}
</style>
