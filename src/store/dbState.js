//https://stackoverflow.com/questions/40165766/returning-promises-from-vuex-actions

let transitionState = {
  namespaced: true,
  state: () => ({
    topDB: null,
    tableList: {}, //{tableA:{length:0,allData:[],...}}
    tableNameList: [],
  }),
  getters: {
    findTableList: (state) => (tableName) => {
      console.log("getter tableName", tableName);
      if (state.tableList[tableName] === undefined) {
        state.tableList[tableName] = {};
      }
      return state.tableList[tableName];
    },
    topDB: (state) => {
      return state.topDB;
    },
  },
  mutations: {
    syncTableState(state, { tableName, tableState, insertData }) {
      if (state.tableList[tableName] === undefined)
        state.tableList[tableName] = {};
      if (tableState === "[updateAll]") {
        state.tableList[tableName] = insertData;
        console.log("update tableList all:", state.tableList[tableName]);
      } else if (tableState === "[deleteTable]") {
        delete state.tableList[tableName];
      } else {
        state.tableList[tableName][tableState] = insertData;
        console.log("update tableList:", state.tableList[tableName]);
      }
    },
    setDB(state, dbData) {
      state.topDB = dbData;
    },

    //

    //setter
    setInitTableList(state, { tableName, insertData }) {
      if (state.tableList[tableName] === undefined) {
        state.tableList[tableName] = insertData;
        console.log("new table created:", tableName);
      } else {
        console.log("exist table:", tableName);
      }
    },
    setTableNameList(state, tableNameList) {
      state.tableNameList = tableNameList;
    },
  },
  actions: {
    //////////////////
    //test
    //////////////////
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
      // console.log("get table", getters[("findTableList", "tableName")]);
      console.log("table list in tes", state.tableList);
      console.log("get table", getters.findTableList("tableName"));
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

    //////////////////
    //utils
    //////////////////

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
    async exeSql({ getters }, { query, successFunc }) {
      console.log("query:", query);
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
    // async syncTableState({ state }, { tableName, tableState, insertData }) {
    //   if (state.tableList[tableName] === undefined)
    //     state.tableList[tableName] = {};
    //   state.tableList[tableName][tableState] = insertData;
    // },
    async createTable(
      { commit, dispatch, getters },
      { tableName, colNameList }
    ) {
      // if (getters.findTableList(tableName) === undefined) {
      //create table
      let query =
        "CREATE TABLE IF NOT EXISTS " +
        tableName +
        " (" +
        colNameList.join(",") +
        ")";
      await dispatch("exeSql", { query });
      return new Promise((resolve, reject) => {
        //create data state
        let insertData = { length: 0, addData: [] };
        commit("setInitTableList", { tableName, insertData });
        resolve(true);
      });

      // else {
      //   console.log("table is exist:", tableName);
      //   return new Promise((resolve, reject) => {
      //     resolve(true);
      //   });
      // }
    },

    //////////////////
    //APIs
    //////////////////
    async getAllTableName({ getters, commit }) {
      return new Promise((resolve, reject) => {
        let query =
          "SELECT name FROM sqlite_master WHERE type='table' ORDER BY NAME;";
        getters.topDB.transaction(
          (tx) => {
            tx.executeSql(query, [], (ignored, results) => {
              let len = results.rows.length;
              let tableNameList = [];
              for (let i = 0; i < len; i++) {
                // console.log("table name:", results.rows.item(i));
                tableNameList.push(results.rows.item(i).name);
              }
              console.log("table name list:", tableNameList);
              commit("setTableNameList", tableNameList);
              resolve(tableNameList);
            });
          },

          (error) => {
            window.alert("sql error: " + error.message);
            reject(error);
          }
        );
      });
    },
    async getTableLength({ state, getters }, { tableName }) {
      let query = "SELECT count(*) AS recordCount FROM " + tableName;
      console.log("getTableLength query:", query);
      getters.topDB.transaction(
        (tx) => {
          tx.executeSql(query, [], (ignored, resultSet) => {
            let findTable = getters.findTableList(tableName);
            findTable["length"] = resultSet.rows.item(0).recordCount;
            let sync = {
              tableName: tableName,
              tableState: "[updateAll]",
              insertData: findTable,
            };
            commit("syncTableState", sync);
          });
        },
        (error) => {
          window.alert("SELECT count error: " + error.message);
        }
      );
    },

    async showTableData({ getters, commit }, { tableName, successFunc }) {
      let query = "SELECT * FROM " + tableName;
      let allData = [];
      return new Promise((resolve, reject) => {
        getters.topDB.transaction(
          (tx) => {
            tx.executeSql(query, [], (ignored, resultSet) => {
              console.log("len", resultSet.rows.length);

              for (let i = 0; i < resultSet.rows.length; i++) {
                let resItem = "";
                try {
                  resItem = JSON.parse(resultSet.rows.item(i));
                } catch {
                  resItem = resultSet.rows.item(i);
                }
                allData.push(resItem);
                // console.log("resItem", resItem);
              }
              // console.log("all recorded data:", allData);

              //parse item
              let parseKeys = Object.keys(allData);
              for (let key of parseKeys) {
                try {
                  allData[key] = JSON.parse(allData[key]);
                } catch {
                  allData[key] = allData[key];
                }
              }

              //sync
              let sync = {
                tableName: tableName,
                tableState: "allData",
                insertData: allData,
              };
              commit("syncTableState", sync);
              resolve(sync);
            });
          },

          (error) => {
            window.alert("sql error: " + error.message);
            reject();
          },
          successFunc()
        );
      });

      // state.tableList[tableName]["allData"] = allData;
    },
    async add(
      { getters, dispatch },
      { tableName, colNameList, addDataArry, successFunc }
    ) {
      //check table is avairable
      await dispatch("createTable", { tableName, colNameList });

      //create add Data format
      //dataObj key=colNameList
      let dataKeys = null;
      let insertArgArry = [];
      let addData = [];
      if (addDataArry.length === undefined) {
        dataKeys = Object.keys(addDataArry);
        for (key of dataKeys) {
          console.log("key", key);
          insertArgArry.push("?");
          addData.push(addDataArry[key]);
        }
      } else {
        let len = addDataArry.length;
        for (let i = 0; i < len; i++) {
          insertArgArry.push("?");
          addData.push(addDataArry[i]);
        }
      }
      console.log("addTableData", tableName, addData);

      if (successFunc === undefined)
        successFunc = () => {
          console.log("[success] add data");
        };

      //add data
      let query =
        "INSERT INTO " +
        tableName +
        " VALUES (" +
        insertArgArry.join(",") +
        ")";
      console.log("query:", query);
      getters.topDB.transaction(
        (tx) => {
          tx.executeSql(query, addData);
        },
        (error) => {
          window.alert("sql error: " + error.message);
        },
        successFunc()
      );
    },
    async deleteTableData({ dispatch, commit }, { tableName }) {
      let query = "DELETE FROM " + tableName;
      await dispatch("exeSql", { query });
      let sync = {
        tableName: tableName,
        tableState: "allData",
        insertData: [],
      };
      commit("syncTableState", sync);
    },
    async deleteTable({ dispatch, commit }, { tableName }) {
      let query = "DROP TABLE " + tableName;
      await dispatch("exeSql", { query });
      let sync = {
        tableName: tableName,
        tableState: "[deleteTable]",
        insertData: [],
      };
      commit("syncTableState", sync);
    },
    // async deleteTable({ dispatch }, { tableName }) {
    //   console.log("delete table", tableName);
    //   let query = "DROP TABLE IF EXISTS " + tableName;
    //   await dispatch("exeSql", { query });
    //   // console.log("delete table", tableName);
    // },
  },
};

export default transitionState;
