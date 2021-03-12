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
      },
      currentConnectDevice: {
        name: "接続していません。",
        advertising: new Uint8Array(4),
        services: ["this is service"],
        characteristics: [{ characteristic: "this is chara" }],
        rssi: 0,
        isConnect: false,
        isAutoConnect: false,
      },
      connectedList: [],
    },
  }),
  getters: {
    getCurrentBleConnectDevice: (state) => {
      return state.ble.currentConnectDevice;
    },
  },
  mutations: {},
  actions: {
    //ble actions

    //setter
    setConnectedDevice({ state }, deviceInfo) {
      let deviceId = deviceInfo.id;
      let ls = state.ble.connectedList;
      let duplicate = null;
      let maxListId = null;

      //
      state.ble.currentConnectDeviceId = deviceId;
      state.ble.currentConnectDevice = deviceInfo;
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
    },
    setDisconnectState({ state }, deviceId) {
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
    },
  },
};

export default settingState;
