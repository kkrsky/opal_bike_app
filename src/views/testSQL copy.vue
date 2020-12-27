<template>
  <div>
    <h2>Cordova Sqlite Demo</h2>
    <div>
      <v-btn
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
      </v-btn>
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
        @click="showAllRecord"
      >
        Show all record
      </v-btn>
      <v-btn
        id="add-record"
        type="button"
        class="btn btn-lg btn-default"
        @click="addRecord"
      >
        INSERT a new record
      </v-btn>
      <v-btn
        id="add-json-records-after-delay"
        type="button"
        class="btn btn-lg btn-default"
        @click="createTable"
      >
        create Table
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
        id="delete-records"
        type="button"
        class="btn btn-lg btn-default"
        @click="deleteRecords"
      >
        Delete all records
      </v-btn>
    </div>
    <p id="result">{{ resultText }}</p>
    <div>
      <p>db</p>
      <input type="text" v-model="dbName" />
      <p>table</p>
      <input type="text" v-model="tableName" />
      <p>col</p>
      <!-- <input type="text" v-model="id" />
      <input type="text" v-model="idInput" /> -->
      <input type="text" v-model="name" />
      <input type="text" v-model="nameInput" />
      <input type="text" v-model="score" />
      <input type="text" v-model="scoreInput" />
    </div>
  </div>
</template>

<script>
// import TopFooter from "@/components/TopFooter.vue";

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
      // id: "id",
      // idInput: "idInput",
      name: "name",
      nameInput: "nameInput",
      score: "score",
      scoreInput: "scoreInput",
    };
  },
  computed: {},
  methods: {
    initDatabase() {
      this.database = window.sqlitePlugin.openDatabase({
        name: this.dbName + ".db",
        location: "default",
        androidDatabaseProvider: "system",
        // iosDatabaseLocation:'Documents'
      });
      console.log("database", this.database);
      this.database.transaction(function(transaction) {
        console.log("transaction", transaction);
        transaction.executeSql(
          // "CREATE TABLE SampleTable (name,score,tes)"
          "CREATE TABLE " + this.tableName + " (name,score,tes)"
          // "CREATE TABLE SampleTable (" + this.name + ", " + this.score + ")"
        );
      });
    },

    echoTest() {
      window.sqlitePlugin.echoTest(
        function() {
          alert("Echo test OK");
        },
        function(error) {
          alert("Echo test ERROR: " + error.message);
        }
      );
    },

    selfTest() {
      window.sqlitePlugin.selfTest(
        function() {
          alert("Self test OK");
        },
        function(error) {
          alert("Self test ERROR: " + error.message);
        }
      );
    },

    showCount() {
      let that = this;
      this.database.transaction(
        (transaction) => {
          transaction.executeSql(
            // "SELECT count(*) AS recordCount FROM SampleTable",
            "SELECT count(*) AS recordCount FROM " + this.tableName,
            [],
            (ignored, resultSet) => {
              console.log("resultSet", resultSet);
              that.recordCount = Number(resultSet.rows.item(0).recordCount);
              that.resultText =
                "RECORD COUNT: " + resultSet.rows.item(0).recordCount;
            }
          );
        },
        function(error) {
          alert("SELECT count error: " + error.message);
        }
      );
    },
    createTable() {
      let query = "CREATE TABLE " + this.tableName + " (name,score,tes)";
      this.exeSql(query);
      console.log(query);
    },
    exeSql(query) {
      this.database.transaction((tx) => {
        tx.executeSql(query);
      });
    },
    addRecord() {
      let query = "INSERT INTO " + this.tableName + " VALUES (?,?,?)";
      console.log("query", query);
      this.database.transaction(
        (transaction) => {
          // console.log("addRecord", this);
          // transaction.executeSql("INSERT INTO SampleTable VALUES (?,?)", [
          //   "User " + this.nextUser,
          //   this.nextUser,
          // ]);

          transaction.executeSql(
            query,
            // "INSERT INTO SampleTable VALUES (?,?,?)",
            // "INSERT INTO " + this.tableName + " VALUES (?,?)",
            [this.nameInput, this.scoreInput, "hello"]
            // [arr, obj]
          );
        },
        function(error) {
          alert("INSERT error: " + error.message);
        },
        () => {
          alert("INSERT OK");
          this.showCount();
          ++this.nextUser;
        }
      );
    },

    showAllRecord() {
      let that = this;
      this.database.transaction(
        (tx) => {
          tx.executeSql(
            // "SELECT * FROM " + this.tableName,
            "SELECT * FROM " + this.tableName,
            [],
            (ignored, resultSet) => {
              for (let i = 0; i < that.recordCount; i++) {
                console.log("allRecord", resultSet.rows.item(i));
              }
            }
          );
        },
        function(error) {
          alert("SELECT count error: " + error.message);
        }
      );
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

    deleteRecords() {
      this.database.transaction(
        function(transaction) {
          // transaction.executeSql("DELETE FROM SampleTable");
          transaction.executeSql("DELETE FROM " + this.tableName);
          // transaction.executeSql("DELETE FROM SampleTable");
          // transaction.executeSql("DELETE FROM " + this.tableName);
        },
        function(error) {
          alert("DELETE error: " + error.message);
        },
        () => {
          alert("DELETE OK");
          this.showCount();
          ++this.nextUser;
        }
      );
    },
  },
  watch: {},
  beforeCreate() {},
  created() {
    // let db = null;
    // document.addEventListener("deviceready", function() {
    //   console.log("sqlitePlugin", window.sqlitePlugin);

    //   db = window.sqlitePlugin.openDatabase(
    //     {
    //       name: "my.db",
    //       location: "default",
    //     },
    //     function() {
    //       var event = new CustomEvent("opendatabase");
    //       document.dispatchEvent(event);
    //     },
    //     function() {
    //       var event = new CustomEvent("opendatabaseerror");
    //       document.dispatchEvent(event);
    //     }
    //   );
    // });

    // document.addEventListener("opendatabase", openDatabase, false);
    // function openDatabase() {
    //   // DBオープン成功
    //   console.log("DBオープン成功");
    //   document.removeEventListener("opendatabase", openDatabase, false);
    // }

    // document.addEventListener("opendatabaseerror", openDatabaseError, false);
    // function openDatabaseError() {
    //   // DBオープン失敗
    //   console.log("DBオープン失敗");
    //   document.removeEventListener(
    //     "opendatabaseerror",
    //     openDatabaseError,
    //     false
    //   );
    // }

    document.addEventListener("deviceready", () => {
      // Initialize the database after the Cordova is ready.
      this.initDatabase();
    });
  },
  mounted() {},

  components: {},
};
</script>

<style lang="scss"></style>
