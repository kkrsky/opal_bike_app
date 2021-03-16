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
          bikePasswordKey: "bikePinCode",
          connectDeviceIdKey: "connectDeviceId",
          bikePhoneStateKey: "bikePhoneStateKey",
          //writable
          connectType: 0, //0:disconnect, 1:connect,2:reject connect,3 over write PIN,4 read PIN
          modeType: 0, //1:normal, 2:eco, 3:snow, 4:sports, 5:sports+, 10:extreme
          stateType: 0, //0:BLE接続が解除されたらバイクをロック, 1:BLE接続が解除されてもバイクをロックしない（現状維持)
          pinCode: [0, 0, 0, 0],
          //read
          readData: [],
          checkIntervalId: null,
        },
        getDisplayBleReadData: this.getDisplayBleReadData,
        currentBleConnectDevice: this.currentBleConnectDevice,

        opalModeSetter: this.opalModeSetter,
        opalModeUpdate: this.opalModeUpdate,
        opalPinUpdate: this.opalPinUpdate,
        opalModeRead: this.opalModeRead,
        opalModeNotifyStart: this.opalModeNotifyStart,
        opalModeNotifyStart_isAuth: this.opalModeNotifyStart_isAuth,
        opalModeNotifyStop: this.opalModeNotifyStop,
        onBleDisConnect: this.onBleDisConnect,
        onBleAutoConnect: this.onBleAutoConnect,
        onBleAutoConnect_woAuth: this.onBleAutoConnect_woAuth,
        getSavedDeviceId: this.getSavedDeviceId,
        getSavedBikePinCode: this.getSavedBikePinCode,
        onBikePasswordSend: this.onBikePasswordSend,
        isAuth: this.isAuth,
        initBleEventListener: this.initBleEventListener,
        isBleConnect: this.isBleConnect,
        checkCurrentBikeState: this.checkCurrentBikeState,
        changeDisplay: this.changeDisplay,
        checkBleConnect: this.checkBleConnect,
        checkInterval: this.checkInterval,

        //computed
        currentBleIsAvailable: this.currentBleIsAvailable,
        currentBleConnectDeviceIsAuth: this.currentBleConnectDeviceIsAuth,
        currentBikeState: this.currentBikeState,
      },
    };
  },
  computed: {
    currentBleConnectDevice() {
      return this.$store.getters["settingState/getCurrentBleConnectDevice"];
    },
    getDisplayBleReadData() {
      return "[" + this.opalBle.data.readData.join(" ") + "]";
    },
    currentBleIsAvailable() {
      return this.$store.getters["checkDeviceState/getCurrentBleState"]
        .isBluetoothAvailable;
    },
    currentBleConnectDeviceIsAuth() {
      return this.$store.getters[
        "settingState/getCurrentBleConnectDeviceIsAuth"
      ];
    },
    currentBikeState() {
      return this.$store.getters["checkDeviceState/getCurrentBikeState"];
    },
  },
  methods: {
    test3() {
      console.log("this is test");
      console.log(this.currentBikeState);
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
    async opalModeUpdate(message) {
      /**
       *
       * @param {Number <15} connectType
       * @param {Number <15} modeType
       * @param {Number <15} stateType
       *
       */

      //state type
      //state=1 BLE接続が解除されたらバイクをロック
      //state=2 BLE接続が解除されてもバイクをロックしない（現状維持)
      //state=3 スマホ認証を無効

      let promise = new Promise((resolve, reject) => {
        let { connectType, modeType, stateType } = this.opalBle.data;
        let device_id = this.currentBleConnectDevice.id;

        let success = (ok) => {
          if (message) this.helper.snackFire({ message: message });
          // else this.helper.snackFire({ message: "モード変更" });
          console.log("success write: ", ok);
          this.$store.dispatch("checkDeviceState/setBikeState", {
            connectType: connectType,
            modeType: modeType,
          });
          resolve();
        };
        let failed = (e) => {
          this.helper.snackFire({ message: "モード変更に失敗しました。" });
          console.log("write error:", e);
          reject();
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
      })
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });

      return promise;
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
      let device_id = this.currentBleConnectDevice.id;
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
      console.log("opalPinUpdate", writeData);
      ble.write(
        device_id,
        this.opalBle.data.service_uuid,
        this.opalBle.data.characteristic_uuid,
        writeData.buffer,
        success,
        failed
      );
    },
    async opalModeRead() {
      let promise = new Promise((resolve, reject) => {
        //read
        let device_id = this.currentBleConnectDevice.id;
        let success = (readData) => {
          let unit8View = new Uint8Array(readData);
          this.opalBle.data.readData = unit8View;
          resolve(unit8View);
        };
        let failed = (e) => {
          this.opalBle.data.readData = null;
          console.log("readData error:", e);
          reject();
        };
        ble.read(
          device_id,
          this.opalBle.data.service_uuid,
          this.opalBle.data.characteristic_uuid,
          success,
          failed
        );
      }).then((readData) => {
        return readData;
      });
      return promise;
    },
    opalModeNotifyStart() {
      //notify
      let device_id = this.currentBleConnectDevice.id;

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
    opalModeNotifyStart_isAuth({ deviceId, deviceInfo }) {
      //notify
      let isNotifyed = false; //何度も同じ関数が起動してしまう問題を防ぐ
      window.setTimeout(() => {
        if (this.opalBle.isAuth(this.readData_for_auth) === "unknown") {
          this.opalBle.opalModeNotifyStop();
          this.helper.snackFire({ message: "正しく認証できませんでした。" });
        }
      }, 5000);

      let success = (notifyData) => {
        if (isNotifyed) {
          //既に通知している
        } else {
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
              isNotifyed = true;
              break;
            }
            case "authed": {
              this.opalBle.opalModeNotifyStop();
              window.localStorage.setItem(
                this.opalBle.data.connectDeviceIdKey,
                deviceId
              );

              this.$store.dispatch(
                "settingState/setConnectedDeviceIsAuth",
                true
              );
              this.opalBle.checkCurrentBikeState();

              this.$router.push("/");
              this.helper.snackFire({ message: "適性ユーザーです。" });
              isNotifyed = true;

              break;
            }
            //
          }
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
      let device_id = this.currentBleConnectDevice.id;
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
        deviceId = this.currentBleConnectDevice.id;
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
            this.helper.snackFire({ message: "接続を解除しました。" });
            this.$store.dispatch("settingState/setDisconnectState", deviceId);
            window.localStorage.removeItem(
              this.opalBle.data.connectDeviceIdKey
            );
          };
          break;
        }
        case "reject": {
          success = () => {
            // window.alert("success disconnect: " + getID);
            this.helper.snackFire({ message: "PINが異なります。" });
            this.$store.dispatch("settingState/setDisconnectState", deviceId);
            window.localStorage.removeItem(
              this.opalBle.data.connectDeviceIdKey
            );
          };
          break;
        }
        case "bike": {
          success = () => {
            this.$store.dispatch("settingState/setDisconnectState");
            this.helper.snackFire({
              message: "バイクの電源が切れた可能性があります。",
            });
            // console.log("サイレント接続解除");
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
    onBleAutoConnect({ id, pinCode, target }) {
      let deviceId = id;
      console.log("connect device id:", deviceId, pinCode);
      let success = (deviceInfo) => {
        console.log("connected device info:", deviceInfo);
        this.$store.dispatch("settingState/setConnectedDevice", deviceInfo);
        console.log("pin", this.opalBle.getSavedBikePinCode());
        switch (target) {
          // case "admin": {
          //   this.onBikeAdminSend();

          //   break;
          // }
          case "first": {
            this.opalBle.onBikePasswordSend(pinCode);
            break;
          }
          default: {
            this.opalBle.onBikePasswordSend(
              this.opalBle.getSavedBikePinCode().bikePinCode
            );
          }
        }
        this.opalBle.opalModeNotifyStart_isAuth({ deviceId, deviceInfo });
      };
      let failed = (e) => {
        console.log("auto connect error:", e);
        // window.alert("接続できませんでした。");
        //failed fire
        this.helper.snackFire({ message: "接続できませんでした。" });
        // this.onBleConnect(deviceId);
        //Bluetooth がONにもかかわらず、接続されていない
        this.$store.dispatch("settingState/setDisconnectState");
        this.opalBle.checkInterval();
      };
      ble.autoConnect(deviceId, success, failed);
    },
    async onBleAutoConnect_woAuth({ id, pinCode, target }) {
      let promise = new Promise((resolve, reject) => {
        if (!id) id = this.opalBle.getSavedDeviceId();
        let deviceId = id;
        let timerId = window.setTimeout(() => {
          console.error("[timeout] ble connect is not found");
          reject(false);
        }, 5000);

        console.log("connect device id [wo auth]:", deviceId, pinCode);
        let success = (deviceInfo) => {
          window.clearTimeout(timerId);
          console.log("connected device info:", deviceInfo);
          this.$store.dispatch("settingState/setConnectedDevice", deviceInfo);
          this.$store.dispatch("settingState/setConnectedDeviceIsAuth", true);
          this.$router.push("/");
          resolve(true);
        };
        let failed = (e) => {
          window.clearTimeout(timerId);
          console.log("auto connect error:", e);
          this.$store.dispatch("settingState/setDisconnectState");
          this.opalBle.checkInterval();

          reject(false);
        };
        ble.autoConnect(deviceId, success, failed);
      })
        .then((bool) => {
          if (bool) this.opalBle.checkCurrentBikeState();
          return bool;
        })
        .catch(() => {
          return false;
        });

      return promise;
    },
    onBikePasswordSend(sendPassword) {
      // let sendPassword = this.bikePinCode.map((val) => {
      //   return Number(val);
      // });
      console.log("send pin:", sendPassword);
      if (sendPassword.length !== 4) {
        this.hepler.snackFire({ message: "PINコードを保存してください。" });
      } else {
        this.opalBle.data.connectType = 5;
        this.opalBle.data.pinCode = sendPassword;
        this.opalBle.opalPinUpdate();
      }
    },
    getSavedBikePinCode() {
      return JSON.parse(
        window.localStorage.getItem(this.opalBle.data.bikePasswordKey)
      );
    },

    async checkCurrentBikeState() {
      //localhost
      let readData = await this.opalBle.opalModeRead();
      console.log("checkCurrentBikeState:", readData);

      if (readData) {
        let deviceConnected = Math.floor(readData[3] / 16);
        let writeMode = readData[3] % 16;
        this.opalBle.data.connectType = deviceConnected;
        this.opalBle.data.modeType = writeMode;
        this.$store.dispatch("checkDeviceState/setBikeState", {
          connectType: deviceConnected,
          modeType: writeMode,
        });
        // this.opalBle.opalModeUpdate();
        this.helper.eventFire("updateDisplayAll");
      }
    },
    getSavedDeviceId() {
      return window.localStorage.getItem(this.opalBle.data.connectDeviceIdKey);
    },
    changeDisplay() {
      let { connectType, modeType, stateType } = this.opalBle.currentBikeState;
      let bikeState = JSON.parse(
        window.localStorage.getItem(this.opalBle.data.bikePhoneStateKey)
      );
      // let { connectType, modeType, stateType } = this.opalBle.data;
      let template = {
        //(*1):attribute=titleの時は無効
        id: 1,
        attribute: "title", //リストの属性
        title: "バイク情報", //表示するタイトル
        iconRight: null, //(*1)
        iconLeft: null, //(*1)
        pictureLeftSrc: null, //(*1) 左側にアイコン画像
        goto: null, //(*1)遷移先のページ(routerを使う場合はname,クリック時に実行する関数でも可能)
        propItems: null, //(*1) クリックした時に次のcomponentまたは関数に渡すアイテム(未実装)
        addCss: {}, //固有リストにCSSを適応
        active: false, //(*1) クリック時にactiveになる(未実装)
        subItems: null, //(*1) null以外はドロップダウン型のリストになる
        isDisable: false,
        reload: 0,
      };
      let lockTile;
      if (bikeState === "phone-no-Lock") {
        lockTile = {
          id: 2,
          attribute: "item",
          title: "鍵を閉める",
          iconRight: "arrow_forward_ios",
          iconLeft: "lock_open",
          pictureLeftSrc: null,
          goto: () => {
            this.opalBle.opalModeUpdate("unlock");
          },
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
          isDisable: false,
          reload: 0,
        };
      } else {
        lockTile = {
          id: 2,
          attribute: "item",
          title: "鍵を開ける",
          iconRight: "arrow_forward_ios",
          iconLeft: "lock",
          pictureLeftSrc: null,
          goto: () => {
            let self = this.myBikeItems.find((item) => {
              return item.id === 2;
            });

            if (this.checkBikeIsConnected()) {
              if (self.title === "鍵を開ける") {
                //open
                this.opalBle.opalModeSetter("open");
                this.opalBle.opalModeUpdate("unlock");
                self.title = "鍵を閉める";
                self.iconLeft = "lock_open";
              } else {
                //close
                this.opalBle.opalModeSetter("close");
                this.opalBle.opalModeUpdate("lock");
                self.title = "鍵を開ける";
                self.iconLeft = "lock";
              }
            }
          },
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
          isDisable: false,
          reload: 0,
        };
      }

      let modeTile = {
        id: 3,
        attribute: "dialog",
        title: "ECOモード",
        iconRight: "arrow_forward_ios",
        iconLeft: "flag",
        pictureLeftSrc: null,
        goto: null,
        propItems: [
          {
            id: 1,
            attribute: "title",
            label: "走行モード選択",
            value: "走行モード選択",
          },
          {
            id: 2,
            attribute: "item",
            label: "ECOモード",
            value: "eco",
          },
          {
            id: 3,
            attribute: "item",
            label: "線形モード",
            value: "normal",
          },
          {
            id: 4,
            attribute: "item",
            label: "スポーツモード",
            value: "sports",
          },
          {
            id: 5,
            attribute: "item",
            label: "スポーツ＋モード",
            value: "sportsPlus",
          },
          {
            id: 6,
            attribute: "item",
            label: "雪道モード",
            value: "snow",
          },
        ],
        addCss: {},
        active: false,
        subItems: null,
        isDisable: false,
        reload: 0,
      };
      let settingTile = {
        id: 4,
        attribute: "item",
        title: "接続設定",
        iconRight: "arrow_forward_ios",
        iconLeft: "bluetooth",
        pictureLeftSrc: null,
        goto: "settingBle",
        propItems: null,
        addCss: {},
        active: false,
        subItems: null,
        isDisable: false,
        reload: 0,
      };

      if (connectType === 1) {
        lockTile.title = "鍵を閉める";
        lockTile.iconLeft = "lock_open";
      }

      switch (modeType) {
        case 0: {
          modeTile.title = "ECOモード";

          break;
        }
        case 1: {
          modeTile.title = "線形モード";

          break;
        }
        case 2: {
          modeTile.title = "ECOモード";

          break;
        }
        case 3: {
          modeTile.title = "雪道モード";

          break;
        }
        case 4: {
          modeTile.title = "スポーツモード";

          break;
        }
        case 5: {
          modeTile.title = "スポーツ＋モード";

          break;
        }
        case 10: {
          modeTile.title = "エクストリーム";

          break;
        }
      }
      return [template, lockTile, modeTile, settingTile];
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
        let modeType = signal % 16;
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
            this.$store.dispatch("checkDeviceState/setBikeState", {
              connectType: deviceConnected_fromBike,
              modeType: modeType,
            });
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

    //check state
    async isBleConnect() {
      //実際に通信してチェック
      let promise = new Promise((resolve, reject) => {
        ble.isConnected(
          this.opalBle.getSavedDeviceId(),
          () => {
            resolve(true);
          },
          () => {
            resolve(false);
          }
        );
      }).then((bool) => {
        return bool;
      });

      return promise;
    },
    async checkBleConnect() {
      //接続していなければdisconnect
      let isConnect = await this.opalBle.isBleConnect();
      console.log("isBleConnect", isConnect);
      if (isConnect) {
        //none
        // console.log("[connect]");
      } else {
        // console.log("[not connect]");

        if (
          this.opalBle.currentBleIsAvailable &&
          this.opalBle.getSavedDeviceId() !== null &&
          this.opalBle.getSavedBikePinCode() !== null
        ) {
          // console.log("[on BLE && savedData]");

          //Bluetooth がONにもかかわらず、接続されていない
          this.$store.dispatch("settingState/setDisconnectState");
          let isLogin = await this.opalBle.onBleAutoConnect_woAuth({
            id: this.opalBle.getSavedDeviceId(),
          });
          console.log("onBleAutoConnect_woAuth", isLogin);
          if (isLogin) {
            //none
            // console.log("[woAuth login] checkBleConnect");
          } else {
            // this.helper.snackFire({
            //   message: "バイクの電源が切れた可能性があります。",
            // });
          }
        }
      }
    },
    async checkInterval() {
      if (this.opalBle.data.checkIntervalId !== null) {
        //既に登録されている
      } else {
        this.opalBle.data.checkIntervalId = window.setInterval(async () => {
          if (await this.opalBle.isBleConnect()) {
            window.clearInterval(this.opalBle.data.checkIntervalId);
            this.opalBle.data.checkIntervalId = null;
          } else {
            this.opalBle.checkBleConnect();
          }
        }, 8000);
      }
    },
    async onBluetooth_on(e) {
      let obj = e.detail;
      console.log("[state] Bluetooth on");
      // await this.opalBle.isBleConnect();
      console.log(
        "localstorage",
        this.opalBle.getSavedDeviceId(),
        this.opalBle.getSavedBikePinCode()
      );
      if (
        this.opalBle.getSavedDeviceId() !== null &&
        this.opalBle.getSavedBikePinCode() !== null
      ) {
        //データが保存してある場合
        if (await this.opalBle.isBleConnect()) {
          //connected
          //ここでauthをチェックするほど厳密な認証でなくて良い
        } else {
          this.$store.dispatch("settingState/setDisconnectState");
          this.opalBle.onBleAutoConnect_woAuth({
            id: this.opalBle.getSavedDeviceId(),
          });
        }
      } else {
        console.error("deviceIdかPINcodeが保存されていません。");
      }
    },
    onBluetooth_off(e) {
      let obj = e.detail;
      console.log("[state] Bluetooth off");
      this.$store.dispatch("settingState/setDisconnectState");
    },
    initBleEventListener() {
      this.helper.eventListen("Bluetooth_on", this.onBluetooth_on);
      this.helper.eventListen("Bluetooth_off", this.onBluetooth_off);
    },
    initComputed(arr) {
      arr.forEach((val) => {
        this.opalBle[val] = this[val];
      });
    },
  },
  mounted() {
    this.initComputed([
      "currentBleConnectDeviceIsAuth",
      "currentBleIsAvailable",
      "currentBikeState",
    ]);
    // console.log("aa", this.opalBle.currentBikeState);
    this.opalBle.data.connectType = this.opalBle.currentBikeState.connectType;
    this.opalBle.data.modeType = this.opalBle.currentBikeState.modeType;
    // this.opalBle.checkInterval();
  },
  watch: {
    currentBleIsAvailable(bool) {
      this.opalBle.currentBleIsAvailable = this.currentBleIsAvailable;
      //Bluetooth ON/OFF
      if (bool) {
        //state ON
        this.helper.eventFire("Bluetooth_on");
      } else {
        //state OFF
        this.helper.eventFire("Bluetooth_off");
      }
    },
    currentBleConnectDeviceIsAuth(bool) {
      this.opalBle.currentBleConnectDeviceIsAuth = this.currentBleConnectDeviceIsAuth;
      //適性ユーザー：true
    },
    currentBikeState() {
      console.log("change currentBikeState");
    },
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
