<template>
  <div id="SettingBle">
    <top-header
      :title="title"
      :left="leftBtn"
      :right="rightBtnList"
    ></top-header>
    <v-main app>
      <v-btn @click="onBleScan()">scan</v-btn>

      <list-item :listItems="scanDeviceList"></list-item>

      <v-btn @click="onBleDisConnect()">接続解除</v-btn>
      <v-btn @click="test01()">test</v-btn>
      <v-btn @click="test01()">test2</v-btn>
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

      //locals
      isSnackbar: false,
      snackbarMessage: "hello",
    };
  },
  methods: {
    test01() {
      // console.log(this.scanDeviceList);
      // console.log(this.$store.state.settingState.ble.connectedList);
      // this.isSnackbar = !this.isSnackbar;
      this.$store.dispatch("snackbarState/fire", {
        message: "fireee",
        // timeout: 5000,
      });
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

      ble.scan([], 5, success, failed);
    },
    onBleAutoConnect(id) {
      //disconnectを呼ぶと、自動接続が解除される
      // console.log(e);
      let deviceId = id;
      console.log("connect device id:", deviceId);
      let success = (deviceInfo) => {
        // window.alert("success AutoConnect: ");
        window.alert("接続成功");
        console.log("connected device info:", deviceInfo);
        this.$store.dispatch("settingState/setConnectedDevice", deviceInfo);
        this.$router.push({ name: "testBle" });
        // this.$router.push({ name: "topSetting" });
      };
      let failed = (e) => {
        console.log("auto connect error:", e);
        window.alert("接続できませんでした。");
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
        window.alert("success Connect: ");
        console.log("connected device info:", deviceInfo);
        this.$store.dispatch("settingState/setConnectedDevice", deviceInfo);
      };
      let failed = function(e) {
        console.log("connect error:", e);
      };
      ble.autoConnect(deviceId, success, failed);
    },
    onBleDisConnect() {
      let deviceId = this.$store.state.settingState.ble.currentConnectDeviceId;
      if (deviceId === null) window.alert("まだ接続していません。");
      console.log(deviceId);
      let success = () => {
        // window.alert("success disconnect: " + getID);
        this.$store.dispatch("settingState/setDisconnectState", deviceId);
      };
      let failed = function(e) {
        console.log("disconnect error:", e);
      };
      ble.disconnect(deviceId, success, failed);
    },

    //
    addScanBleList(deviceInfo) {
      if (deviceInfo === "reset") {
        let title = this.scanDeviceList.shift();
        this.scanDeviceList.splice(0, 0, title);
      } else {
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
    },
  },

  components: {
    TopHeader,
    ListItem,
  },
};
</script>

<style lang="scss"></style>
