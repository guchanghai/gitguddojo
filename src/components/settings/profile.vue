<template>
  <div class="profile">
    <b-container fluid>
        <b-row class="profile-header">
            <b-col class="row-label profile-header-icon" sm="3">
                <img class="profile-header-img" src="../../assets/profile-header.svg"/>
            </b-col>
            <b-col sm="9">
                <div class="profile-header-info" >
                    <b-row>Mr_Ashen_One</b-row>
                    <b-row>(Steam ID: mxguy)</b-row>
                    <b-row class="change-profile-photo">
                        <a href="#">Change profile photo</a>
                    </b-row>
                </div>
            </b-col>
        </b-row>
        <b-row class="profile-info-row" v-for="form in forms" :key="form.id">
            <b-col class="row-label" sm="3">
                <label :for="`${form.id}`">
                    {{ form.name }}
                </label>
            </b-col>
            <b-col sm="9">
                <div v-if="form.type === 'textarea'">
                    <b-form-textarea
                        id="textarea"
                        placeholder="Passionate about R6. Diamond player. Looking for serious, communicative team player to rank up together."
                        rows="4"
                        max-rows="6"
                        >
                    </b-form-textarea>
                </div>
                <div v-else>
                    <b-form-input :class="`${form.class}`" :id="`${form.id}`" :type="`${form.type}`"></b-form-input>

                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="row-label" sm="3">
            </b-col>
            <b-col class="submit-col" sm="9">
                <b-button class="submit-btn" type="submit" variant="primary">Submit</b-button>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forms: [
        {
          id: "name",
          name: "Name",
          type: "text"
        },
        {
          id: "userName",
          name: "User Name",
          type: "text"
        },
        {
          id: "email",
          name: "Email",
          type: "email"
        },
        {
          id: "bio",
          name: "Bio",
          type: "textarea",
          class: "bio-info"
        }
      ]
    };
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