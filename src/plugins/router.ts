import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Main from "@/views/Main.vue";
import Settings from "@/views/Settings.vue";
import Login from "@/views/Login.vue";
import store from "@/plugins/vuex";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
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
