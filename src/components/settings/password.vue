<template>
  <div class="password">
    <b-container fluid>
      <b-row class="profile-header">
        <b-col class="row-label profile-header-icon" sm="5">
          <img class="profile-header-img" src="../../assets/profile-header.svg" />
        </b-col>
        <b-col sm="7">
          <div class="profile-header-info">
            <b-row>{{profile.username}}</b-row>
            <b-row>(Steam ID: {{profile.streamId}})</b-row>
          </div>
        </b-col>
      </b-row>
      <b-row class="profile-info-row" v-for="form in forms" :key="form.id">
        <b-col class="row-label" sm="5">
          <label :for="`${form.id}`">{{ form.name }}</label>
        </b-col>
        <b-col sm="7">
          <div>
            <b-form-input
              :class="`${form.class}`"
              :id="`${form.id}`"
              :type="`${form.type}`"
              v-model="form.value"
            ></b-form-input>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="row-label" sm="5"></b-col>
        <b-col class="submit-col" sm="7">
          <b-button
            class="submit-btn"
            type="submit"
            variant="primary"
            @click="onSubmit"
          >Change Password</b-button>
        </b-col>
      </b-row>
      <!-- <b-row class="forgot-password">
        <b-col class="row-label" sm="5"></b-col>
        <b-col class="submit-col" sm="7">
          <a class="forgot-password-col" href>Forgot Password?</a>
        </b-col>
      </b-row>-->
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import qs from "qs";

export default {
  data() {
    return {
      forms: [
        {
          id: "oldPassword",
          name: "Old Password",
          type: "password"
        },
        {
          id: "newPassword",
          name: "New Password",
          type: "password"
        },
        {
          id: "confirmNewPassword",
          name: "Confirm New Password",
          type: "password"
        }
      ]
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(["profile"])
  },
  methods: {
    async onSubmit() {
      var request = {
        id: this.profile.id
      };

      this.forms.forEach(form => {
        request[`${form.id}`] = form.value;
      });

      if (request.newPassword)
        try {
          // check old and new password
          if (request.newPassword !== request.confirmNewPassword) {
            this.$store.commit(
              "notification",
              "Two new passwords are different!"
            );
            return;
          }

          await axios.post("/api/password", qs.stringify(request));
          // get latest profile
          await this.$store.dispatch("profile");

          this.$store.commit("notification", "Password updated successfully!");
        } catch (error) {
          // Take no action on failure
          this.$store.commit("notification", "Password updated failed!");
        }
    }
  }
};
</script>

<style scoped>
.password {
  width: 40%;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  padding: 30px 30px 30px 0px;
}

.profile-header {
  min-height: 80px;
}

.profile-header-icon {
  padding: 0px;
}

.profile-header-img {
  width: 60px;
}

.profile-header-info {
  margin: 0px 25px;
}

.profile-info-row {
  margin: 20px 0px;
}

.row-label {
  width: 40px;
  text-align: right;
  font-weight: bold;
}

.change-profile-photo {
  font-size: 14px;
}

.submit-col {
  text-align: left;
}

.submit-btn {
  margin: 10px 0px 0px 8px;
}

.forgot-password {
  margin: 20px 0px 0px 0px;
}
</style>