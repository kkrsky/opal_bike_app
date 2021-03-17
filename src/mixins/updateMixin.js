export default {
  data() {
    return {
      watchUpdate: 0,
      update: {
        watchFunction: this.watchFunction,
        doUpdate: this.doUpdate,
      },
    };
  },
  computed: {
    currentBleConnectDevice() {
      return this.$store.getters["settingState/getCurrentBleConnectDevice"];
    },
  },
  methods: {
    watchFunction() {
      this.$store.dispatch("checkDeviceState/checkState", {
        deviceBleChangeEventCallback: this.deviceBleChangeEventCallback,
      });
    },
    doUpdate() {
      this.watchUpdate++;
    },
    deviceBleChangeEventCallback(state) {
      switch (state) {
        case "powered_off": {
          // this.update.doUpdate();
          break;
        }
        case "powering_on": {
          // this.update.doUpdate();
          break;
        }
      }
    },
  },
  watch: {
    watchUpdate() {
      this.update.watchFunction();
    },
  },
};
