<template>
  <v-container fluid>
    <v-card class="card-layout">
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
          :headers="headersGrades">
        </v-data-table>
      </div>
    </v-card>
    <v-card class="card-layout">
      <v-card-title class="text-wrap">
        <div>
          Modules
        </div>
        <v-spacer/>
      </v-card-title>
      <div class="pa-8">
        <v-data-table
            :items="modules"
            :headers="headersModules">
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
      modules: [],
      headersGrades: [
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
      },{
        text: "MC",
          value: "MC",
        }
      ],
      headersModules: [
        {
          text: "Code",
          value: "code",
        },
        {
          text: "Module Name",
          value: "title",
        },
        {
          text: "Teacher",
          value: "teacher",
        },
        {
          text: "Description",
          value: "description",
        },
        {
          text: "MC",
          value: "MC",
        }
      ]
    };
  },
  methods: {
    async getGrades() {
      return fetch("/api/grades",{
        method: "GET"
      }).then(res=> res.json()).then(async res => {
        this.modules = [];
        for (let r of res) {
          const tmp = await this.getModule(r.moduleID);
          this.modules.push(tmp);
        }
        console.log(this.modules);
        const grades = [];
        for (let i =0; i<res.length; ++i) {
          grades.push({
            comment: res[i].comments,
            grade: res[i].grade,
            moduleID: this.modules[i].code,
            moduleName: this.modules[i].title,
            MC: this.modules[i].MC,
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
    // console.log(this.grades);
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
.card-layout {
  margin: 1rem;
}

</style>
