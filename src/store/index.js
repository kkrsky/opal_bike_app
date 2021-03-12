import Vue from "vue";
import Vuex from "vuex";
import checkDeviceState from "./checkDeviceState.js";
import snackbarState from "./snackbarState.js";
import settingState from "./settingState.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tes: {
      namespaced: true,
      state: {
        tes2: "tes2",
      },
      mutations: {},
      actions: {},
      modules: {
        // tes: tes,
      },
    },
    checkDeviceState,
    snackbarState,
    settingState,
  },
});

// const tes = {
//   state: () => ({
//     tes2: "tes2",
//     meth() {
//       console.log("meth", this);
//     },
//   }),
// };
