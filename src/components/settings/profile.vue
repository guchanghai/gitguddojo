<template>
  <div class="profile">
    <b-container fluid>
      <b-row class="profile-header">
        <b-col class="row-label profile-header-icon" sm="3">
          <img class="profile-header-img" src="../../assets/profile-header.svg" />
        </b-col>
        <b-col sm="9">
          <div class="profile-header-info">
            <b-row>{{profile.username}}</b-row>
            <b-row>(Steam ID: {{profile.streamId}})</b-row>
          </div>
        </b-col>
      </b-row>
      <b-row class="profile-info-row" v-for="form in forms" :key="form.id">
        <b-col class="row-label" sm="3">
          <label :for="`${form.id}`">{{ form.name }}</label>
        </b-col>
        <b-col sm="9">
          <div v-if="form.type === 'file'">
            <b-form-file
              placeholder="Select an image file."
              accept="image/jpeg, image/png, image/gif"
              rows="4"
              max-rows="6"
              v-model="profilePhoto"
            ></b-form-file>
          </div>
          <div v-else-if="form.type === 'textarea'">
            <b-form-textarea placeholder rows="4" max-rows="6" v-model="form.value"></b-form-textarea>
          </div>
          <div v-else>
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
        <b-col class="row-label" sm="3"></b-col>
        <b-col class="submit-col" sm="9">
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
          id: "displayName",
          name: "Name",
          type: "text",
          value: ""
        },
        {
          id: "username",
          name: "User Name",
          type: "text",
          value: ""
        },
        {
          id: "email",
          name: "Email",
          type: "email",
          value: ""
        },
        {
          id: "streamId",
          name: "Steam ID",
          type: "text"
        },
        {
          id: "bio",
          name: "Bio",
          type: "textarea",
          value: "",
          class: "bio-info"
        },
        {
          id: "photo",
          name: "Photo Image",
          type: "file",
          value: "",
          class: "photo-info"
        }
      ],
      profilePhoto: null
    };
  },
  mounted() {
    const profile = this.profile;

    // initialize the session user info
    this.forms.forEach(form => {
      form.value = profile[`${form.id}`];
    });

    // edit steam ID on "Edit Platform ID"
    document.getElementById("streamId").setAttribute("readonly", "readonly");
  },
  computed: mapGetters(["profile"]),
  methods: {
    async onSubmit() {
      try {
        var request = {
          id: this.profile.id
        };

        this.forms.forEach(form => {
          request[`${form.id}`] = form.value;
        });

        await axios.post("/api/profile", qs.stringify(request));

        if (this.profilePhoto) {
          await axios.post(
            "/api/photo",
            { profilePhoto: this.profilePhoto },
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          );
        }

        // get latest profile
        await this.$store.dispatch("profile");

        this.$store.commit("notification", "Profile updated successfully!");
      } catch (error) {
        // Take no action on failure
        this.$store.commit("notification", "Profile updated failed!");
      }
    },
    uploadFile() {
      this.$refs["profile-photo-input"].$el.click();
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
</style>