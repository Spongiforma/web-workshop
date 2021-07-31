<template>

    <v-container>
      <v-img src="/public/assets/logo.png" alt="logo">
      </v-img>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-text-field
            v-model="name"
            label="Name"
            required>
        </v-text-field>
        <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required>
        </v-text-field>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate">
          Login
        </v-btn>
      </v-form>
    </v-container>
</template>

<script lang="ts">

import Vue from "vue";
import router from "@/plugins/router";

export default Vue.extend({
  data() {
    return  {
      valid: true,
      name: "",
      password: ""
    };
  },
  methods: {
    submit() {
      fetch("/auth/login",{
        method: "POST" ,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.name,
          password: this.password,
        })
      }).then(res => {
        if(res.status === 404){
          this.$store.state.loggedIn = true;
          router.push("home");
        } else {
          console.log("Unauthorized login");
        }
      });
      return false;
    },
    validate () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fetch("/auth/login",{
        method: "POST" ,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.name,
          password: this.password,
        })
      }).then(res => {
        if(res.status === 404 || res.status === 200){
          this.$store.commit("login",this.name);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.$refs.form.validate();
          router.push("/home");
        } else {
          console.log("Unauthorized login");
        }
      });
    },
  }
});
</script>

<style scoped lang="scss">


</style>
