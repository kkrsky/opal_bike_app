import Vue from "vue";
import Vuex from "vuex";
import cds from "./checkDeviceState.js";
import recordState from './recordState.js'
// import checkFcmState from "./checkFcmState.js";

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
    main: {
      namespaced: true,
      state: {
        click_iconBtnTransition: false,
      },
      mutations: {},
      actions: {
        click_iconBtnTransition(state, bool) {
          state.click_iconBtnTransition = bool;
        },
      },
      modules: {
        // tes: tes,
      },
    },

    cds: cds,
    recordState:recordState
    // checkFcmState: checkFcmState,
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
