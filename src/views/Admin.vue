<template>
  <v-container v-if="$store">
    <template v-if="restricted">
      <h1>
        Restricted
      </h1>
    </template>
    <template v-else>
      <v-card class="layout-card">
        <h1>Students</h1>
        <div class="flex-container">
         <v-menu v-for="student in students"
             v-model="menu[student._id]"
                 :key="student._id"
                 offset-y
         :close-on-content-click="false">

           <template v-slot:activator="{on, attrs}">
          <v-card
                class="student-cards"
                outlined
               :key="student._id"
            min-width="284">
          <a
          v-on="on"
          v-bind="attrs">
          <v-list-item three-line>
            <v-img class="avatar"
                max-width="80"
                v-if="student.profilePicture"
                :src="student.profilePicture">
            </v-img>
            <v-img v-else class="avatar"
                   max-width="80"
                   src="@/../public/assets/default_avatar.svg"/>
            <v-list-item-content>
              <div class="text-overline mb-4">
                {{ student.class }}
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ student.name }}
              </v-list-item-title>
<!--              <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>-->
            </v-list-item-content>

          </v-list-item>
          </a>
        </v-card>
           </template>

           <v-card class="popover">
             <v-list>
               <v-list-item>
                  <v-text-field
                  label="Image Link"
                  placeholder="Profile Picture"
                  v-model="studentPfps[student._id]"
                  >
                  </v-text-field>
               </v-list-item>
              <v-list-item>
                <v-text-field
                    label="Language"
                    placeholder="Language"
                    v-model="studentLang[student._id]"
                />
              </v-list-item>
               <v-btn v-on:click="studentUpdate(student)">
                  Update
               </v-btn>
             </v-list>
           </v-card>
         </v-menu>
        </div>
      </v-card>


      <v-card class="layout-card">
        <h1 id="module-title">Modules</h1>
        <v-menu v-model="addModuleMenu"
                :close-on-content-click="false"
        offset-x>
          <template v-slot:activator="{on, attrs}">
        <v-btn class="inline-block" id="module-add" v-on="on" v-bind="attrs">Add Module</v-btn>
          </template>
          <v-card class="popover"
          width="400px">
            <v-text-field
              label="Code"
            v-model="code"/>
            <v-text-field
                label="Title"
            v-model="title"/>
            <v-text-field
                label="Teacher"
            v-model="teacher"/>
            <v-textarea
                label="Description"
            v-model="description"/>
            <v-slider
                label="MC"
               hint="MC"
                min="0"
                max="12"
                v-model="MC"
            thumb-label="always">
            </v-slider>
            <v-btn @click="createModule()">Submit</v-btn>
          </v-card>

        </v-menu>


        <div class="flex-container">
        <v-card
            v-for="module in modules"
            class="module-cards"
            outlined
            :key="module._id"
            width="400">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  {{ module.code }}
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ module.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </v-card>
        </div>
      </v-card>
    </template>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data()  {
    return {
      students: [],
      restricted: true,
      menu: {},
      studentPfps: {},
      studentLang: {},
      modules: [],
      overlay: false,
      addModuleMenu: false,
      teacher: "",
      description: "",
      MC: 0,
      title: "",
      code: "",
    };
  },
  methods: {
    async getStudents() {
      return fetch("/api/student").then(res => res.json()).then(res => {
        return res;
      });
    },
    studentUpdate(student: any) {
      // console.log(student._id);
      fetch(`/api/student/${student._id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          profilePicture: this.studentPfps[student._id],
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          language: this.studentLang[student._id],
        })
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.menu[student._id] = false;
      return true;
    },
    async getModules() {
      return fetch("/api/modules").then(res => res.json()).then(res => {
        return res;
      });
    },
    createModule() {
      fetch("/api/modules",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "code":this.code,
          "title":this.title,
          "teacher": this.teacher,
          "MC":this.MC,
          "description": this.description,
        })
      });
      this.addModuleMenu = false;
    }
  },

  async mounted() {
    const res = await this.getStudents();
    // console.log(res);
    if (res.length > 1) {  // but it does work
      this.restricted = false;
      this.students = res;
      this.modules = await this.getModules();
      this.menu = {};
      this.studentLang = {};
      this.studentPfps = {};
      for (let s of this.students) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.menu[s._id] = false;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.studentLang[s._id]  = s.langauge;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.studentPfps[s._id]  = s.profilePicture;
      }
    } else {

    }
  },

});
</script>

<style scoped lang="scss">
.layout-card {
  padding: 4rem;
  margin: 1rem;
}
.student-cards, .module-cards {
  margin: 1rem;
}
.flex-container {
  display: flex;
}
.popover {
  padding: 1rem;
}

#module-add {
  margin: 1rem;
}

.avatar {
  margin-right: 1rem;
}

</style>
