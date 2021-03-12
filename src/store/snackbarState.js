let snackbarState = {
  namespaced: true,
  state: () => ({
    isSnackbar: false,
    message: "tes",
    timeout: 1000,
  }),
  getters: {
    getSnackbarObj(state) {
      let obj = {
        isSnackbar: state.isSnackbar,
        message: state.message,
        timeout: state.timeout,
      };
      return obj;
    },
    getIsSnackbar(state) {
      return state.isSnackbar;
    },
    getMessage(state) {
      return state.message;
    },
  },
  mutations: {},
  actions: {
    //APIs
    fire({ state, dispatch }, { message, timeout }) {
      message ? dispatch("setMessage", message) : null;
      timeout ? (state.timeout = timeout) : null;
      dispatch("setIsSnackbar", true);
    },
    //setter
    setIsSnackbar({ state }, bool) {
      state.isSnackbar = bool;
    },
    setMessage({ state }, msg) {
      state.message = msg;
    },
  },
};

export default snackbarState;
