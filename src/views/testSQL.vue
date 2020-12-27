<template>
  <div>
    <h2>Cordova Sqlite Demo</h2>
    <div>
      <!-- <v-btn
        id="echo-test"
        type="button"
        class="btn btn-lg btn-default"
        @click="echoTest"
      >
        Run echo test
      </v-btn>
      <v-btn
        id="self-test"
        type="button"
        class="btn btn-lg btn-default"
        @click="selfTest"
      >
        Run self test
      </v-btn> -->
      <v-btn
        id="show-count"
        type="button"
        class="btn btn-lg btn-default"
        @click="showCount"
      >
        Show record count
      </v-btn>
      <v-btn
        id="show-count"
        type="button"
        class="btn btn-lg btn-default"
        @click="showTableData"
      >
        Show all record
      </v-btn>
      <!-- <v-btn
        id="show-count"
        type="button"
        class="btn btn-lg btn-default"
        @click="showAllRecord2"
      >
        Show all record2222
      </v-btn> -->
      <!-- <v-btn
        id="add-record"
        type="button"
        class="btn btn-lg btn-default"
        @click="addRecord"
      >
        INSERT a new record
      </v-btn> -->
      <!-- <v-btn
        id="add-json-records-after-delay"
        type="button"
        class="btn btn-lg btn-default"
        @click="createTable"
      >
        create Table
      </v-btn> -->
      <v-btn
        id="add-json-records-after-delay"
        type="button"
        class="btn btn-lg btn-default"
        @click="deleteTableData"
      >
        delete select Table Data
      </v-btn>
      <v-btn
        id="add-json-records-after-delay"
        type="button"
        class="btn btn-lg btn-default"
        @click="deleteTable"
      >
        delete select Table
      </v-btn>
      <v-btn
        id="add-json-records-after-delay"
        type="button"
        class="btn btn-lg btn-default"
        @click="deleteAllTable"
      >
        delete All Table
      </v-btn>
      <v-btn
        id="add-json-records-after-delay"
        type="button"
        class="btn btn-lg btn-default"
        @click="getAllTableName"
      >
        get All Table Name
      </v-btn>
      <!-- <v-btn
        id="add-json-records-after-delay"
        type="button"
        class="btn btn-lg btn-default"
        @click="addJSONRecordsAfterDelay"
      >
        INSERT from object after delay
      </v-btn> -->

      <v-btn
        id="add-json-records-after-delay"
        type="button"
        class="btn btn-lg btn-default"
        @click="test"
      >
        test
      </v-btn>
      <v-btn
        id="add-json-records-after-delay"
        type="button"
        class="btn btn-lg btn-default"
        @click="test2"
      >
        test2
      </v-btn>
      <v-btn
        id="add-json-records-after-delay"
        type="button"
        class="btn btn-lg btn-default"
        @click="test3"
      >
        test3
      </v-btn>
      <v-btn
        id="add-json-records-after-delay"
        type="button"
        class="btn btn-lg btn-default"
        @click="testDataInsert"
      >
        test Data Insert
      </v-btn>
      <v-btn
        id="add-json-records-after-delay"
        type="button"
        class="btn btn-lg btn-default"
        @click="testFrequencyInsert"
      >
        test Frequency Insert
      </v-btn>
    </div>
    <p id="result">{{ resultText }}</p>
    <!-- <p>table:{{ tableList[tableObj.tableName.allData] }}</p>
    <p>table:{{ tableList }}</p>
    <p>table2:{{ tableList2 }}</p>
    <p>table3:{{ tableList3 }}</p> -->
    <div>
      <p>-----------------</p>
      <p>table</p>
      <v-select @change="onSelectTableName" :items="tableNameList"></v-select>
      <input type="text" v-model="tableName" />
      <p>-----------------</p>
      <p>col</p>
      <!-- <input type="text" v-model="id" />
      <input type="text" v-model="idInput" /> -->
      <input type="text" v-model="name" />
      <input type="text" v-model="nameInput" />
      <input type="text" v-model="score" />
      <input type="text" v-model="scoreInput" />
      <p>-----------------</p>
    </div>
  </div>
</template>

<script>
// import TopFooter from "@/components/TopFooter.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      /**
       * //component data
       */
      /**
       * //methods data
       */
      database: null,
      nextUser: 101,
      resultText: "res",
      recordCount: 0,
      //test

      dbName: "sample01",
      tableName: "SampleTables",
      tableNameList: ["SampleTables", "testAdd", "testAddFreq"],
      // id: "id",
      // idInput: "idInput",
      name: "name",
      nameInput: "nameInput",
      score: "score",
      scoreInput: "scoreInput",
      tableList3: {},
      tableObj: {
        tableName: "SampleTables",
        colNameList: ["test1"],
        addDataArry: [0],
        // colNameList: ["test1", "test2", "test3"],
        // addDataArry: ["input test1", "input test2", "test"],
        successFunc: () => {
          console.log("[success]");
        },
      },
    };
  },
  computed: {
    ...mapState({
      tableList: (state) => state.dbState.tableList,
    }),
    tableList2() {
      return this.$store.getters[
        ("dbState/getTableList", this.tableObj.tableName)
      ];
    },
    // tableList: () => {
    //   return this.$store.state.dbState.tableList;
    // },
  },
  methods: {
    test3() {
      // this.eventFire("tess");
      this.$store.dispatch("dbState/syncTest").then((res) => {
        console.log("syncTest in func");
      });
      // console.log("tes1", tes1);
      this.$store.dispatch("dbState/syncTest2").then((response) => {
        console.log("syncTest2 in func");
      });
    },
    test2() {
      window.document.addEventListener("tess", () => {
        console.log("tes fired");
      });
      window.document.addEventListener("showAllRecord", () => {
        console.log("showAllRecord fired");
      });
      // this.$store.dispatch("dbState/tes2").then((val1, val2) => {
      //   console.log("after--------2", val1, val2);
      // });
    },
    test() {
      // this.$store.dispatch("dbState/tes").then((val1, val2) => {
      //   console.log("after--------1", val1, val2);
      // });
      // this.tableList3 = this.tableList;
      let res = this.$store.dispatch("dbState/tes");
      console.log("res", res);
      res
        .then((e) => {
          console.log("after then", e);
        })
        .catch((e) => {
          console.log("catch error", e);
        });
      // console.log("tes:", this.$store.dispatch("dbState/tes"));
      // console.log("tableObj", this.tableObj);
      // console.log("tableList", this.tableList);
      // console.log("tableList2", this.tableList2);
      // console.log("tableList", this.tableList[this.tableObj.tableName]);
    },

    eventFire(eventName) {
      console.log("start event fire");

      let event = new CustomEvent(eventName);
      window.document.dispatchEvent(event);
    },
    showCount() {
      this.$store.dispatch("dbState/getTableLength", this.tableObj);
      let len = this.tableList[this.tableObj.tableName]["length"];
      this.recordCount = len;
      this.resultText = "RECORD COUNT: " + len;
    },

    addRecord() {
      let success = () => {
        window.alert("INSERT OK");
      };
      this.tableObj.successFunc = success;
      // console.log("add", this.tableObj);
      this.tableObj.addDataArry[0] += 1;
      this.$store.dispatch("dbState/add", this.tableObj);
      // this.showAllRecord();
      this.tableList3[this.tableObj.tableName]["allData"].push(
        this.tableObj.addDataArry[0]
      );
    },

    showTableData() {
      let success = () => {
        this.eventFire("showAllRecord");
      };
      this.tableObj.successFunc = success;
      this.tableObj.tableName = this.tableName;
      this.$store
        .dispatch("dbState/showTableData", this.tableObj)
        .then((sync) => {
          console.log("addData in sync", sync);
        });
    },

    addJSONRecordsAfterDelay() {
      let getJSONObjectArray = () => {
        var COUNT = 1000 * 1000;
        var myArray = [];

        for (var i = 0; i < COUNT; ++i) {
          myArray.push({ name: "User " + this.nextUser, score: this.nextUser });
          ++this.nextUser;
        }

        return myArray;
      };

      let getJSONAfterDelay = () => {
        var MY_DELAY = 150;

        let promise = new Promise(function(resolve, reject) {
          setTimeout(function() {
            resolve(getJSONObjectArray());
          }, MY_DELAY);
        });
        // var d = $.Deferred();
        // $.when(d);

        return promise;
      };

      // NOTE: This is similar to the case when an application
      // fetches the data over AJAX to populate the this.database.
      // IMPORTANT: The application MUST get the data before
      // starting the transaction.
      getJSONAfterDelay().then((jsonObjectArray) => {
        this.database.transaction(
          (transaction) => {
            jsonObjectArray.forEach((recordValue, index) => {
              transaction.executeSql("INSERT INTO SampleTable VALUES (?,?)", [
                recordValue.name,
                recordValue.score,
              ]);
            });
            // $.each(jsonObjectArray, function(index, recordValue) {
            // });
          },
          function(error) {
            alert("ADD records after delay ERROR");
          },
          () => {
            alert("ADD 100 records after delay OK");
            this.showCount();
          }
        );
      });
    },

    //abstruct
    createTable({ tableName, colNameList }) {
      // let { tableName, colNameList } = createObj;
      if (tableName !== undefined) this.tableObj.tableName = tableName;
      if (colNameList !== undefined) this.tableObj.colNameList = colNameList;
      // if (addDataArry !== undefined) this.tableObj.addDataArry = addDataArry;

      this.$store
        .dispatch("dbState/createTable", this.tableObj)
        .then((e) => {
          console.log("success create table", e);
        })
        .catch((e) => {
          console.log("error", e);
        });
    },
    deleteTableData() {
      this.tableObj.tableName = this.tableName;
      this.$store.dispatch("dbState/deleteTableData", this.tableObj);
    },
    deleteTable() {
      this.tableObj.tableName = this.tableName;
      this.$store.dispatch("dbState/deleteTable", this.tableObj);
    },
    deleteAllTable() {
      this.$store.dispatch("dbState/getAllTableName").then((tableNameList) => {
        tableNameList.forEach((tableName) => {
          if (tableName === "android_metadata") {
            //none
          } else {
            this.$store.dispatch("dbState/deleteTable", { tableName });
          }
        });
      });
    },

    cp(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    onSelectTableName(selectVal) {
      this.tableName = selectVal;
    },
    getAllTableName() {
      this.$store.dispatch("dbState/getAllTableName");
    },

    ////////////////
    //unit test code
    ////////////////

    testFrequencyInsert() {
      //original data
      let addData = {
        id: 0,
        runDate: "Sun Sep 27 2020 18:10:50 GMT+0900 (日本標準時)",
        runTime: 5078, //sec
        runLength: 13.4, //km
        averageVeloccity: 30.9, //km/h
        gpsData: [
          { time: 0, position: [139.7013586, 35.6875364], speed: null },
          {
            time: 1000,
            position: [139.7013586, 35.6874364],
            speed: null,
          },
          {
            time: 2000,
            position: [139.7013586, 35.6872364],
            speed: null,
          },
        ],
      };

      //init insert data
      let keys = Object.keys(addData);
      let insertData = keys.map((key) => {
        return JSON.stringify(addData[key]);
      });

      let numLoop = 100;

      //create table data
      let tableObjCp = this.cp(this.tableObj);
      tableObjCp.tableName = "testAddFreq";
      // tableObjCp.tableName = this.tableName;
      // tableObjCp.colNameList = ["key1"];
      tableObjCp.colNameList = keys;
      // tableObjCp.addDataArry = [0];
      tableObjCp.addDataArry = insertData;

      for (let i = 0; i < numLoop; i++) {
        window.setTimeout(() => {
          tableObjCp.addDataArry[0] = JSON.parse(tableObjCp.addDataArry[0]) + 1;
          this.$store.dispatch("dbState/add", tableObjCp);
        }, 10);
      }
    },

    testDataInsert() {
      let addData = {
        runDate: "Sun Sep 27 2020 18:10:50 GMT+0900 (日本標準時)",
        runTime: 5078, //sec
        runLength: 13.4, //km
        averageVeloccity: 30.9, //km/h
        gpsData: [
          { time: 0, position: [139.7013586, 35.6875364], speed: null },
          {
            time: 1000,
            position: [139.7013586, 35.6874364],
            speed: null,
          },
          {
            time: 2000,
            position: [139.7013586, 35.6872364],
            speed: null,
          },
        ],
      };

      let keys = Object.keys(addData);
      let insertData = keys.map((key) => {
        return JSON.stringify(addData[key]);
      });
      let tableObjCp = this.cp(this.tableObj);
      // tableObjCp.tableName = "testAddFreq";
      tableObjCp.tableName = "testAdd";
      // tableObjCp.tableName = this.tableName;
      tableObjCp.colNameList = keys;
      tableObjCp.addDataArry = insertData;

      this.$store.dispatch("dbState/add", tableObjCp);
    },
    testAddRecord(data) {
      // console.log("data", data);
      let keys = [];
      try {
        keys = Object.keys(data);
        // console.log(keys);
      } catch (e) {
        console.log("error:data should be Object", e);
      }

      let insertData = [];
      for (let key of keys) {
        console.log(key, keys);
        insertData.push(JSON.stringify(data[key]));
      }
      this.tableObj.colNameList = keys;
      this.tableObj.addDataArry = insertData;
      // this.tableObj.addDataArry[0] += 1;

      this.$store.dispatch("dbState/add", this.tableObj);
      // this.showAllRecord();
      // this.tableList3[this.tableObj.tableName]["allData"].push(
      //   this.tableObj.addDataArry[0]
      // );
    },
  },
  watch: {
    tableList(nv, ov) {
      console.log("watch", nv, ov);
    },
    tableList2(nv, ov) {
      console.log("watch2", nv, ov);
    },
  },
  beforeCreate() {},
  created() {},
  mounted() {
    this.$store.dispatch("dbState/initDB");
    // this.$store.dispatch("dbState/createTable", this.tableObj);
  },

  components: {},
};
</script>

<style lang="scss"></style>
