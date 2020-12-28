export default {
  // exportする
  created() {
    console.log("start! from mixins."); // 起動後必ずログが出力される
  },

  data() {
    return {
      testData: {
        tes: this.helpers(),
        tes2: (e) => {
          console.log(e);
          return e;
        },
        snackFire: this.snackFire,
      },
      serverPass: "https://localhost:10443/", // サーバーサイドのパスを定義
    };
  },
  computed: {
    testComputed() {
      return "testComputed";
    },
    help33() {
      return {
        test22: () => {
          console.log("this 22", this);
          return "res";
        },
      };
    },
  },
  methods: {
    snackFire({ message, timeout }) {
      this.$store.dispatch("snackbarState/fire", {
        message: message,
        timeout: timeout ? timeout : null,
      });
    },
    testMethod() {
      console.log("testMethod");
    },
    logging() {
      console.log("logging from mixins.");
    },
  },

  computed: {
    twoBytwo() {
      return 2 * 2;
    },
  },
};
