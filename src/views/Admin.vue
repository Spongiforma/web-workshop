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
         :close-on-content-click="false">

           <template v-slot:activator="{on, attrs}">
          <v-card
                class="student-cards"
                outlined
               :key="student._id"
            max-width="444">
          <a
          v-on="on"
          v-bind="attrs">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                {{ student.class }}
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ student.name }}
              </v-list-item-title>
<!--              <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>-->
            </v-list-item-content>
            <v-img
                max-width="80"
                v-if="student.profilePicture"
                :src="student.profilePicture">
            </v-img>
            <v-img v-else
            max-width="80"
            src="@/../public/assets/logo.png"/>
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
  },

  async mounted() {
    const res = await this.getStudents();
    // console.log(res);
    if (res.length > 1) {  // but it does work
      this.restricted = false;
      this.students = res;
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
}
.student-cards {
  margin: 1rem;
}
.flex-container {
  display: flex;
}
.popover {
  padding: 1rem;
}

</style>
