<template>
  <div id="topHome">
    <!-- <top-header :title="title"></top-header> -->

    <v-container id="topHeader_here">
      <v-row>
        <v-col cols="10"></v-col>
        <v-col cols="2">
          <v-btn
            icon
            class="ble-state-button"
            @click="
              currentBleIsAvailable ? goto('settingBle') : notifyBleSetting()
            "
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
      </v-row>
    </v-container>

    <v-main>
      <!-- <v-btn @click="tes2">test</v-btn> -->

      <v-container id="logoComponent">
        <v-row no-gutters class="logo-container__row">
          <v-col
            class="logo-container btn"
            @click="
              currentBleConnectDevice.isConnect ? null : goto('settingBle')
            "
          >
            <v-img alt="" src="../assets/logo.png"></v-img>
            <span
              v-show="!currentBleConnectDevice.isConnect"
              class="disconnectedMessage"
            >
              未接続...
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-btn @click="test">test</v-btn>
          <div>{{ currentBleState.bluetoothState }}</div>
        </v-row>
      </v-container>
      <v-container id="userIconComponent" v-if="false">
        <v-row no-gutters class="use-icon-container__row ">
          <v-col class="use-icon-container btn" @click="goto('topSetting')">
            <v-icon class="material-icons">account_circle</v-icon>
          </v-col>
        </v-row>
        <v-row no-gutters class="use-info-container__row">
          <v-col class="use-info-container">
            <p class="user-name">test taro</p>
            <p class="user-status">ステータス:something</p>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <div v-for="listItem in myBikeItems" :key="listItem.id">
          <list-item-unit
            :listItem="listItem"
            @click_dialog="updateDisplayMode($event)"
          ></list-item-unit>
        </div>
      </v-container>
      <!-- <div class="btn-logout-container">
        <v-btn class="btn-logout" outlined color="red" @click="logout"
          >ログアウト</v-btn
        >
      </div> -->
    </v-main>
    <!-- <top-footer></top-footer> -->
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import TopFooter from "@/components/TopFooter.vue";
import ListItemUnit from "@/components/ListItemUnit.vue";
import IconBtnTransition from "@/components/IconBtnTransition.vue";

import bleMixin from "@/mixins/bleMixin.js";

export default {
  data() {
    return {
      //component data
      title: "home",

      // rightBtnList: [],
      // leftBtn: {},
      myBikeItems: [
        {
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
        },
        {
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
                this.opalBle.opalModeSetter("connect");
                this.opalBle.opalModeUpdate();
                self.title = "鍵を閉める";
                self.iconLeft = "lock_open";
              } else {
                //close
                this.opalBle.opalModeSetter("disConnect");
                this.opalBle.opalModeUpdate();
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
        },
        {
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
        },

        {
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
        },
        {
          id: 5,
          attribute: "item",
          title: "デバイス連動",
          iconRight: "arrow_forward_ios",
          iconLeft: "lock",
          pictureLeftSrc: null,
          goto: () => {
            let self = this.myBikeItems.find((item) => {
              return item.id === 5;
            });

            if (this.checkBikeIsConnected()) {
              if (self.title === "デバイス連動") {
                //open
                this.opalBle.opalModeSetter("continuous");
                this.opalBle.opalModeUpdate();
                self.title = "デバイス非連動";
                self.iconLeft = "lock_open";
              } else {
                //close
                this.opalBle.opalModeSetter("disconnectLock");
                this.opalBle.opalModeUpdate();
                self.title = "デバイス連動";
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
        },
        // {
        //   id: 6,
        //   attribute: "item",
        //   title: "testBle",
        //   iconRight: "arrow_forward_ios",
        //   iconLeft: "bluetooth",
        //   pictureLeftSrc: null,
        //   goto: "testBle",
        //   propItems: null,
        //   addCss: {},
        //   active: false,
        //   subItems: null,
        //   isDisable: false,
        //   reload: 0,
        // },

        // {
        //   id: 4,
        //   attribute: "item",
        //   title: "バイク情報",
        //   iconRight: "arrow_forward_ios",
        //   iconLeft: "info",
        //   pictureLeftSrc: null,
        //   goto: null,
        //   propItems: null,
        //   addCss: {},
        //   active: false,
        //   subItems: null,
        //   isDisable: false,
        //   reload: 0,
        // },
      ],
      selectMode: "eco",
      //methods data
      // currentBleConnectDevice: {
      //   isConnect: false,
      // },
    };
  },
  computed: {
    currentBleConnectDevice() {
      return this.$store.getters["settingState/getCurrentBleConnectDevice"];
    },
    currentBleState() {
      return this.$store.getters["checkDeviceState/getCurrentBleState"];
    },
    currentBleIsAvailable() {
      return this.$store.getters["checkDeviceState/getCurrentBleState"]
        .isBluetoothAvailable;
    },
  },
  methods: {
    test() {
      console.log("tess");
      // this.$store.dispatch("checkDeviceState/open_bluetooth_setting");
      // this.$state.store.checkDeviceState.deviceState.bluetooth.isBluetoothAvailable = ture;
      let tes = this.$store.state.checkDeviceState.deviceState.bluetooth
        .isBluetoothAvailable;
      if (tes === true)
        this.$store.state.checkDeviceState.deviceState.bluetooth.isBluetoothAvailable = false;
      else
        this.$store.state.checkDeviceState.deviceState.bluetooth.isBluetoothAvailable = true;

      console.log(this.$store.state.checkDeviceState.deviceState.bluetooth);
      console.log("currentBleIsAvailable", this.currentBleIsAvailable);
      let tes2 = [
        {
          title: "aa2",
          click: () => {
            // window.alert("aa");
            this.goto("settingBle");
          },
          style: { color: "red" },
        },
        {
          title: "bb",
        },
      ];
      // this.helper.snackFire({
      //   message: "tes",
      //   timeout: "10000",
      //   btnArry: tes2,
      // });
    },

    tes2() {
      // window.alert("tesss");
      // this.updateDisplayMode("ECO");
      this.test();
    },

    //utils
    goto(where) {
      this.$router.push(where);
    },
    notifyBleSetting() {
      //
      this.helper.snackFire({
        message: "BluetoothがOFFです",
        timeout: "100000",
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
    updateDisplayMode(obj) {
      //バイクの走行モードの表示を変更
      this.selectMode = obj.value;
      this.opalBle.opalModeSetter(this.selectMode);
      this.myBikeItems[2].title = obj.label;
      if (this.opalBle.data.connectType === 1) {
        this.opalBle.opalModeUpdate();
      }
    },
    checkBikeIsConnected() {
      //バイクが接続状態なのか確認する

      // console.log("check", this.currentBleConnectDevice.isConnect);
      // this.currentBleConnectDevice = this.currentBleConnectDevice_state;

      //接続していなければ非表示にするリストID
      let disableIdList = [2, 3];
      let disableListArry = this.myBikeItems.filter((item) => {
        return disableIdList.find((val) => {
          return val === item.id;
        });
      });

      if (this.currentBleConnectDevice.isConnect) {
        disableListArry.forEach((item) => {
          item.isDisable = false;
        });
        // this.myBikeItems[2].isDisable = false; //mode
        // this.myBikeItems[3].isDisable = false; //bike info
        return true;
      } else {
        disableListArry.forEach((item) => {
          item.isDisable = true;
        });
        // this.myBikeItems[2].isDisable = true; //mode
        // this.myBikeItems[3].isDisable = true; //bike info
        return false;
      }
    },
    autoConnectBle() {
      console.log("1:", window.localStorage.getItem("connectDeviceId"));
      console.log("2:", this.currentBleConnectDevice.isConnect);
      if (window.localStorage.getItem("connectDeviceId")) {
        let deviceId = window.localStorage.getItem("connectDeviceId");
        let failed = (e) => {
          console.log("error:ble scan failed", e);
        };

        ble.scan(
          [],
          5,
          (device) => {
            if (device.id === deviceId) {
              ble.autoConnect(
                deviceId,
                () => {
                  this.helper.snackFire({ message: "自動接続" });
                },
                failed
              );
            }
          },
          failed
        );
      }
    },
  },
  watch: {},
  beforeCreate() {},
  mounted() {
    this.checkBikeIsConnected();
    // this.$store.dispatch("checkDeviceState/checkState");
    this.$store.dispatch("checkDeviceState/checkState");
    // this.autoConnectBle();
  },
  created() {},
  mixins: [bleMixin],
  components: {
    TopHeader,
    TopFooter,
    ListItemUnit,
    IconBtnTransition,
  },
};
</script>

<style lang="scss">
#topHome {
  overflow-y: scroll;

  height: 100vh;

  #topHeader_here {
    background-color: rgba(0, 0, 0, 0);
    height: $__header-tab-height;
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

  .v-main {
    margin-top: $__header-tab-height;
    padding: 0 !important;
    height: calc(100vh - #{$__header-tab-height} - #{$__footer-tab-height});
    // height: 100vh;
    #logoComponent {
      width: 50vw;
      height: 50vw;
      .logo-container {
        position: relative;
        .disconnectedMessage {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: (translate(-50%, -50%));
          font-size: 1rem;
          font-weight: bold;
          background-color: red;
        }
      }
    }
    #userIconComponent {
      .use-icon-container__row {
        height: 30vw;
        .use-icon-container {
          display: flex;
          justify-content: center;
          align-content: center;

          .v-icon {
            font-size: 30vw;
            filter: $__filter-color-white;
          }
        }
      }
      .use-info-container__row {
        .use-info-container {
          display: grid;
          justify-content: center;
          align-content: center;
          p {
            margin: 0;
            text-align: center;
          }
          .user-name {
            font-size: 1.2rem;
            font-weight: bold;
          }
        }
      }
    }
  }
  .btn-logout-container {
    width: 100%;
    height: $__footer-tab-height;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn-logout {
      width: 80%;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 204, 204, 1);
    }
  }
}
</style>
