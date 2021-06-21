<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="text-wrap">
        Settings
      </v-card-title>
      <div class="pa-8">
        Welcome visitor from {{ country }}
        <CountrySelect
          :country.sync="country"/>
        <v-switch
          v-model="$vuetify.theme.dark"
        />
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import CountrySelect from "@/components/CountrySelect.vue";

export default Vue.extend({
  name: "Main",
  components: {CountrySelect},
  data: function () {
    return {
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
