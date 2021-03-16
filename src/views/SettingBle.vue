<template>
  <div id="SettingBle">
    <top-header :title="title" :right="rightBtnList"></top-header>
    <v-col cols="2" id="topHeader_here">
      <v-btn
        icon
        class="ble-state-button"
        @click="opalBle.currentBleIsAvailable ? null : notifyBleSetting()"
      >
        <v-icon>
          {{
            opalBle.currentBleIsAvailable
              ? opalBle.currentBleConnectDeviceIsAuth
                ? "bluetooth_connected"
                : "bluetooth"
              : "bluetooth_disabled"
          }}
          <!-- "bluetooth_connected" -->
        </v-icon></v-btn
      >
    </v-col>
    <v-main app>
      <div class="mt-5"></div>
      <!-- <v-btn @click="test01">test</v-btn> -->
      <v-card
        class="mx-auto"
        max-width="344"
        outlined
        elevation="2"
        :class="opalBle.currentBleConnectDeviceIsAuth ? null : 'disable-all'"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">
              接続中のデバイス
              <v-divider></v-divider>
            </div>
            <v-list-item-title class="headline mb-1">
              {{
                currentBleConnectDevice.name
                  ? currentBleConnectDevice.name
                  : "opal_system"
              }}
            </v-list-item-title>
            <v-list-item-subtitle
              >RSSI:{{ currentBleConnectDevice.rssi }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn
            outlined
            rounded
            text
            @click="opalBle.onBleDisConnect('auto', 'select')"
          >
            接続解除
          </v-btn>
        </v-card-actions>
      </v-card>
      <div class="mt-5"></div>
      <v-card class="mx-auto" max-width="344" outlined elevation="2">
        <v-container class="bike-password-container">
          <v-row no-gutters>
            <v-col cols="3"></v-col>
            <v-col class="bike-password-title">バイクPINコード</v-col>
            <v-col cols="3"
              ><a @click="isHelpDisplay = !isHelpDisplay">help</a></v-col
            >
          </v-row>
          <v-row no-gutters v-show="!isHelpDisplay">
            <v-col class="bike-password-input">
              <code-input
                :loading="false"
                v-on:complete="onCompletePassword"
                :fields="4"
                :values="bikePinCode"
              />
            </v-col>
            <v-col>
              <v-checkbox v-model="isSavePassword" label="保存"></v-checkbox>
            </v-col>
          </v-row>
          <v-row no-gutters v-show="isHelpDisplay">
            <v-col cols="10"
              ><v-text-field
                v-model="helpCode"
                class="bike-help-input"
                outlined
                label="helpコード"
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="bike-help-input"
              ><v-btn class="bike-help-input" @click="doHelp()"
                >送信</v-btn
              ></v-col
            >
          </v-row>
        </v-container>
      </v-card>

      <div
        class="bluetooth-search-container"
        v-if="!opalBle.currentBleConnectDeviceIsAuth"
      >
        <div class="mt-5"></div>

        <v-btn
          @click="checkBeforeScan() ? onBleScan() : (isScanLoading = false)"
          width="100vw"
          :loading="isScanLoading"
          >検索</v-btn
        >

        <list-item :listItems="scanDeviceList"></list-item>
      </div>
      <div
        class="bluetooth-connected-container"
        v-if="opalBle.currentBleConnectDeviceIsAuth"
      >
        <v-card class="mx-auto" max-width="344" outlined elevation="2">
          <v-container class="bike-password-container">
            <v-row no-gutters>
              <v-btn
                block
                color="warning"
                class="bike-password-title"
                :style="{ fontWeight: 'bold' }"
                @click="onBikePasswordOverwrite()"
                >PINコード上書き
              </v-btn>
            </v-row>

            <v-row no-gutters class="bike-state-select-container">
              <v-col cols="10">
                <v-select
                  :items="bikeStateSelectItems"
                  v-model="bikeStateSelectItem"
                  item-text="label"
                  item-value="value"
                  label="モード選択"
                  outlined
                  color="warning"
                  class="bike-state-select"
                  >{{ bikeStateSelectItem }}</v-select
                >
              </v-col>
              <v-col cols="2"
                ><v-btn
                  class="bike-state-select-submit"
                  @click="onBikeStateSend()"
                  >送信</v-btn
                ></v-col
              >
            </v-row>
          </v-container>
        </v-card>
      </div>
    </v-main>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import ListItem from "@/components/ListItem.vue";
// import CodeInput from "vue-verification-code-input";
import CodeInput from "@/components/PinCodeInput.vue";
import bleMixin from "@/mixins/bleMixin.js";

export default {
  data() {
    return {
      //components
      title: "Bluetooth接続",
      // leftBtn: {},
      rightBtnList: {},
      bikeStateSelectItems: [
        { label: "スマホ認証を有効", value: "phone-with-Lock" },
        { label: "スマホ認証を無効", value: "phone-no-Lock" },
      ],
      bikeStateSelectItem: {
        label: "スマホ認証を有効",
        value: "phone-with-Lock",
      },

      // {
      //   id: 1,
      //   title: "back",
      //   icon: this.opalBle.currentBleIsAvailable
      //     ? this.opalBle.currentBleConnectDeviceIsAuth
      //       ? "bluetooth_connected"
      //       : "bluetooth"
      //     : "bluetooth_disabled",
      //   goto: "back",
      //   propItems: null,
      //   addCss: {},
      // },
      scanDeviceList: [
        {
          id: 1,
          attribute: "title",
          title: "接続可能なBluetooth一覧",
          iconRight: "arrow_forward_ios",
          iconLeft: "bluetooth",
          pictureLeftSrc: null,
          goto: null,
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
        },
      ],
      isScanLoading: false,
      isSavePassword: false,
      isFilledPassword: false,
      bikePinCode: ["", "", "", ""],
      // bikePinCode: [0, 0, 0, 0],
      isHelpDisplay: false,
      helpCode: "",
      // bikePassword: "",
      // isShowBikePassword: false,

      // bikePasswordRules: {
      //   required: (value) => !!value || "Required.",
      //   length: (v) =>
      //     v.length === 4 || "数字4文字のPINコードを入力してください。",
      //   emailMatch: () => `The email and password you entered don't match`,
      // },
      //locals
    };
  },
  methods: {
    test01() {
      // console.log(this.scanDeviceList);
      // console.log(this.$store.state.settingState.ble.connectedList);

      // console.log(this.helper);
      this.helper.snackFire({ message: "tes" });
      // console.log(this.bikePinCode);
      // console.log(this.getSavedBikePinCode());
      // window.localStorage.removeItem(this.bikePasswordKey);
      console.log(this.currentBleConnectDevice);
      let tes = this.$store.state.checkDeviceState.deviceState.bluetooth
        .isBluetoothAvailable;
      if (tes === true)
        this.$store.state.checkDeviceState.deviceState.bluetooth.isBluetoothAvailable = false;
      else
        this.$store.state.checkDeviceState.deviceState.bluetooth.isBluetoothAvailable = true;
    },
    onBleScan() {
      this.addScanBleList("reset");
      if (this.currentBleConnectDevice.isConnect) {
        this.opalBle.onBleDisConnect(this.currentBleConnectDevice.id, "select");
      }
      let that = this;
      let success = (device) => {
        // this.scanList.push(device);
        if (device.name !== undefined) {
          console.log(device.name, device);
          this.addScanBleList(device);
        }
      };

      let failed = (e) => {
        console.log("error:ble scan failed", e);
      };

      this.isScanLoading = true;
      ble.scan([], 5, success, failed);
      window.setTimeout(() => {
        this.isScanLoading = false;
        if (this.scanDeviceList.length <= 1) {
          //周りに検索可能なデバイスがない

          this.helper.snackFire({
            message: "周辺に検索可能なデバイスがありません。",
          });
        }
      }, 5000);
    },
    // onBleAutoConnect(id, target) {
    //   //disconnectを呼ぶと、自動接続が解除される
    //   // console.log(e);
    //   let deviceId = id;
    //   console.log("connect device id:", deviceId);
    //   let success = (deviceInfo) => {
    //     console.log("connected device info:", deviceInfo);
    //     this.$store.dispatch("settingState/setConnectedDevice", deviceInfo);
    //     switch (target) {
    //       // case "admin": {
    //       //   this.onBikeAdminSend();

    //       //   break;
    //       // }
    //       // case "reset": {
    //       //   this.onBikeResetSend();
    //       //   break;
    //       // }
    //       default: {
    //         this.onBikePasswordSend();
    //       }
    //     }
    //     this.opalBle.opalModeNotifyStart_isAuth({ deviceId, deviceInfo });
    //   };
    //   let failed = (e) => {
    //     console.log("auto connect error:", e);
    //     // window.alert("接続できませんでした。");
    //     //failed fire
    //     this.helper.snackFire({ message: "接続できませんでした。" });
    //     // this.onBleConnect(deviceId);
    //   };
    //   ble.autoConnect(deviceId, success, failed);
    // },
    onBleConnect({ id, pinCode, target }) {
      let deviceId = id;
      let success = (deviceInfo) => {
        console.log("connected device info:", deviceInfo);
        this.$store.dispatch("settingState/setConnectedDevice", deviceInfo);
        switch (target) {
          case "admin": {
            this.onBikeAdminSend();
            break;
          }
          case "reset": {
            this.onBikeResetSend();
            break;
          }
          case "test": {
            this.onBikeTestSend();
            break;
          }
          default: {
            this.opalBle.onBikePasswordSend({ id, pinCode, target: "auto" });
          }
        }
        this.opalBle.opalModeNotifyStart_isAuth({ deviceId });
      };
      let failed = (e) => {
        console.log("connect error:", e);

        this.helper.snackFire({ message: "接続できませんでした。" });
      };
      ble.connect(deviceId, success, failed);
    },

    onCompletePassword(num) {
      // window.alert("fin", num);
      // console.log("fin", num);
      this.bikePinCode = num.split("");
      this.isFilledPassword = true;
      if (this.isSavePassword) this.onSavePassword();
    },
    onSavePassword(target) {
      switch (target) {
        case "reset": {
          let obj = {
            isSavePassword: false,
            bikePinCode: ["", "", "", ""],
            isFilledPassword: false,
          };

          window.localStorage.setItem(
            this.opalBle.data.bikePasswordKey,
            JSON.stringify(obj)
          );
          break;
        }
        default: {
          let obj = {
            isSavePassword: this.isSavePassword,
            bikePinCode: this.bikePinCode,
            isFilledPassword: this.isFilledPassword,
          };
          if (this.isSavePassword)
            window.localStorage.setItem(
              this.opalBle.data.bikePasswordKey,
              JSON.stringify(obj)
            );
        }
      }
    },
    // getSavedBikePinCode() {
    //   return JSON.parse(window.localStorage.getItem(this.bikePasswordKey));
    // },
    onBikePasswordOverwrite() {
      let writePassword = this.bikePinCode.map((val) => {
        return Number(val);
      });
      console.log("write pin", writePassword);
      this.opalBle.data.connectType = 4;
      this.opalBle.data.pinCode = writePassword;
      this.opalBle.opalPinUpdate("PINを書き換えました。");
    },

    onBikeAdminSend() {
      let sendPassword = this.bikePinCode.map((val) => {
        return Number(val);
      });
      // console.log("send pin", sendPassword);
      this.opalBle.data.connectType = 6;
      this.opalBle.data.pinCode = sendPassword;
      this.opalBle.opalPinUpdate();
    },
    onBikeResetSend() {
      let sendPassword = this.bikePinCode.map((val) => {
        return Number(val);
      });
      // console.log("send pin", sendPassword);
      this.opalBle.data.connectType = 7;
      this.opalBle.data.pinCode = sendPassword;
      this.opalBle.opalPinUpdate();
    },
    async onBikeStateSend() {
      switch (this.bikeStateSelectItem) {
        case "phone-with-Lock": {
          this.opalBle.data.connectType = 3;
          this.opalBle.data.modeType = 0;
          this.opalBle.data.stateType = 2;
          break;
        }
        case "phone-no-Lock": {
          this.opalBle.data.connectType = 3;
          this.opalBle.data.modeType = 0;
          this.opalBle.data.stateType = 3;
          break;
        }
      }

      let isUpdate = await this.opalBle.opalModeUpdate("モード変更");
      console.log("isUpdate", isUpdate);
      if (isUpdate) {
        window.localStorage.setItem(
          this.opalBle.data.bikePhoneStateKey,
          JSON.stringify(this.bikeStateSelectItem)
        );
      }
    },
    onBikeTestSend() {
      let sendPassword = this.bikePinCode.map((val) => {
        return Number(val);
      });
      // console.log("send pin", sendPassword);
      this.opalBle.data.connectType = 8;
      this.opalBle.data.pinCode = sendPassword;
      this.opalBle.opalPinUpdate();
    },
    //
    addScanBleList(deviceInfo) {
      switch (deviceInfo) {
        case "reset": {
          let title = this.scanDeviceList.find((val) => {
            return val.attribute === "title";
          });
          this.scanDeviceList = [title];
        }
        case "scanDeviceListLength": {
          return this.scanDeviceList.length;
        }
        default: {
          let { name, id, rssi } = deviceInfo;

          let maxId = this.scanDeviceList.reduce((acc, val) => {
            return acc.id > val.id ? acc : val;
          }).id;
          let obj = {
            id: id,
            pinCode: this.bikePinCode,
            target: "first2",
          };
          // console.log(maxId);
          let addObj = {
            id: maxId + 1,
            attribute: "item",
            title: name,
            iconRight: null,
            iconLeft: "bluetooth",
            pictureLeftSrc: null,
            goto: this.opalBle.onBleAutoConnect,
            propItems: obj,
            addCss: {},
            active: false,
            subItems: null,
          };
          this.scanDeviceList.push(addObj);
        }
      }
    },
    notifyBleSetting() {
      //
      this.helper.snackFire({
        message: "BluetoothがOFFです",
        timeout: "10000",
        btnArry: [
          {
            title: "設定を開く",
            click: () => {
              // this.goto("settingBle");
              this.$store.dispatch("checkDeviceState/open_bluetooth_setting");
            },
            // style: { color: "red" },
            isIcon: false,
          },
          {
            title: "×",
            click: () => {
              // this.goto("settingBle");
              // this.$store.dispatch("checkDeviceState/open_bluetooth_setting");
              this.$store.dispatch("snackBarState/setIsSnackbar", false);
            },
            style: { color: "white" },
            isIcon: true,
          },
        ],
      });
    },
    checkReload() {
      //PINコード保存状況
      let savedBikePinCode = this.opalBle.getSavedBikePinCode();
      if (savedBikePinCode) {
        this.isSavePassword = savedBikePinCode.isSavePassword;
        savedBikePinCode.bikePinCode
          ? (this.bikePinCode = savedBikePinCode.bikePinCode)
          : null;
        this.isFilledPassword = savedBikePinCode.isFilledPassword;
      }

      //BIkePhoneState保存状況確認
      let savedBikePhoneState = JSON.parse(
        window.localStorage.getItem(this.opalBle.data.bikePhoneStateKey)
      );
      if (savedBikePhoneState === null) {
        window.localStorage.setItem(
          this.opalBle.data.bikePhoneStateKey,
          JSON.stringify(this.bikeStateSelectItem)
        );
      } else {
        this.bikeStateSelectItem = savedBikePhoneState;
      }
    },
    checkBeforeScan() {
      if (this.opalBle.currentBleIsAvailable && this.isFilledPassword) {
        //Bluetooth OK && PINコード入力済み
        return true;
      } else if (!this.opalBle.currentBleIsAvailable) {
        this.notifyBleSetting();
        return false;
      } else if (!this.isFilledPassword) {
        this.helper.snackFire({ message: "PINコードを入力してください。" });
        return false;
      }
    },
    doHelp() {
      let helpCodeArry = this.helpCode.split(" ");
      switch (helpCodeArry[0]) {
        case "open": {
          switch (helpCodeArry[1]) {
            case "sesami": {
              if (this.currentBleConnectDevice.isConnect) {
                this.opalBle.onBleDisConnect(
                  this.currentBleConnectDevice.id,
                  "select"
                );
              }
              this.onBleScan();
              window.setTimeout(() => {
                let opalDevice = this.scanDeviceList.filter((val) => {
                  return val.title === "opal_system";
                })[0];
                if (opalDevice) {
                  opalDevice.propItems.target = "admin";
                  this.onBleConnect(opalDevice.propItems);
                }
              }, 3000);
              break;
            }
            case "reset": {
              if (this.currentBleConnectDevice.isConnect) {
                this.opalBle.onBleDisConnect(
                  this.currentBleConnectDevice.id,
                  "select"
                );
              }
              this.onBleScan();
              window.setTimeout(() => {
                let opalDevice = this.scanDeviceList.filter((val) => {
                  return val.title === "opal_system";
                })[0];
                if (opalDevice) {
                  opalDevice.propItems.target = "reset";

                  this.onBleConnect(opalDevice.propItems);
                }
              }, 3000);
              break;
            }
            case "test": {
              if (this.currentBleConnectDevice.isConnect) {
                this.opalBle.onBleDisConnect(
                  this.currentBleConnectDevice.id,
                  "select"
                );
              }
              this.onBleScan();
              window.setTimeout(() => {
                let opalDevice = this.scanDeviceList.filter((val) => {
                  return val.title === "opal_system";
                })[0];
                if (opalDevice) {
                  opalDevice.propItems.target = "test";
                  this.onBleConnect(opalDevice.propItems);
                }
              }, 3000);
              break;
            }
            case "extreme": {
              this.opalBle.data.modeType = 10;
              this.opalBle.data.connectType = 3;
              this.opalBle.opalModeUpdate("エクストリーム モード変更");
              // this.$router.push("/");

              break;
            }
          }
          break;
        }
      }
      console.log("help", helpCodeArry);
    },
  },
  computed: {
    currentBleConnectDevice() {
      // currentConnectDevice: {
      //   name: "test",
      //   advertising: new Uint8Array(4),
      //   services: ["this is service"],
      //   characteristics: [{ characteristic: "this is chara" }],
      //   rssi: 10000,
      //   isConnect: false,
      //   isAutoConnect: false,
      //   isAuth:false,
      // },
      return this.$store.getters["settingState/getCurrentBleConnectDevice"];
    },
  },
  mounted() {
    this.checkReload();
    this.opalBle.initBleEventListener();
  },

  mixins: [bleMixin],

  watch: {
    isSavePassword(bool) {
      if (bool) this.onSavePassword();
      else this.onSavePassword("reset");
    },
  },
  components: {
    TopHeader,
    ListItem,
    CodeInput,
  },
};
</script>

<style lang="scss">
#SettingBle {
  #topHeader_here {
    position: absolute;
    // top: 7vh;
    right: 0px;
    background-color: rgba(0, 0, 0, 0);
    height: $__header-tab-height;
    padding: 0px;
    z-index: 100000;
    * {
      height: 100%;
    }
    .ble-state-button {
      .v-icon {
        font-size: 3rem;
        background-color: rgba(0, 0, 0, 0);
        height: 100%;
        width: 100%;
        border-radius: 50%;
      }
    }
  }
  .bike-password-container {
    background-color: white;
    display: grid;
    height: 100%;

    // justify-content: center;
    justify-items: center;
    align-items: center;
    .row {
      width: 100%;
    }

    .bike-password-input {
      align-self: center;
    }
    .bike-help-input {
      transform: translate(0%, 25%);
    }

    .bike-state-select-container {
      justify-items: center;
      align-items: center;
      .bike-state-select-submit {
        align-self: center;
      }
      .bike-state-select {
        margin-top: 2vh;
      }
    }
  }
}
</style>
