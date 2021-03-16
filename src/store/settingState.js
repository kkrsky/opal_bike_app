let settingState = {
  namespaced: true,
  state: () => ({
    ble: {
      currentConnectDeviceId: null,
      deviceNoneTemplate: {
        name: "接続していません。",
        advertising: new Uint8Array(4),
        services: ["this is service"],
        characteristics: [{ characteristic: "this is chara" }],
        rssi: 0,
        isConnect: false,
        isAutoConnect: false,
        isAuth: false,
      },
      currentConnectDevice: {
        name: "接続していません。",
        advertising: new Uint8Array(4),
        services: ["this is service"],
        characteristics: [{ characteristic: "this is chara" }],
        rssi: 0,
        isConnect: false,
        isAutoConnect: false,
        isAuth: false,
      },
      connectedList: [],
    },
  }),
  getters: {
    getCurrentBleConnectDevice: (state) => {
      return state.ble.currentConnectDevice;
    },
    getCurrentBleConnectDeviceIsAuth: (state) => {
      // console.log("cc", state.ble.currentConnectDevice.isAuth);
      return state.ble.currentConnectDevice.isAuth;
    },
  },
  mutations: {},
  actions: {
    //ble actions

    //setter
    setConnectedDeviceIsAuth({ state }, isAuth) {
      state.ble.currentConnectDevice.isAuth = isAuth;
    },
    setConnectedDevice({ state }, deviceInfo) {
      let deviceId = deviceInfo.id;
      let ls = state.ble.connectedList;
      let duplicate = null;
      let maxListId = null;

      //
      duplicate = ls.find((device) => {
        return device.id === deviceId;
      });

      //
      if (ls.length <= 0) maxListId = 0;
      else {
        maxListId = ls.reduce((acc, val) => {
          return acc.listId > val.listId ? acc : val;
        }).listId;
      }

      //obj wrapper
      deviceInfo.isAutoConnect = true;
      deviceInfo.isConnect = true;
      deviceInfo.isAuth = false;
      deviceInfo.listId = maxListId + 1;

      //output
      if (duplicate === undefined) ls.push(deviceInfo);
      else {
        // console.log("[info] already this device id exist:", deviceId);

        let infoIndex = null;
        ls.some((di, i) => {
          if (di.deviceId === duplicate.deviceId) {
            infoIndex = i;
            return true;
          }
        });
        ls[infoIndex] = deviceInfo;
        console.log("device info is updated:", deviceInfo.id);
      }

      //
      state.ble.currentConnectDeviceId = deviceId;
      state.ble.currentConnectDevice = deviceInfo;
    },
    setDisconnectState({ state }, deviceId) {
      if (deviceId) {
        //device idがある場合は、選択削除
        let ls = state.ble.connectedList;
        let duplicate = ls.find((device) => {
          return device.id === deviceId;
        });

        // console.log("duplicate", duplicate);
        let deleteIndex = null;
        ls.some((deviceInfo, i) => {
          if (deviceInfo.listId === duplicate.listId) {
            deleteIndex = i;
            deviceInfo.isAutoConnect = false;
            deviceInfo.isConnect = false;
            return true;
          }
        });

        state.ble.currentConnectDevice = JSON.parse(
          JSON.stringify(state.ble.deviceNoneTemplate)
        );
        // console.log("deleteIndex", deleteIndex);
      } else {
        state.ble.currentConnectDevice = JSON.parse(
          JSON.stringify(state.ble.deviceNoneTemplate)
        );
      }
    },
  },
};

export default settingState;
