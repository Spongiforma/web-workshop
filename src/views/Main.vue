<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="text-wrap">
        <div v-if="name === ''">
          Your profile
        </div>
        <div v-else>
          Welcome to Vue, {{ name }}
        </div>
        <v-spacer/>
      </v-card-title>
      <div class="pa-8">
        <v-text-field
          v-model="name"
          label="Name"
        >
        </v-text-field>
        <v-data-table
          :items="posts"
          :headers="headers">
          <template v-slot:item.file_url="{ item }">
            <v-img class="post-image"
            :src="item.file_url" :alt="item.id"/>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import api from "@/api/main";
import {Post} from "@/types/Post";
import {BooruAPI} from "@/api/api";
import {DataTableHeader} from "vuetify";

export default Vue.extend({
  name: "Main",
  data: function () {
    return {
      name: "",
      mainOut: "",
      posts: [] as Post[],
      headers: [{
        text: "ID",
        value: "id"
      }, {
        text: "Tags",
        value: "tag_string",
      },{
        text: "Image",
        value: "file_url",
      },{
        text: "Name",
        value: "name",
      },] as DataTableHeader[]
    };
  },
  async mounted() {
    this.mainOut = await api.main();
    this.posts = await new BooruAPI().popularPosts;
  },
});
</script>
<style lang="scss">
.post-image {
  width: 200px;
  height: 200px;
  padding: 3px;
  //object-fit: cover;
  //display: block;
  &:hover {
    z-index: 1;
    transform: scale(2.2);
  }
}

</style>
