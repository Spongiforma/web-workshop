import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.teal.darken1,
        secondary: colors.teal.darken4,
        accent: colors.indigo.base,
      }
    }
  }
});
