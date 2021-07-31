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
        <v-card v-for="student in students"
                class="student-cards"
                outlined
               :key="student._id"
            max-width="444">
          <a>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                {{ student.class }}
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ student.name }}
              </v-list-item-title>
              <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar
                tile
                size="80"
                color="grey"
            ></v-list-item-avatar>
          </v-list-item>
          </a>
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
    };
  },
  methods: {
    async getStudents() {
      return fetch("/api/student").then(res => res.json()).then(res => {
        return res;
      });
    }
  },
  async mounted() {
    const res = await this.getStudents();
    console.log(res);
    if (res.length > 1) {  // but it does work
      this.restricted = false;
      this.students = res;
    } else {

    }
  }
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

</style>
