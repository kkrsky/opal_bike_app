import Vue from "vue";
import Vuex from "vuex";
import cds from "./checkDeviceState.js";

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

    cds: cds,
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
