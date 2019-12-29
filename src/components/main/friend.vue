<template>
  <div>
    <div class="friend-card-section">
      <div v-for="friend in friends" :key="friend.id">
        <b-container
          class="friend-card"
          :class="selectedFriendIds.includes( friend.id ) ? 'selected' : ''"
        >
          <b-row class="title">
            <b-col>
              <img class="platform-item-img" src="../../assets/profile-header-icon.png" />
              <span class="title-text">{{ friend.name }}</span>
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
              <b-button class="action-button invite" @click="confirm(friend.id)">Select</b-button>
              <b-button class="action-button decline" @click="decline(friend.id)">Decline</b-button>
            </b-col>
          </b-row>
          <b-row class="operation">
            <b-col class="operation-title">Top Operations</b-col>
            <b-col class="operation-platform">
              <img class="operation-item" src="../../assets/operation-a.svg" />
              <img class="operation-item" src="../../assets/operation-b.svg" />
              <img class="operation-item" src="../../assets/operation-c.svg" />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <b-button type="submit" variant="primary" class="start-chat-button" @click="startChat">OK</b-button>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      selectedFriends: [],
      selectedFriendIds: []
    };
  },
  mounted() {
    axios.get("/api/friends").then(
      function(response) {
        this.$store.commit("friends", response.data.friends);
      }.bind(this)
    );
  },
  methods: {
    startChat() {
      this.$router.replace("/main/chat");
    },
    confirm(friendId) {
      if (!this.selectedFriendIds.includes(friendId)) {
        this.selectedFriends.push(
          this.friends.filter(friend => friend.id === friendId)[0]
        );
        this.updateFriends();
      }
    },
    decline(friendId) {
      this.friends = this.friends.filter(friend => friend.id !== friendId);
      this.selectedFriends = this.selectedFriends.filter(
        friend => friend.id !== friendId
      );
      this.updateFriends();
    },
    updateFriends() {
      this.selectedFriendIds = this.selectedFriends.map(friend => friend.id);
      this.$store.commit("friends", this.selectedFriends);
    }
  },
  computed: {
    ...mapGetters([
      "friends"
    ])
  }
};
</script>

<style scoped>
.friend-card-section {
  margin: auto 100px;
  display: flex;
  flex-wrap: wrap;
  height: 620px;
  overflow-y: scroll;
}

.friend-card {
  background-color: white;
  width: 500px;
  height: 300px;
  border: 1px solid gray;
  border-radius: 10px;
  margin: 5px 35px;
}

.selected {
  background-color: azure;
}

.title {
  margin: 15px 0px;
  text-align: left;
  font-size: 36px;
  min-height: 60px;
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
  margin-top: 30px;
}

.operation-title {
  max-width: 160px;
  margin-top: 10px;
  font-size: 18px;
  border-right: solid 2px lightgray;
}

.operation-item {
  margin: 0px 20px;
}

.start-chat-button {
  margin-top: 10px;
  bottom: 20px;
  width: 200px;
  height: 50px;
  font-weight: bold;
  font-size: 24px;
}
</style>
