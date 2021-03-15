export default {
  data() {
    return {
      test2: "test",
      readData_for_auth: [],
      opalBle: {
        data: {
          //constant
          service_uuid: "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
          characteristic_uuid: "beb5483e-36e1-4688-b7f5-ea07361b26a8",

          //writable
          connectType: 0, //0:disconnect, 1:connect,2:reject connect,3 over write PIN,4 read PIN
          modeType: 0, //1:normal, 2:eco, 3:snow, 4:sports, 5:sports+, 10:extreme
          stateType: 0, //0:BLE接続が解除されたらバイクをロック, 1:BLE接続が解除されてもバイクをロックしない（現状維持)
          pinCode: [0, 0, 0, 0],
          //read
          readData: [],
        },
        getDisplayBleReadData: this.getDisplayBleReadData,
        connectDeviceInfo: this.connectDeviceInfo,

        opalModeSetter: this.opalModeSetter,
        opalModeUpdate: this.opalModeUpdate,
        opalPinUpdate: this.opalPinUpdate,
        opalModeRead: this.opalModeRead,
        opalModeNotifyStart: this.opalModeNotifyStart,
        opalModeNotifyStart_isAuth: this.opalModeNotifyStart_isAuth,
        opalModeNotifyStop: this.opalModeNotifyStop,
        onBleDisConnect: this.onBleDisConnect,

        isAuth: this.isAuth,
      },
    };
  },
  computed: {
    connectDeviceInfo() {
      return this.$store.state.settingState.ble.currentConnectDevice;
    },
    getDisplayBleReadData() {
      return "[" + this.opalBle.data.readData.join(" ") + "]";
    },
  },
  methods: {
    test() {
      console.log("this is test");
    },
    opalModeSetter(val) {
      //write
      switch (val) {
        //connect type
        case "close": {
          //disConnect
          this.opalBle.data.connectType = 0;
          break;
        }
        case "open": {
          //connect
          this.opalBle.data.connectType = 1;
          break;
        }
        case "rejectConnect": {
          this.opalBle.data.connectType = 2;
          break;
        }

        //mode type
        case "normal": {
          this.opalBle.data.modeType = 1;

          break;
        }
        case "eco": {
          this.opalBle.data.modeType = 2;

          break;
        }
        case "snow": {
          this.opalBle.data.modeType = 3;
          break;
        }
        case "sports": {
          this.opalBle.data.modeType = 4;
          break;
        }
        case "sportsPlus": {
          this.opalBle.data.modeType = 5;
          break;
        }
        case "extreme": {
          this.opalBle.data.modeType = 10;
          break;
        }

        //state type
        case "disconnectLock": {
          this.opalBle.data.stateType = 1;
          break;
        }
        case "continuous": {
          this.opalBle.data.stateType = 2;
          break;
        }
      }
    },
    opalModeUpdate(message) {
      /**
       *
       * @param {Number <15} connectType
       * @param {Number <15} modeType
       * @param {Number <15} stateType
       *
       */
      let { connectType, modeType, stateType } = this.opalBle.data;
      let device_id = this.connectDeviceInfo.id;

      let success = (ok) => {
        if (message) this.helper.snackFire({ message: message });
        else this.helper.snackFire({ message: "モード変更" });
        console.log("success write: ", ok);
      };
      let failed = (e) => {
        this.helper.snackFire({ message: "モード変更に失敗しました。" });
        console.log("write error:", e);
      };
      let writeData = new Uint8Array(3);
      writeData[0] = Number(connectType);
      writeData[1] = Number(modeType);
      writeData[2] = Number(stateType);
      ble.write(
        device_id,
        this.opalBle.data.service_uuid,
        this.opalBle.data.characteristic_uuid,
        writeData.buffer,
        success,
        failed
      );
    },
    opalPinUpdate(message) {
      /**
       *
       * @param {Number <15} connectType
       *
       *
       *
       */
      let { connectType } = this.opalBle.data;
      let pinCode = this.opalBle.data.pinCode;
      let device_id = this.connectDeviceInfo.id;
      let success = (ok) => {
        if (message) this.helper.snackFire({ message });
        // console.log("success write: ", ok);
      };
      let failed = (e) => {
        this.helper.snackFire({ message: "PIN認証通信に失敗しました。" });
        console.log("write error:", e);
      };
      let writeData = new Uint8Array(5);
      writeData[0] = Number(connectType);
      writeData[1] = Number(pinCode[0]);
      writeData[2] = Number(pinCode[1]);
      writeData[3] = Number(pinCode[2]);
      writeData[4] = Number(pinCode[3]);

      ble.write(
        device_id,
        this.opalBle.data.service_uuid,
        this.opalBle.data.characteristic_uuid,
        writeData.buffer,
        success,
        failed
      );
    },
    opalModeRead() {
      //read
      let device_id = this.connectDeviceInfo.id;
      let success = (readData) => {
        let unit8View = new Uint8Array(readData);
        this.opalBle.data.readData = unit8View;
      };
      let failed = (e) => {
        console.log("readData error:", e);
      };
      ble.read(
        device_id,
        this.opalBle.data.service_uuid,
        this.opalBle.data.characteristic_uuid,
        success,
        failed
      );
    },
    opalModeNotifyStart() {
      //notify
      let device_id = this.connectDeviceInfo.id;

      let success = (notifyData) => {
        let unit8View = new Uint8Array(notifyData);
        this.opalBle.data.readData = unit8View;
      };
      let failed = (e) => {
        console.log("notify error:", e);
      };
      ble.startNotification(
        device_id,
        this.opalBle.data.service_uuid,
        this.opalBle.data.characteristic_uuid,
        success,
        failed
      );
    },
    opalModeNotifyStart_isAuth({ deviceId }) {
      //notify
      window.setTimeout(() => {
        if (this.opalBle.isAuth(this.readData_for_auth) === "unknown") {
          this.opalBle.opalModeNotifyStop();
          this.helper.snackFire({ message: "正しく認証できませんでした。" });
        }
      }, 5000);

      let success = (notifyData) => {
        let unit8View = new Uint8Array(notifyData);
        this.readData_for_auth = unit8View;
        switch (this.opalBle.isAuth(this.readData_for_auth)) {
          case "unknown": {
            break;
          }
          case "reject": {
            this.opalBle.opalModeNotifyStop();
            this.$store.dispatch(
              "settingState/setConnectedDeviceIsAuth",
              false
            );
            this.opalBle.onBleDisConnect(deviceId, "reject");

            break;
          }
          case "authed": {
            this.opalBle.opalModeNotifyStop();
            window.localStorage.setItem("connectDeviceId", deviceId);
            this.$store.dispatch("settingState/setConnectedDeviceIsAuth", true);
            this.$router.go(-1);
            this.helper.snackFire({ message: "適性ユーザーです。" });
            break;
          }
          //
        }
      };
      let failed = (e) => {
        console.log("notify error:", e);
      };
      ble.startNotification(
        deviceId,
        this.opalBle.data.service_uuid,
        this.opalBle.data.characteristic_uuid,
        success,
        failed
      );
    },
    opalModeNotifyStop() {
      let device_id = this.connectDeviceInfo.id;
      let success = (notifyData) => {
        // window.alert("success readData: " + this.bytesToString(notifyData));
        console.log("[stop] ble notify");
      };
      let failed = (e) => {
        console.error("[stop] ble notify error:", e);
      };
      ble.stopNotification(
        device_id,
        this.opalBle.data.service_uuid,
        this.opalBle.data.characteristic_uuid,
        success,
        failed
      );
    },

    onBleDisConnect(deviceId, attribute) {
      if (!deviceId || deviceId === "auto") {
        deviceId = this.connectDeviceInfo.id;
      }
      if (!deviceId)
        this.helper.snackFire({
          message: "接続しているデバイスがありません。",
        });
      console.log("attribute", attribute);

      let success = () => {
        console.log("dammy");
      };

      switch (attribute) {
        case "select": {
          success = () => {
            // window.alert("success disconnect: " + getID);
            this.helper.snackFire({ message: "接続解除2" });
            this.$store.dispatch("settingState/setDisconnectState", deviceId);
          };
          break;
        }
        case "reject": {
          success = () => {
            // window.alert("success disconnect: " + getID);
            this.helper.snackFire({ message: "適性ユーザーではありません。" });
            this.$store.dispatch("settingState/setDisconnectState", deviceId);
          };
          break;
        }
        default: {
          success = () => {
            console.log("予期せぬ接続解除");
          };
        }
      }

      let failed = function(e) {
        console.log("disconnect error:", e);
      };
      ble.disconnect(deviceId, success, failed);
    },
    isAuth(readData) {
      //unknown
      //reject
      //authed

      //bikeから送られてくる認証情報
      console.log("readData", readData);
      let cnt = readData[4];
      if (cnt > 10) {
        let signal = readData[3];
        let deviceConnected_fromBike = Math.floor(signal / 16);
        console.log("deviceConnected_fromBike", deviceConnected_fromBike);
        switch (Number(deviceConnected_fromBike)) {
          case 0: {
            return "unknown";
          }
          case 1: {
            return "authed";
          }
          case 2: {
            return "reject";
          }
          case 3: {
            return "authed";
          }
          case 4: {
            return "authed";
          }
          case 5: {
            return "authed";
          }
          default: {
            return "unknown";
          }
        }
      }
    },

    opalModeStore() {
      //localhost
    },
  },
  watch: {
    // readData_for_auth(readData) {
    //   switch (this.opalBle.isAuth(readData)) {
    //     case "unknown": {
    //       break;
    //     }
    //     case "reject": {
    //       break;
    //     }
    //     case "authed": {
    //       break;
    //     }
    //     //
    //   }
    // },
  },
};
