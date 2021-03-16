let helpers = {
  data() {
    return {
      helper: {
        //connector,API呼び出し部分
        //return val
        _cp: this._cp,
        //void
        snackFire: this.snackFire,
        eventFire: this.eventFire,
        eventListen: this.eventListen,
      },
    };
  },
  computed: {},
  methods: {
    //return val
    _cp(obj) {
      /**
       * @param {Object,Array} obj ディープコピー
       * undefinedの場合もコピーできるように対応
       */
      if (Array.isArray(obj)) {
        let includeFunction = obj.find((item) => {
          return typeof item === "function";
        });
        if (includeFunction) {
          console.error("関数型の配列はコピーできません。");
          return false;
        } else {
          const currentState = window.history.state;
          window.history.replaceState(obj, null);

          const clone = window.history.state;
          window.history.replaceState(currentState, null);
          return clone;
        }
      } else {
        let keys = Object.keys(obj);
        let includeFunction = keys.find((key) => {
          return typeof obj[key] === "function";
        });

        if (includeFunction) {
          console.error("関数型のオブジェクトはコピーできません。");
          return false;
        } else {
          const currentState = window.history.state;
          window.history.replaceState(obj, null);

          const clone = window.history.state;
          window.history.replaceState(currentState, null);
          return clone;
        }
      }
    },
    //void
    snackFire({ message, timeout, btnArry }) {
      this.$store.dispatch("snackbarState/fire", {
        message: message,
        timeout: timeout ? timeout : null,
        btnArry: btnArry ? btnArry : null,
      });
    },
    eventFire(eventName, propObj) {
      const ev = new CustomEvent(eventName, { detail: propObj });
      window.document.dispatchEvent(ev);
    },
    eventListen(eventName, callback) {
      window.document.addEventListener(eventName, callback, false);
    },
  },
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  components: {},
};

export default helpers;
