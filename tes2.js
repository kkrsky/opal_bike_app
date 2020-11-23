/**
 * BLE Scan
 * 
 */
function onBLEScan() {
  console.log("onBLEScan");
  cons.elm_ul.ul_bleScanList.textContent = "";
  ble.scan(
      [],
      5,
      function (device) {
          let li = document.createElement("li");
          li.classList.add("list");
          li.setAttribute("id", "scanBleList");
          let html =
              "<b>" + device.name + "</b>" + "<br/>" +
              "RSSI: " + device.rssi + "&nbsp;|&nbsp;" + device.id;
          li.innerHTML = html;
          cons.elm_ul.ul_bleScanList.appendChild(li);

      },
      function (e) {
          window.alert("error: " + e);
      }
  )
}


function onBLEConnect() {
  let ID = "6C:05:2B:EA:6B:78";
  let success = function (getID) {
      window.alert("success connect: " + getID);
  }
  subBLEConnect(ID, success)
}

function onBLEDisConnect() {
  let ID = "6C:05:2B:EA:6B:78";
  let success = function (getID) {
      window.alert("success disconnect: " + getID);
  }
  subBLEDisConnect(ID, success)
}

function onBLERead() {
  cons.elm_ul.ul_bleReadList.textContent = "";
  let ID = "6C:05:2B:EA:6B:78";
  let serviceID_1 = cons.UUID.deviceA.service.service1;
  let charaID_1 = cons.UUID.deviceA.chracter.chara1;
  let serviceID_2 = cons.UUID.deviceA.service.service2;
  let charaID_2 = cons.UUID.deviceA.chracter.chara2;
  let serviceID_3 = cons.UUID.deviceA.service.service3;
  let charaID_3 = cons.UUID.deviceA.chracter.chara3;
  let success = {
      template: function (e, prop) {
          let unit8View = new Uint8Array(e);
          let ul_element = cons.elm_ul.ul_bleReadList;

          //console.log("success read: " + prop);
          console.log("read: " + prop + " | " + JSON.stringify(unit8View));
          let li = document.createElement("li");
          let html =
              "<b>" + prop + "</b>" + "<br/>" +
              unit8View;
          li.innerHTML = html;
          ul_element.appendChild(li);

      },
      _1: function (e) {
          let prop = "service 1"
          success.template(e, prop);
      },
      _2: function (e) {
          let prop = "service 2"
          success.template(e, prop);
      },
      _3: function (e) {
          let prop = "service 3"
          success.template(e, prop);
      },
  }
  let failed = function () {
      window.alert("書き込みエラー ペリフェラル再接続");
  }
  subBLERead(ID, serviceID_1, charaID_1, success._1, failed);
  subBLERead(ID, serviceID_2, charaID_2, success._2, failed);
  subBLERead(ID, serviceID_3, charaID_3, success._3, failed);

}


function onBLEWrite() {
  console.log("onBLEWrite");

  let ID = document.forms.form_bleWrite.input_bleWrite_ID.value;
  let serviceID_1 = document.forms.form_bleWrite.input_bleWrite_sUUID1.value;
  let charaID_1 = document.forms.form_bleWrite.input_bleWrite_cUUID1.value;
  let serviceID_2 = document.forms.form_bleWrite.input_bleWrite_sUUID2.value;
  let charaID_2 = document.forms.form_bleWrite.input_bleWrite_cUUID2.value;
  let serviceID_3 = document.forms.form_bleWrite.input_bleWrite_sUUID3.value;
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
      template: function (e, prop) {
          window.alert("write: " + prop);
      },
      _1: function (e) {
          let prop = "service 1"

          success.template(e, prop);
      },
      _2: function (e) {
          let prop = "service 2"
          success.template(e, prop);
      },
      _3: function (e) {
          let prop = "service 3"
          success.template(e, prop);
      },
  }
  let failed = {
      template: function (e, prop) {
          console.log("error: " + e + " | " + prop);
      },
      _1: function (e) {
          let prop = "service 1"
          failed.template(e, prop);
      },
      _2: function (e) {
          let prop = "service 2"
          failed.template(e, prop);
      },
      _3: function (e) {
          let prop = "service 3"
          failed.template(e, prop);
      },
  }
  ble.write(ID, serviceID_1, charaID_1, data_1.buffer, success._1, failed._1);
  ble.write(ID, serviceID_2, charaID_2, data_2.buffer, success._2, failed._2);
  ble.write(ID, serviceID_3, charaID_3, data_3.buffer, success._3, failed._3);



}

function onBLENotify() {
  let ID = document.forms.form_bleNotify.input_bleNotify_ID.value;
  let serviceID = document.forms.form_bleNotify.input_bleNotify_sUUID.value;
  let charaID = document.forms.form_bleNotify.input_bleNotify_cUUID.value;
  let success = function (e) {
      let data = new Uint8Array(e);
      console.log("change: " + data[0]);
      window.alert("change: " + data[0]);
  }
  let failed = function () {
      window.alert("error");
  }
  window.alert("BLE Notifiy Start");
  console.log("start Notify");
  ble.startNotification(ID, serviceID, charaID, success, failed);
}


/**
* BLE
* @param {string} ID 接続するデバイスID
* @param {function} success 成功時のコールバック関数、引数はID
*/
function subBLEConnect(ID, success) {
  console.log("onBLEConnect");

  ble.connect(
      ID,
      function () {
          console.log("succsess connect");
          success(ID);
      },
      function () {
          console.log("failed connect");
          window.alert("failed connect");
      }
  );

}


/**
* BLE
* @param {string} ID 接続するデバイスID
* @param {function} success 成功時のコールバック関数、引数はID
*/
function subBLEDisConnect(ID, success) {
  console.log("onBLEDisConnect");

  ble.disconnect(
      ID,
      function () {
          console.log("succsess disconnect");
          success(ID);
      },
      function () {
          console.log("failed disconnect");
          window.alert("failed disconnect");
      }
  );

}

/**
* BLE
* @param {string} ID 接続するデバイスID
* @param {string} serviceID 接続するserviceUUID
* @param {string} charaID 接続するchractisticUUID
* @param {function} success 成功時のコールバック関数、引数はID
*/
function subBLERead(ID, serviceID, charaID, success) {
  console.log("onBLERead");

  //let s = success();
  let failed = function () {
      console.log("failed read");
      window.alert("failed read");
  }
  ble.read(ID, serviceID, charaID, success, failed);
}
function subBLEWrite(ID, serviceID, charaID, success, failed) {
  console.log("onBLEWrite");
}


function subBLENotify() {
  console.log("onBLENotify");
}