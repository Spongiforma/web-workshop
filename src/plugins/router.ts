import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Main from "@/views/Main.vue";
import Settings from "@/views/Settings.vue";
import Login from "@/views/Login.vue";
import store from "@/plugins/vuex";
import {VCalendar} from "vuetify/lib/components";
import Calendar from "@/views/Calendar.vue";
import Admin from "@/views/Admin.vue";
import Profile from "@/views/Profile.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "*",
    redirect: "/home",
    meta: {
      reqAuth: true,
    }
  },
  {
    path: "/home",
    component: Main,
    meta: {
      reqAuth: true,
    }
  },
  {
    path: "/settings",
    component: Settings,
    meta: {
      reqAuth: true,
    }
  },
  {
    path: "/login",
    component: Login,
    meta: {
      reqAuth: false,
    }
  },
  {
    path: "/calendar",
    component: Calendar,
    meta: {
      reqAuth: true,
    }
  },
  {
    path: "/admin",
    component: Admin,
    meta: {
      reqAuth: true,
    }
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      reqAuth: true,
    }
  }
];

const router =  new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const reqAuth = to.matched.some(x => x.meta.reqAuth);
  if (reqAuth && !store.state.loggedIn){
    next("/login");
  } else {
    next();
  }
});

export default router;
