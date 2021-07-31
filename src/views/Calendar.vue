<template>
  <v-container fluid>
    <v-card>
      <v-calendar
          v-model="focus"
          ref="calendar"
          color="primary"
      >

      </v-calendar>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Calendar",
  data: function () {
    return {
      focus: "",
      name: "",
      mainOut: "",
      country: "Japan",
      darkTheme: this.$vuetify.theme.dark
    };
  },
});
</script>
<style lang="scss">

</style>
