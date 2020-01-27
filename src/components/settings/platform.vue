<template>
  <div class="profile">
    <b-container fluid>
      <b-row class="profile-header">
        <b-col class="row-label profile-header-icon" sm="4">
          <img class="profile-header-img" src="../../assets/profile-header.svg" />
        </b-col>
        <b-col sm="5">
          <div class="profile-header-info">
            <b-row>{{profile.username}}</b-row>
          </div>
        </b-col>
      </b-row>
      <b-row class="profile-info-row" v-for="form in forms" :key="form.id">
        <b-col class="row-label" sm="4">
          <label :for="`${form.id}`">{{ form.name }}</label>
        </b-col>
        <b-col sm="5">
          <b-form-input
            :class="`${form.class}`"
            :id="`${form.id}`"
            :type="`${form.type}`"
            v-model="form.value"
          ></b-form-input>
        </b-col>
        <b-col sm="3" v-if="form.action">
          <b-button class="verify-btn" type="submit" variant="primary" @click="onVerify">Verify</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="row-label" sm="4"></b-col>
        <b-col class="submit-col" sm="8">
          <b-button class="submit-btn" type="submit" variant="primary" @click="onSubmit">Submit</b-button>
        </b-col>
      </b-row>
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
          id: "streamId",
          name: "Current Steam ID",
          type: "text",
          value: ""
        },
        {
          id: "newStreamId",
          name: "Change ID",
          type: "text",
          action: true
        }
      ]
    };
  },
  mounted() {
    const profile = this.profile;

    // initialize the session user info
    this.forms.forEach(form => {
      form.value = profile[`${form.id}`];
    });
  },
  computed: {
    ...mapGetters(["profile"])
  },
  methods: {
    async onSubmit() {
      try {
        var request = {
          id: this.profile.id
        };

        this.forms.forEach(form => {
          request[`${form.id}`] = form.value;
        });

        await axios.post("/api/stream", qs.stringify(request));

        // get latest profile
        await this.$store.dispatch("profile");

        this.$store.commit("notification", "Platform updated successfully!");
      } catch (error) {
        // Take no action on failure
        this.$store.commit("notification", "Platform updated failed!");
      }
    },
    async onVerify() {
      try {
        var request = {
          id: this.profile.id
        };

        this.forms.forEach(form => {
          request[`${form.id}`] = form.value;
        });

        await axios.post("/api/verifySteam", qs.stringify(request));

        this.$store.commit("notification", "Steam ID verified!");
      } catch (error) {
        // Take no action on failure
        this.$store.commit("notification", "Steam ID cannot be verified!");
      }
    }
  }
};
</script>

<style scoped>
.profile {
  width: 50%;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
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
  margin: 15px 25px 0 25px;
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

.verify {
  margin-top: 0px;
}

.submit-col {
  text-align: left;
}

.submit-btn {
  margin: 10px 0px 0px 8px;
}
</style>