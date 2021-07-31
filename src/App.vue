<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawerShown"
      temporary app>

      <v-list-item>
        <v-list-item-content>
          <v-img src="@/../public/assets/logo.png" max-width="140px" class="logo-img mx-auto"></v-img>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list
        dense
        nav>
        <router-link v-for="item in routes"
                     :to="item.route"
                     @click="drawerShown = false"
                     style="text-decoration: none; color: inherit;"
                     :key="item.name">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider/>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon
                          @click="drawerShown = !drawerShown"/>
      <v-toolbar-title>
        Espace
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/plugins/vuex";

export default Vue.extend({
  name: "App",
  components: {},
  data: () => ({
    drawerShown: false,
    store: store,
  }),
  computed: {
    routes(): Array<{
      name: string;
      route: string;
      icon: string;
    }> {
      // Add routes here to correspond to router.ts
      return [
        {
          name: "Home",
          route: "/home",
          icon: "mdi-home",
        },
        {
          name: "Settings",
          route: "/settings",
          icon: "mdi-cog",
        },
        {
          name: "Calendar",
          route: "/calendar",
          icon: "mdi-calendar",
        },
        {
          name: "Admin",
          route: "/admin",
          icon: "mdi-pencil",
        },
        {
          name: "Profile",
          route: "/profile",
          icon: "mdi-account",
        },
      ];
    },
  }
});
</script>
<style lang="scss">
.logo-img {
  margin-left: auto;
  margin-right: auto;
}
</style>
