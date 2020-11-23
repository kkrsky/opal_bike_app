<template>
  <div id="TestBle">
    <top-header
      :title="title"
      :left="leftBtn"
      :right="rightBtnList"
    ></top-header>
    <v-main app>
      <v-btn @click="onBleScan()">scan</v-btn>
      <v-btn @click="onBleConnect()">onBleConnect</v-btn>
      <v-btn @click="onBleDisConnect()">onBleDisConnect</v-btn>
      <v-btn @click="onBleAutoConnect()">onBleAutoConnect</v-btn>
      <div class="mt-5"></div>

      <div>
        <h2>connected device info</h2>
        <div>-----------------------------</div>
        <div>name:{{ connectDeviceInfo.name }}</div>
        <ul>
          <p>service:</p>
          <v-btn
            @click="setSelectService(serviceId)"
            v-for="serviceId in connectDeviceInfo.services"
            :key="serviceId"
          >
            {{ serviceId }}
          </v-btn>
        </ul>
        <div class="mt-5"></div>
        <ul>
          <p>characteristic:</p>
          <v-btn
            @click="setSelectCharacteristic(charaObj.characteristic)"
            v-for="charaObj in connectDeviceInfo.characteristics"
            :key="charaObj.characteristic"
          >
            {{ charaObj.characteristic }}
          </v-btn>
        </ul>
        <div>RSSI:{{ connectDeviceInfo.rssi }}</div>
        <div>
          <p>Advertising:</p>
          {{ advertisingData }}
        </div>
        <div>-----------------------------</div>
      </div>
      <div>
        <div>-----------------------------</div>
        <div>
          service ID:
          <span
            :class="{
              danger: selectServiceId === '接続先のIDを選択してください',
              success: selectServiceId !== '接続先のIDを選択してください',
            }"
            >{{ selectServiceId }}</span
          >
        </div>
        <div>
          characteristic ID:<span
            :class="{
              danger: selectCharactristicId === '接続先のIDを選択してください',
              success: selectCharactristicId !== '接続先のIDを選択してください',
            }"
            >{{ selectCharactristicId }}</span
          >
        </div>
        <div>-----------------------------</div>
      </div>
      <h2>read,write,notify</h2>
      <div v-show="!isOperateBle">
        <p>service IDとcharacteristic ID を設定してください</p>
      </div>
      <div v-show="isOperateBle">
        <v-btn @click="onBleRead()">onBleRead</v-btn>
        <v-btn @click="onBleReadLQ()">onBleRead LQ</v-btn>
        <v-btn @click="onBleWrite()">onBleWrite</v-btn>
        <v-btn @click="onStartNotify()">onStartNotify</v-btn>
        <v-btn @click="onStopNotify()">onStopNotify</v-btn>

        <div class="mt-5"></div>
        <div>
          <p>read data</p>
          <div>-----------------------------</div>
          {{ readData }}
          <div>-----------------------------</div>
        </div>
        <div class="mt-5"></div>
        <div>
          <p>read data Liquantech</p>
          <div>-----------------------------</div>
          {{ readDataLQ }}
          {{ readDataLQAll }}
          <div>-----------------------------</div>
        </div>
        <div class="mt-5"></div>
        <div>
          <p>write data (16進数)</p>
          <div>-----------------------------</div>
          <input v-model="writeData16" />
          (10進数)=>{{ writeData10 }}
          <div>-----------------------------</div>
        </div>
        <div class="mt-5"></div>

        <div>
          <p>notify data</p>
          <div>-----------------------------</div>

          {{ notifyData }}
          <div>-----------------------------</div>
        </div>
        <div class="mt-5"></div>
      </div>

      <h2>その他機能</h2>
      <v-btn @click="initStartBleStateNofity()">initStartBleStateNofity</v-btn>
      <v-btn @click="onStopBleStateNofity()">onStopBleStateNofity</v-btn>
      <v-btn @click="onReadRssi()">onReadRssi</v-btn>
      <v-btn @click="onBoundedDevice()">onBoundedDevice</v-btn>
      <v-btn @click="tes2()">test2</v-btn>
    </v-main>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";

export default {
  data() {
    return {
      title: "test ble page",
      tes: "tes",
      readData: "this is read data",
      readDataLQ: "this is read data LQ",
      readDataLQAll: "this is read data LQ all",
      writeData16: 51,
      notifyData: "this is notify data",
      selectServiceId: "接続先のIDを選択してください",
      selectCharactristicId: "接続先のIDを選択してください",
      // leftBtn: {
      //   id: 1,
      //   title: "back",
      //   icon: "arrow_back_ios",
      //   goto: "back",
      //   propItems: null,
      //   addCss: {},
      // },
      rightBtnList: {},
    };
  },
  computed: {
    connectDeviceInfo() {
      return this.$store.state.settingState.ble.currentConnectDevice;
    },
    advertisingData() {
      return this.bytesToString(this.connectDeviceInfo.advertising);
    },
    isOperateBle() {
      if (
        this.selectServiceId !== "接続先のIDを選択してください" &&
        this.selectCharactristicId !== "接続先のIDを選択してください"
      )
        return true;
      else false;
    },
    writeData10() {
      return parseInt(this.writeData16, 16);
    },
  },
  methods: {
    tes2() {
      console.log("tes");
      // console.log(window.ble);
      console.log(this.selectServiceId);

      // this.onBLEScan();
    },
    onBleScan() {
      ble.scan(
        [],
        5,
        function(device) {
          //deviceが見つかるたびに呼び出される
          console.log(device);
        },
        (e) => {
          console.log("error:ble scan failed", e);
        }
      );
    },
    onBleConnect() {
      let deviceId = "6C:05:2B:EA:6B:78";
      let success = function(getID) {
        window.alert("success connect: " + getID);
      };
      let failed = function(e) {
        console.log("connect error:", e);
      };
      ble.connect(deviceId, success, failed);
    },
    onBleDisConnect() {
      let deviceId = "6C:05:2B:EA:6B:78";
      let success = function(getID) {
        window.alert("success disconnect: " + getID);
      };
      let failed = function(e) {
        console.log("disconnect error:", e);
      };
      ble.disconnect(deviceId, success, failed);
    },
    onBleAutoConnect() {
      //disconnectを呼ぶと、自動接続が解除される
      let deviceId = "6C:05:2B:EA:6B:78";
      let success = function(getID) {
        window.alert("success AutoConnect: " + getID);
      };
      let failed = function(e) {
        console.log("auto connect error:", e);
      };
      ble.autoConnect(deviceId, success, failed);
    },
    onBleRead() {
      let device_id = this.connectDeviceInfo.id;
      let service_uuid = this.selectServiceId;
      let characteristic_uuid = this.selectCharactristicId;
      let success = (readData) => {
        let unit8View = new Uint8Array(readData);
        this.readData = "[" + unit8View.join(" ") + "]";
        // this.readData = this.bytesToString(readData);
        window.alert("success readData: " + this.readData);
        console.log("success readData: " + this.readData);
      };
      let failed = (e) => {
        console.log("readData error:", e);
      };
      ble.read(device_id, service_uuid, characteristic_uuid, success, failed);
    },
    onBleReadLQ() {
      let device_id = this.connectDeviceInfo.id;
      let service_uuid = this.selectServiceId;
      let characteristic_uuid = this.selectCharactristicId;
      let success = (readData) => {
        var dataview = new DataView(readData);
        var ints = new Uint8Array(readData.byteLength);
        for (var i = 0; i < ints.length; i++) {
          ints[i] = dataview.getUint8(i);
        }
        console.log("ints", ints);
        var batteryValue = (ints[1] & 0x1f) >> 2;

        this.readDataLQ = "[" + batteryValue + "]";
        this.readDataLQAll = "[" + ints.join(" ") + "]";
        // this.readData = this.bytesToString(readData);
        window.alert("success readData: " + this.readData);
        console.log("success readData: " + this.readData);
      };
      let failed = (e) => {
        console.log("readData error:", e);
      };
      ble.read(device_id, service_uuid, characteristic_uuid, success, failed);
    },
    onBleWrite() {
      let device_id = this.connectDeviceInfo.id;
      let service_uuid = this.selectServiceId;
      let characteristic_uuid = this.selectCharactristicId;
      // let service_uuid = "0000";
      // let characteristic_uuid = "66F17DC4-5D6B-425F-9951-5342D85CB01B";
      let success = (ok) => {
        window.alert("success write: ", ok);
        console.log("success write: ", ok);
      };
      let failed = (e) => {
        console.log("write error:", e);
      };
      let writeData = new Uint16Array(1);
      // writeData16[0] = Number(this.writeData16);
      writeData[0] = Number(this.writeData10);
      // let writeData16_bytes = this.stringToBytes(this.writeData16);
      console.log("writeData16", writeData);
      ble.write(
        device_id,
        service_uuid,
        characteristic_uuid,
        writeData.buffer,
        success,
        failed
      );
    },
    onStartNotify() {
      // let device_id = "";
      let device_id = this.connectDeviceInfo.id;
      let service_uuid = this.selectServiceId;
      let characteristic_uuid = this.selectCharactristicId;
      // let service_uuid = "0000";
      // let characteristic_uuid = "66F17DC4-5D6B-425F-9951-5342D85CB01B";
      // let success = (notifyData) => {
      //   this.notifyData = this.bytesToString(notifyData);

      //   // window.alert("success readData: " + this.bytesToString(notifyData));
      //   console.log("success notifyData: " + this.bytesToString(notifyData));
      // };
      let success = (notifyData) => {
        console.log("notifyData", notifyData);
        let unit8View = new Uint8Array(notifyData);
        console.log("change: " + unit8View[0]);
        this.notifyData = "[" + unit8View.join(" ") + "]";
        // window.alert("change: " + data[0]);
      };
      let failed = (e) => {
        console.log("notify error:", e);
      };
      ble.startNotification(
        device_id,
        service_uuid,
        characteristic_uuid,
        success,
        failed
      );
    },
    onStopNotify() {
      let device_id = this.connectDeviceInfo.id;
      let service_uuid = this.selectServiceId;
      let characteristic_uuid = this.selectCharactristicId;
      let success = (notifyData) => {
        window.alert("success readData: " + this.bytesToString(notifyData));
      };
      let failed = (e) => {
        console.log("readData error:", e);
      };
      ble.stopNotification(
        device_id,
        service_uuid,
        characteristic_uuid,
        success,
        failed
      );
    },

    initStartBleStateNofity() {
      //デバイスのbleに関する状態を検知
      /**
        "on"
        "off"
        "turningOn" (Android Only)
        "turningOff" (Android Only)
        "unknown" (iOS Only)
        "resetting" (iOS Only)
        "unsupported" (iOS Only)
        "unauthorized" (iOS Only)
       */
      ble.startStateNotifications((state) => {
        console.log("Bluetooth is " + state);
      });
    },
    onStopBleStateNofity() {
      //デバイスのbleに関する状態を検知
      ble.stopStateNotifications((state) => {
        console.log("Bluetooth is " + state);
      });
    },
    onReadRssi() {
      let device_id = "";
      let success = (rssi) => {
        window.alert("success readData: " + rssi);
      };
      let failed = (e) => {
        console.log("readData error:", e);
      };
      ble.readRSSI(device_id, success, failed);
    },

    onBoundedDevice() {
      //Android only
      //接続可能なペリフェラルデバイスリストを取得？
      let success = (boundedDevice) => {
        window.alert("success readData: " + boundedDevice);
        console.log("success readData: " + boundedDevice);
      };
      let failed = (e) => {
        console.log("readData error:", e);
      };
      ble.bondedDevices(success, failed);
    },

    setSelectService(item) {
      this.selectServiceId = item;
    },
    setSelectCharacteristic(item) {
      this.selectCharactristicId = item;
    },
    //utils
    stringToBytes(string) {
      var array = new Uint8Array(string.length);
      for (var i = 0, l = string.length; i < l; i++) {
        array[i] = string.charCodeAt(i);
      }
      return array.buffer;
    },
    bytesToString(buffer) {
      return String.fromCharCode.apply(null, new Uint8Array(buffer));
    },

    /**
     * BLE Scan
     *
     *
     *
     *
     *
     *
     *
     *
     *
     */
    onBLEScan2() {
      console.log("onBLEScan");
      cons.elm_ul.ul_bleScanList.textContent = "";
      ble.scan(
        [],
        5,
        function(device) {
          let li = document.createElement("li");
          li.classList.add("list");
          li.setAttribute("id", "scanBleList");
          let html =
            "<b>" +
            device.name +
            "</b>" +
            "<br/>" +
            "RSSI: " +
            device.rssi +
            "&nbsp;|&nbsp;" +
            device.id;
          li.innerHTML = html;
          cons.elm_ul.ul_bleScanList.appendChild(li);
        },
        function(e) {
          window.alert("error: " + e);
        }
      );
    },

    onBLEConnect2() {
      let ID = "6C:05:2B:EA:6B:78";
      let success = function(getID) {
        window.alert("success connect: " + getID);
      };
      subBLEConnect(ID, success);
    },

    onBLEDisConnect2() {
      let ID = "6C:05:2B:EA:6B:78";
      let success = function(getID) {
        window.alert("success di  sconnect: " + getID);
      };
      subBLEDisConnect(ID, success);
    },

    onBLERead2() {
      cons.elm_ul.ul_bleReadList.textContent = "";
      let ID = "6C:05:2B:EA:6B:78";
      let serviceID_1 = cons.UUID.deviceA.service.service1;
      let charaID_1 = cons.UUID.deviceA.chracter.chara1;
      let serviceID_2 = cons.UUID.deviceA.service.service2;
      let charaID_2 = cons.UUID.deviceA.chracter.chara2;
      let serviceID_3 = cons.UUID.deviceA.service.service3;
      let charaID_3 = cons.UUID.deviceA.chracter.chara3;
      let success = {
        template: function(e, prop) {
          let unit8View = new Uint8Array(e);
          let ul_element = cons.elm_ul.ul_bleReadList;

          //console.log("success read: " + prop);
          console.log("read: " + prop + " | " + JSON.stringify(unit8View));
          let li = document.createElement("li");
          let html = "<b>" + prop + "</b>" + "<br/>" + unit8View;
          li.innerHTML = html;
          ul_element.appendChild(li);
        },
        _1: function(e) {
          let prop = "service 1";
          success.template(e, prop);
        },
        _2: function(e) {
          let prop = "service 2";
          success.template(e, prop);
        },
        _3: function(e) {
          let prop = "service 3";
          success.template(e, prop);
        },
      };
      let failed = function() {
        window.alert("書き込みエラー ペリフェラル再接続");
      };
      subBLERead(ID, serviceID_1, charaID_1, success._1, failed);
      subBLERead(ID, serviceID_2, charaID_2, success._2, failed);
      subBLERead(ID, serviceID_3, charaID_3, success._3, failed);
    },

    onBLEWrite2() {
      console.log("onBLEWrite");

      let ID = document.forms.form_bleWrite.input_bleWrite_ID.value;
      let serviceID_1 =
        document.forms.form_bleWrite.input_bleWrite_sUUID1.value;
      let charaID_1 = document.forms.form_bleWrite.input_bleWrite_cUUID1.value;
      let serviceID_2 =
        document.forms.form_bleWrite.input_bleWrite_sUUID2.value;
      let charaID_2 = document.forms.form_bleWrite.input_bleWrite_cUUID2.value;
      let serviceID_3 =
        document.forms.form_bleWrite.input_bleWrite_sUUID3.value;
      let charaID_3 = document.forms.form_bleWrite.input_bleWrite_cUUID3.value;
      let input = [];

      let data_1 = new Uint8Array(1);
      input[0] = document.forms.form_bleWrite.input_bleWrite_write1.value;
      data_1[0] = Number(input[0]);
      console.log(input[0]);
      console.log(Number(input[0]));

      let data_2 = new Uint8Array(3);
      input[1] = document.forms.form_bleWrite.input_bleWrite_write21.value;
      input[2] = document.forms.form_bleWrite.input_bleWrite_write22.value;
      input[3] = document.forms.form_bleWrite.input_bleWrite_write23.value;
      data_2[0] = Number(input[1]);
      data_2[1] = Number(input[2]);
      data_2[2] = Number(input[3]);
      console.log(input[1]);

      let data_3 = new Uint32Array(1);
      input[4] = document.forms.form_bleWrite.input_bleWrite_write3.value;
      data_3[0] = Number(input[4]);
      console.log(input[4]);

      let success = {
        template: function(e, prop) {
          window.alert("write: " + prop);
        },
        _1: function(e) {
          let prop = "service 1";

          success.template(e, prop);
        },
        _2: function(e) {
          let prop = "service 2";
          success.template(e, prop);
        },
        _3: function(e) {
          let prop = "service 3";
          success.template(e, prop);
        },
      };
      let failed = {
        template: function(e, prop) {
          console.log("error: " + e + " | " + prop);
        },
        _1: function(e) {
          let prop = "service 1";
          failed.template(e, prop);
        },
        _2: function(e) {
          let prop = "service 2";
          failed.template(e, prop);
        },
        _3: function(e) {
          let prop = "service 3";
          failed.template(e, prop);
        },
      };
      ble.write(
        ID,
        serviceID_1,
        charaID_1,
        data_1.buffer,
        success._1,
        failed._1
      );
      ble.write(
        ID,
        serviceID_2,
        charaID_2,
        data_2.buffer,
        success._2,
        failed._2
      );
      ble.write(
        ID,
        serviceID_3,
        charaID_3,
        data_3.buffer,
        success._3,
        failed._3
      );
    },

    onBLENotify2() {
      let ID = document.forms.form_bleNotify.input_bleNotify_ID.value;
      let serviceID = document.forms.form_bleNotify.input_bleNotify_sUUID.value;
      let charaID = document.forms.form_bleNotify.input_bleNotify_cUUID.value;
      let success = function(e) {
        let data = new Uint8Array(e);
        console.log("change: " + data[0]);
        window.alert("change: " + data[0]);
      };
      let failed = function() {
        window.alert("error");
      };
      window.alert("BLE Notifiy Start");
      console.log("start Notify");
      ble.startNotification(ID, serviceID, charaID, success, failed);
    },

    /**
     * BLE
     * @param {string} ID 接続するデバイスID
     * @param {function} success 成功時のコールバック関数、引数はID
     */
    subBLEConnect(ID, success) {
      console.log("onBLEConnect");

      ble.connect(
        ID,
        function() {
          console.log("succsess connect");
          success(ID);
        },
        function() {
          console.log("failed connect");
          window.alert("failed connect");
        }
      );
    },

    /**
     * BLE
     * @param {string} ID 接続するデバイスID
     * @param {function} success 成功時のコールバック関数、引数はID
     */
    subBLEDisConnect(ID, success) {
      console.log("onBLEDisConnect");

      ble.disconnect(
        ID,
        function() {
          console.log("succsess disconnect");
          success(ID);
        },
        function() {
          console.log("failed disconnect");
          window.alert("failed disconnect");
        }
      );
    },

    /**
     * BLE
     * @param {string} ID 接続するデバイスID
     * @param {string} serviceID 接続するserviceUUID
     * @param {string} charaID 接続するchractisticUUID
     * @param {function} success 成功時のコールバック関数、引数はID
     */
    subBLERead(ID, serviceID, charaID, success) {
      console.log("onBLERead");

      //let s = success();
      let failed = function() {
        console.log("failed read");
        window.alert("failed read");
      };
      ble.read(ID, serviceID, charaID, success, failed);
    },
    subBLEWrite(ID, serviceID, charaID, success, failed) {
      console.log("onBLEWrite");
    },

    subBLENotify() {
      console.log("onBLENotify");
    },
  },
  components: {
    TopHeader,
  },
};
</script>

<style lang="scss">
#TestBle {
  .danger {
    background-color: red;
  }
}
</style>
