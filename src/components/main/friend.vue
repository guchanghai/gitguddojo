<template>
  <div class="friend-card-section">
    <div v-for="friend in friends" :key="friend.id">
      <b-container class="friend-card">
        <b-row class="title">
          <b-col>
            <img class="platform-item-img" src="../../assets/profile-header-icon.png" />
            <span class="title-text">
              {{ friend.name }}
            </span>
          </b-col>
        </b-row>
        <b-row class="detail">
          <b-col class="detail-title">
            Platform ID
          </b-col>
          <b-col class="detail-platform">
            <div v-for="platform in friend.platforms" :key="platform">
              <b-col class="platform-item">
                <span>
                  <img class="platform-item-img" src="../../assets/platform-a.svg" />
                </span>
                  <span>
                    {{ platform }}
                </span>
              </b-col>
            </div>
          </b-col>
          <b-col class="detail-action">
            <b-button class="action-button invite">Select</b-button>
            <b-button class="action-button decline">Decline</b-button>
          </b-col>
        </b-row>
        <b-row class="operation">
          <b-col class="operation-title">
            Top Operations
          </b-col>
          <b-col class="operation-platform">
              <img class="operation-item" src="../../assets/operation-a.svg" />
              <img class="operation-item" src="../../assets/operation-b.svg" />
              <img class="operation-item" src="../../assets/operation-c.svg" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data(){
      return {
        friends: [
          {
            id: 1,
            name: 'Tommy',
            platforms: [
              'mxguy', 'steam', 'xbox'
            ]
          },
          {
            id: 1,
            name: 'Tommy',
            platforms: [
              'mxguy', 'steam', 'xbox'
            ]
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .friend-card-section {
    margin: auto 100px;
    display: flex;
  }

  .friend-card {
    background-color: white;
    width: 500px;
    height: 300px;
    border: 1px solid gray;
    border-radius: 10px;
    margin: 20px 50px;
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
    color: white;;
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
</style>