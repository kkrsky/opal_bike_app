import checkDeviceState_location from "./checkDeviceState/checkDeviceState_location.js";
import checkDeviceState_bluetooth from "./checkDeviceState/checkDeviceState_bluetooth.js";
let checkDeviceState = {
  namespaced: true,

  // モジュールのアセット
  state: () => ({
    isDiagnostic: false,
    isDevice: false,
    isGeolocation: false,
    isBluetooth: false,
    bikeState: {
      connectType: 0,
      modeType: 0,
    },
    deviceState: {
      bluetooth: {
        bluetoothState: null,
        isBluetoothAvailable: null,
        //android
        isBluetoothEnabled: null,
        hasBluetoothSupport: null,
        hasBluetoothLESupport: null,
        hasBluetoothLEPeripheralSupport: null,
      },
      location: {
        isLocationAvailable: false,
        isLocationEnabled: false,
        isLocationAuthorized: false,
        locationAuthorizationMode: "",
        locationAuthorizationStatus: "",
        registerLocationStateChangeHandler: false, //locationが使える場合はtrue(動的検知)

        //android
        android_locationMode: "",
        android_isGpsLocationAvailable: false,
        android_isGpsLocationEnabled: false,
        android_isNetworkLocationAvailable: false,
        android_isNetworkLocationEnabled: false,

        //ios
        ios_locationAccuracyAuthorization: "", //FULL or REDUCED
      },
      network: {
        connection: null,
      },
    },
    deviceInfo: { platform: "none" },
  }),
  getters: {
    getCurrentBleState: (state) => {
      return state.deviceState.bluetooth;
    },
    getCurrentBikeState: (state) => {
      return state.bikeState;
    },
  },
  actions: {
    checkState({ commit, dispatch }) {
      let onDeviceReady = () => {
        console.log("[start] checkDeviceState");
        let deviceBleChangeEventCallback = () => {};
        commit("init");
        dispatch("checState_bluetooth_init", {
          eventCallback: deviceBleChangeEventCallback,
        });
        // dispatch("checState_location_init");
        // dispatch("checState_network_init");
      };

      window.document.addEventListener("deviceready", onDeviceReady, false);
    },

    checState_location_init({ state }) {
      checkDeviceState_location.init({ state });
    },
    checState_network_init({ state, commit }) {
      if (window.navigator.connection) {
        // state.deviceState.network.connection
        var networkState = window.navigator.connection.type;
        var states = {};
        states[window.navigator.connection.UNKNOWN] = "Unknown connection";
        states[window.navigator.connection.ETHERNET] = "Ethernet connection";
        states[window.navigator.connection.WIFI] = "WiFi connection";
        states[window.navigator.connection.CELL_2G] = "Cell 2G connection";
        states[window.navigator.connection.CELL_3G] = "Cell 3G connection";
        states[window.navigator.connection.CELL_4G] = "Cell 4G connection";
        states[window.navigator.connection.CELL] = "Cell generic connection";
        states[window.navigator.connection.NONE] = "No network connection";
        // window.alert(networkState);
        if (networkState === states[Connection.NONE]) {
          window.alert("Connection type: " + states[networkState]);
        }
      }
    },

    //bluetooth
    checState_bluetooth_init({ state }, { eventCallback }) {
      checkDeviceState_bluetooth.init({ state, eventCallback });
    },
    open_bluetooth_setting({ state }) {
      checkDeviceState_bluetooth.openSetting({ state });
    },

    //bike state
    setBikeState({ state }, { connectType, modeType }) {
      state.bikeState.connectType = connectType;
      state.bikeState.modeType = modeType;
    },
  },
  mutations: {
    /**
     *
     * プラグインの状態確認
     */
    init(state) {
      //プラグインの状態確認
      // console.log("init", this);
      if (cordova.plugins.diagnostic) state.isDiagnostic = true;
      if (window.device) {
        state.isDevice = true;
        state.deviceInfo = window.device;
        state.deviceInfo.platform = state.deviceInfo.platform.toLowerCase();
      }
      if (window.navigator.geolocation) state.isGeolocation = true;
    },
  },
};

export default checkDeviceState;
