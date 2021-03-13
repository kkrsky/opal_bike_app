let snackbarState = {
  namespaced: true,
  state: () => ({
    isSnackbar: false,
    message: "tes",
    timeout: 1000,
    btnArry: [
      // {
      //   title: "testBtn",
      //   click: () => {
      //     window.alert("clicked");
      //   },
      // },
      // {
      //   title: "testBtn2",
      //   click: () => {
      //     window.alert("clicked");
      //   },
      // },
    ],
  }),
  getters: {
    getSnackbarObj(state) {
      let obj = {
        isSnackbar: state.isSnackbar,
        message: state.message,
        timeout: state.timeout,
        btnArry: state.btnArry,
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
    fire({ state, dispatch }, { message, timeout, btnArry }) {
      message ? dispatch("setMessage", message) : null;
      timeout ? (state.timeout = timeout) : null;
      btnArry ? dispatch("setBtnArry", btnArry) : [];
      dispatch("setIsSnackbar", true);
    },
    //setter
    setIsSnackbar({ state }, bool) {
      state.isSnackbar = bool;
    },
    setMessage({ state }, msg) {
      state.message = msg;
    },
    setBtnArry({ state }, btnArry) {
      if (Array.isArray(btnArry)) {
        btnArry = btnArry.map((obj) => {
          if (obj.click) return obj;
          else {
            obj.click = () => {
              null;
            };
            return obj;
          }
        });
        state.btnArry = btnArry;
      } else {
        state.btnArry = [];
      }
    },
  },
};

export default snackbarState;
