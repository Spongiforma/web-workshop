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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.user = {username: username};
    }
  }

});

export default store;

