let checkDeviceState_bluetooth = {
  isFirst: true,
  init({ state, eventCallback }) {
    if (this.isFirst) {
      this.registerBluetoothStateChangeHandler(state, eventCallback);
      this.isFirst = false;
    }
    if (state.isDiagnostic && state.isDevice) {
      this.getBluetoothState(state);
      this.isBluetoothAvailable(state);

      if (state.deviceInfo.platform === "android") {
        //android
        this.isBluetoothEnabled_android(state);
        this.hasBluetoothSupport_android(state);
        this.hasBluetoothLESupport_android(state);
        this.hasBluetoothLEPeripheralSupport_android(state);
        // this.setBluetoothState_android(bool);
        // this.switchToBluetoothSettings_android();
      }
      if (state.deviceInfo.platform === "ios") {
        //ios
        this.requestBluetoothAuthorization_ios();
      }
    }
  },
  openSetting({ state }) {
    if (state.isDiagnostic && state.isDevice) {
      if (state.deviceInfo.platform === "android") {
        //android
        this.switchToBluetoothSettings_android();
      }
      if (state.deviceInfo.platform === "ios") {
        //ios
      }
    }
  },

  //utils
  onFaild(error) {
    console.error(error);
  },
  //////////////////////////
  //////////////////////////
  //////////////////////////

  getBluetoothState(state) {
    //Returns the state of Bluetooth on the device. Calling on iOS 13+ will request runtime permission to access Bluetooth (if not already requested).
    let onSuccess = (resState) => {
      // console.log("resState", resState);
      state.deviceState.bluetooth.bluetoothState = resState;
    };
    cordova.plugins.diagnostic.getBluetoothState(onSuccess, this.onFaild);
  },
  isBluetoothAvailable(state) {
    let onSuccess = (resState) => {
      state.deviceState.bluetooth.isBluetoothAvailable = resState;
    };
    cordova.plugins.diagnostic.isBluetoothAvailable(onSuccess, this.onFaild);
  },
  registerBluetoothStateChangeHandler(state, callback) {
    let onSuccess = (resState) => {
      state.deviceState.bluetooth.bluetoothState = resState;
      console.log("on change state:", resState);
      this.init({ state });
      if (callback) callback(resState);
    };
    cordova.plugins.diagnostic.registerBluetoothStateChangeHandler(onSuccess);
  },

  //android
  isBluetoothEnabled_android(state) {
    let onSuccess = (resState) => {
      state.deviceState.bluetooth.isBluetoothEnabled = resState;
    };
    cordova.plugins.diagnostic.isBluetoothAvailable(onSuccess, this.onFaild);
  },
  hasBluetoothSupport_android(state) {
    let onSuccess = (resState) => {
      state.deviceState.bluetooth.hasBluetoothSupport = resState;
    };
    cordova.plugins.diagnostic.hasBluetoothSupport(onSuccess, this.onFaild);
  },
  hasBluetoothLESupport_android(state) {
    let onSuccess = (resState) => {
      state.deviceState.bluetooth.hasBluetoothLESupport = resState;
    };
    cordova.plugins.diagnostic.hasBluetoothLESupport(onSuccess, this.onFaild);
  },
  hasBluetoothLEPeripheralSupport_android(state) {
    let onSuccess = (resState) => {
      state.deviceState.bluetooth.hasBluetoothLEPeripheralSupport = resState;
    };
    cordova.plugins.diagnostic.hasBluetoothLEPeripheralSupport(
      onSuccess,
      this.onFaild
    );
  },

  setBluetoothState_android(bool) {
    if (bool === true) bool = true;
    else bool = false;
    let onSuccess = (resState) => {
      // state.deviceState.bluetooth.setBluetoothState = resState;
      console.log("Bluetooth was enabled");
    };
    cordova.plugins.diagnostic.setBluetoothState(onSuccess, this.onFaild, bool);
  },
  switchToBluetoothSettings_android() {
    cordova.plugins.diagnostic.switchToBluetoothSettings();
  },

  //ios
  requestBluetoothAuthorization_ios() {
    let onSuccess = (resState) => {
      // state.deviceState.bluetooth.isBluetoothEnabled = resState;
      console.log("Bluetooth authorization was requested.");
    };
    cordova.plugins.diagnostic.requestBluetoothAuthorization(
      onSuccess,
      this.onFaild
    );
  },
};

export default checkDeviceState_bluetooth;
