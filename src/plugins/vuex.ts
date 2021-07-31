import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loggedIn: false,
    user: null,
  },
  mutations: {
    login (state,username) {
      state.loggedIn = true;
      // @ts-ignore
      state.user = {username: username};
    }
  }

});

export default store;

