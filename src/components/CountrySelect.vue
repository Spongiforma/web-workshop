<template>
  <v-autocomplete
    @change="handleUpdate"
    v-model="selectedCountry"
    :items="countries"
    label="Country"/>
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend({
  name: "CountrySelect",
  props: {
    country: {
      type: String,
    }
  },
  data: function () {
    return {
      countries: [
        "UK",
        "America",
        "United Arab Emirates",
        "Netherlands",
        "Japan"
      ],
      selectedCountry: this.$props.country
    };
  },
  methods : {
    handleUpdate() {
      this.$emit("update:country",this.selectedCountry);
    }
  }
});
</script>

<style scoped>

</style>
