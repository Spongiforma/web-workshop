<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="text-wrap">
        <div v-if="name">
          Your profile
        </div>
        <div v-else>
          Grades
        </div>
        <v-spacer/>
      </v-card-title>
      <div class="pa-8">
        <v-data-table
          :items="grades"
          :headers="headers">
        </v-data-table>
      </div>
    </v-card>
  </v-container>
</template>

<script >
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
      posts: [],
      grades: [],
      headers: [
          {
            text: "Module ID",
            value: "moduleID"
      },
        {
          text: "Module Name",
          value: "moduleName"
        },
        {
          text: "Grade",
          value: "grade"
        },
        {
        text: "comments",
        value: "comment"
      }, {
        text: "Tags",
        value: "tag_string",
      },{
        text: "Image",
        value: "file_url",
      },{
        text: "Name",
        value: "name",
      },]
    };
  },
  methods: {
    async getGrades() {
      return fetch("/api/grades",{
        method: "GET"
      }).then(res=> res.json()).then(async res => {
        const modules = [];
        for (let r of res) {
          const tmp = await this.getModule(r.moduleID);
          modules.push(tmp);
        }
        console.log(modules);
        const grades = [];
        for (let i =0; i<res.length; ++i) {
          grades.push({
            comment: res[i].comments,
            grade: res[i].grade,
            moduleID: modules[i].code,
            moduleName: modules[i].title,
          });
        }
        return grades;
      });
    },

    async getModule(moduleID) {
      return fetch("/api/modules").then(res=>res.json()).then(res => {
        // console.log(res);
        return res.find(e => e._id === moduleID);
      });
    }
  },
  async mounted() {
    this.grades = await this.getGrades();
    console.log(this.grades);
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
