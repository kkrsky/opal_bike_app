//https://stackoverflow.com/questions/40165766/returning-promises-from-vuex-actions

let transitionState = {
  namespaced: true,
  state: () => ({
    topDB: null,
    tableList: {}, //{tableA:{length:0,allData:[],...}}
  }),
  getters: {
    getTableList: (state) => (tableName) => {
      console.log("getter tableName", tableName);
      return state.tableList[tableName];
    },
    topDB: (state) => {
      return state.topDB;
    },
    getTableList: (state) => (tableName) => {
      return state.tableList[tableName];
    },
  },
  mutations: {
    syncTableState(state, { tableName, tableState, insertData }) {
      if (state.tableList[tableName] === undefined)
        state.tableList[tableName] = {};
      state.tableList[tableName][tableState] = insertData;
      console.log("commit:", state.tableList[tableName][tableState]);
    },
    setDB(state, dbData) {
      state.topDB = dbData;
    },
  },
  actions: {
    async syncTest() {
      console.log("start syncTest");
      window.setTimeout(() => {
        console.log("start syncTest 5sec");

        return "syncTest";
      }, 5000);
    },
    syncTest2() {
      console.log("start syncTest2");

      return new Promise((resolve, reject) => {
        window.setTimeout(() => {
          console.log("start syncTest2 5sec");
          resolve("syncTest2");
        }, 5000);
      });
    },
    async tes({ state, getters }, testObj) {
      console.log("item", testObj);
      // console.log("topDB getters", getters.topDB);
      // console.log("get table", getters[("getTableList", "tableName")]);
      console.log("table list in tes", state.tableList);
      console.log("get table", getters.getTableList("tableName"));
      return new Promise((resolve, reject) => {
        window.setTimeout(() => {
          console.log("resolved");
          resolve(false);
        }, 1000);
      });
    },
    async tes2({ state }) {
      console.log("tableList:", state.tableList);
      console.log("before--------2");
      window.setTimeout(() => {
        console.log("in--------2");

        return 0;
      }, 5000);
    },
    async initDB({ commit, getters, dispatch }) {
      window.document.addEventListener(
        "deviceready",
        () => {
          // console.log("start initDB", state.topDB);
          if (getters.topDB === null) {
            dispatch("createTopDB");
            // dispatch("deleteTable", tableObj);
            // dispatch("createTable", tableObj);
            //or localstorageに保存？
          }
        },
        false
      );
    },
    async eventFire({ state }, eventName) {
      let event = new CustomEvent(eventName);
      window.document.dispatchEvent(event);
    },
    async createTopDB({ commit }) {
      console.log("start createTopDB");
      let topDB = window.sqlitePlugin.openDatabase({
        name: "top.db",
        location: "default",
        androidDatabaseProvider: "system",
        // iosDatabaseLocation:'Documents'
      });
      commit("setDB", topDB);
      console.log("[create] db: ", "top.db");
    },
    async exeSql({ getters }, queryObj) {
      let { query, successFunc }=queryObj
      console.log('query:',query)
      getters.topDB.transaction(
        (tx) => {
          tx.executeSql(query);
        },
        (error) => {
          window.alert("sql error: " + error.message);
        },
        successFunc === undefined ? null : successFunc()
      );
    },
    async syncTableState({ state }, { tableName, tableState, insertData }) {
      if (state.tableList[tableName] === undefined)
        state.tableList[tableName] = {};
      state.tableList[tableName][tableState] = insertData;
    },
    async createTable({ state, dispatch }, { tableName, colNameList }) {
      //create table
      return new Promise((resolve,reject)=>{
        let query =
        "CREATE TABLE " + tableName + " (" + colNameList.join(",") + ")";
      await dispatch("exeSql", { query });

      //create data state
      let obj = { length: 0, addData: [] };
      if (state.tableList[tableName] === undefined){
        state.tableList[tableName] = obj;
      console.log("[create] table: ", tableName);
      }
      resolve(true)
      })
    },
    async getTableLength({ state }, { tableName }) {
      let query = "SELECT count(*) AS recordCount FROM " + tableName;
      console.log("getTableLength query:", query);
      state.topDB.transaction(
        (tx) => {
          tx.executeSql(query, [], (ignored, resultSet) => {
            if (state.tableList[tableName] === undefined) {
              state.tableList[tableName] = {};
            }
            state.tableList[tableName]["length"] = resultSet.rows.item(
              0
            ).recordCount;
            console.log("save:", state.tableList[tableName]["length"]);
            console.log("row:", resultSet.rows.item(0).recordCount);
          });
        },
        (error) => {
          window.alert("SELECT count error: " + error.message);
        }
      );
    },
    async getTableAllData({ state, dispatch }, { tableName, successFunc }) {
      let query = "SELECT * FROM " + tableName;
      await dispatch("getTableLength", { tableName });
      console.log("length:", state.tableList[tableName]["length"]);
      let recordCount = state.tableList[tableName]["length"];
      let allData = [];

      state.topDB.transaction(
        (tx) => {
          tx.executeSql(query, [], (ignored, resultSet) => {
            for (let i = 0; i < recordCount; i++) {
              let resItem = resultSet.rows.item(i);
              console.log("allRecord", resItem);
              allData.push(resItem);
            }

            let sync = {
              tableName: tableName,
              tableState: "allData",
              insertData: allData,
            };
            dispatch("syncTableState", sync);
          });
        },

        (error) => {
          window.alert("sql error: " + error.message);
        },
        successFunc()
      );
      // state.tableList[tableName]["allData"] = allData;
    },
    async getTableAllData2(
      { state, dispatch, commit },
      { tableName, successFunc }
    ) {
      let query = "SELECT * FROM " + tableName;
      await dispatch("getTableLength", { tableName });
      console.log("length:", state.tableList[tableName]["length"]);
      let recordCount = state.tableList[tableName]["length"];
      let allData = [];

      state.topDB.transaction(
        (tx) => {
          tx.executeSql(query, [], (ignored, resultSet) => {
            for (let i = 0; i < recordCount; i++) {
              let resItem = resultSet.rows.item(i);
              console.log("allRecord", resItem);
              allData.push(resItem);
            }

            let sync = {
              tableName: tableName,
              tableState: "allData",
              insertData: allData,
            };
            commit("syncTableState", sync);
            // dispatch("syncTableState", sync);
          });
        },

        (error) => {
          window.alert("sql error: " + error.message);
        },
        successFunc()
      );
      // state.tableList[tableName]["allData"] = allData;
    },
    async addTableData(
      { state, dispatch },
      { tableName, addDataObj, successFunc }
    ) {
      //dataObj key=colNameList
      let dataKeys = null;
      let insertArgArry = [];
      let addData = [];
      if (addDataObj.length === undefined) {
        dataKeys = Object.keys(addDataObj);
        for (key of dataKeys) {
          console.log("key", key);
          insertArgArry.push("?");
          addData.push(addDataObj[key]);
        }
      } else {
        let len = addDataObj.length;
        for (let i = 0; i < len; i++) {
          insertArgArry.push("?");
          addData.push(addDataObj[i]);
        }
      }
      console.log("addTableData", tableName, addData);

      if (successFunc === undefined)
        successFunc = () => {
          console.log("[success] add data");
        };

      let query =
        "INSERT INTO " +
        tableName +
        " VALUES (" +
        insertArgArry.join(",") +
        ")";
      // dispatch("exeSql", query);
      // await dispatch("exeSql", { query, successFunc });

      state.topDB.transaction(
        (tx) => {
          console.log("insert query", query);
          tx.executeSql(query, addData);
          dispatch("getTableLength", { tableName });
        },
        (error) => {
          window.alert("sql error: " + error.message);
        },
        successFunc()
      );
    },
    async deleteTableAllData({ dispatch }, { tableName }) {
      let query = "DELETE FROM " + tableName;
      await dispatch("exeSql", { query });
      let sync = {
        tableName: tableName,
        tableState: "allData",
        insertData: [],
      };
      dispatch("syncTableState", sync);
    },
    async deleteTable({ dispatch }, { tableName }) {
      console.log("delete table", tableName);
      let query = "DROP TABLE IF EXISTS " + tableName;
      await dispatch("exeSql", { query });
      // console.log("delete table", tableName);
    },
  },
};

export default transitionState;
