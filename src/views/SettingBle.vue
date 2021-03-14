<template>
  <div id="SettingBle">
    <top-header :title="title" :right="rightBtnList"></top-header>
    <v-col cols="2" id="topHeader_here">
      <v-btn
        icon
        class="ble-state-button"
        @click="currentBleIsAvailable ? null : notifyBleSetting()"
      >
        <v-icon>
          {{
            currentBleIsAvailable
              ? currentBleConnectDevice.isConnect
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

      <v-card
        class="mx-auto"
        max-width="344"
        outlined
        elevation="2"
        :disabled="!currentBleConnectDevice.isConnect"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">
              接続中のデバイス
              <v-divider></v-divider>
            </div>
            <v-list-item-title class="headline mb-1">
              {{ currentBleConnectDevice.name }}
            </v-list-item-title>
            <v-list-item-subtitle
              >RSSI:{{ currentBleConnectDevice.rssi }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn outlined rounded text @click="onBleDisConnect()">
            接続解除
          </v-btn>
        </v-card-actions>
      </v-card>
      <div class="mt-5"></div>
      <v-btn @click="onBleScan()" width="100vw" :loading="isScanLoading"
        >検索</v-btn
      >

      <list-item :listItems="scanDeviceList"></list-item>
      <!-- 
      <v-btn @click="onBleDisConnect()">接続解除</v-btn>
      <v-btn @click="test01()">test</v-btn>
      <v-btn @click="test01()">test2</v-btn> -->
    </v-main>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import ListItem from "@/components/ListItem.vue";

export default {
  data() {
    return {
      //components
      title: "Bluetooth接続",
      // leftBtn: {},
      rightBtnList: {},
      // {
      //   id: 1,
      //   title: "back",
      //   icon: this.currentBleIsAvailable
      //     ? this.currentBleConnectDevice.isConnect
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

      //locals
    };
  },
  methods: {
    test01() {
      // console.log(this.scanDeviceList);
      // console.log(this.$store.state.settingState.ble.connectedList);

      console.log(this.helper);
      this.helper.snackFire({ message: "tes" });
    },
    onBleScan() {
      this.addScanBleList("reset");
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
      console.log("window", window);
      console.log("cordova", cordova);
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
    onBleAutoConnect(id) {
      //disconnectを呼ぶと、自動接続が解除される
      // console.log(e);
      let deviceId = id;
      console.log("connect device id:", deviceId);
      let success = (deviceInfo) => {
        // window.alert("success AutoConnect: ");
        // window.alert("接続成功");
        window.localStorage.setItem("connectDeviceId", deviceId);
        //success fire
        this.helper.snackFire({ message: "接続成功" });

        console.log("connected device info:", deviceInfo);
        this.$store.dispatch("settingState/setConnectedDevice", deviceInfo);
        this.$router.go(-1);
        // this.$router.push({ name: "testBle" });
        // this.$router.push({ name: "topSetting" });
      };
      let failed = (e) => {
        console.log("auto connect error:", e);
        // window.alert("接続できませんでした。");
        //failed fire
        this.helper.snackFire({ message: "接続できませんでした。" });

        // this.onBleConnect(deviceId);
      };
      ble.autoConnect(deviceId, success, failed);
    },
    onBleConnect(id) {
      //disconnectを呼ぶと、自動接続が解除される
      // console.log(e);
      let deviceId = id;
      console.log("connect device id:", deviceId);
      let success = (deviceInfo) => {
        // window.alert("success Connect: ");
        this.helper.snackFire({ message: "接続成功" });
        console.log("connected device info:", deviceInfo);
        this.$store.dispatch("settingState/setConnectedDevice", deviceInfo);
      };
      let failed = function(e) {
        this.helper.snackFire({ message: "接続できませんでした。" });
        console.log("connect error:", e);
      };
      ble.autoConnect(deviceId, success, failed);
    },
    onBleDisConnect() {
      let deviceId = this.$store.state.settingState.ble.currentConnectDeviceId;
      if (deviceId === null)
        this.helper.snackFire({
          message: "接続しているデバイスがありません。",
        });

      console.log(deviceId);
      let success = () => {
        // window.alert("success disconnect: " + getID);
        this.helper.snackFire({ message: "接続解除" });
        this.$store.dispatch("settingState/setDisconnectState", deviceId);
      };
      let failed = function(e) {
        console.log("disconnect error:", e);
      };
      ble.disconnect(deviceId, success, failed);
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

          // console.log(maxId);
          let addObj = {
            id: maxId + 1,
            attribute: "item",
            title: name,
            iconRight: null,
            iconLeft: "bluetooth",
            pictureLeftSrc: null,
            goto: this.onBleAutoConnect,
            propItems: id,
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
      // },
      let currentBleConnectDevice = this.$store.getters[
        "settingState/getCurrentBleConnectDevice"
      ];
      if (currentBleConnectDevice.isConnect) {
        return currentBleConnectDevice;
      } else {
        return currentBleConnectDevice;
      }
    },
    currentBleIsAvailable() {
      return this.$store.getters["checkDeviceState/getCurrentBleState"]
        .isBluetoothAvailable;
    },
    currentBleConnectDevice() {
      return this.$store.getters["settingState/getCurrentBleConnectDevice"];
    },
  },
  components: {
    TopHeader,
    ListItem,
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
}
</style>
