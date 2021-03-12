export default {
  data() {
    return {
      test2: "test",
      opalBle: {
        data: {
          //constant
          service_uuid: "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
          characteristic_uuid: "beb5483e-36e1-4688-b7f5-ea07361b26a8",

          //writable
          connectType: 0, //0:disconnect, 1:connect,2:reject connect
          modeType: 0, //1:normal, 2:eco, 3:snow, 4:sports, 5:sports+, 10:extreme
          stateType: 0, //0:BLE接続が解除されたらバイクをロック, 1:BLE接続が解除されてもバイクをロックしない（現状維持)

          //read
          readData: [],
        },
        getDisplayBleReadData: this.getDisplayBleReadData,
        connectDeviceInfo: this.connectDeviceInfo,

        opalModeSetter: this.opalModeSetter,
        opalModeUpdate: this.opalModeUpdate,
        opalModeRead: this.opalModeRead,
        opalModeNotifyStart: this.opalModeNotifyStart,
        opalModeNotifyStop: this.opalModeNotifyStop,
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
        case "disConnect": {
          this.opalBle.data.connectType = 0;
          break;
        }
        case "connect": {
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
    opalModeUpdate() {
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
        this.helper.snackFire({ message: "書き込み成功" });
        console.log("success write: ", ok);
      };
      let failed = (e) => {
        this.helper.snackFire({ message: "書き込み失敗" });
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
    opalModeNotifyStop() {
      let device_id = this.connectDeviceInfo.id;
      let success = (notifyData) => {
        window.alert("success readData: " + this.bytesToString(notifyData));
      };
      let failed = (e) => {
        console.log("readData error:", e);
      };
      ble.stopNotification(
        device_id,
        this.opalBle.data.service_uuid,
        this.opalBle.data.characteristic_uuid,
        success,
        failed
      );
    },

    opalModeStore() {
      //localhost
    },
  },
};
