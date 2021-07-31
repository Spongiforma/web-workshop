<template>
  <v-container>
    <v-card class="card">
        <v-img class="center profile-img" max-width="200px" src="@/../public/assets/logo.png" ></v-img>
        <h3> Name: </h3> <p>{{ user.name }}</p>
    </v-card>
  </v-container>
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend({
  data()  {
    return {
      user: {},
    };
  },
  methods : {
    getUser() {
      return fetch("/api/student").then(res => res.json()).then(res => {
        return res[0];
      });
    }
  },
  async mounted() {
    this.user = await this.getUser();
    console.log(this.user);
  }

});

</script>

<style scoped lang="scss">

.profile-img {
  margin-left: auto;
  margin-right: auto;
}

.card {
  padding: 2rem;
}
</style>
