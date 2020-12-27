let tes = {
  initDatabase() {
    database = window.sqlitePlugin.openDatabase({
      name: "sample.db",
      location: "default",
    });

    database.transaction(function(transaction) {
      transaction.executeSql("CREATE TABLE SampleTable (name, score)");
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
    database.transaction(
      function(transaction) {
        transaction.executeSql(
          "SELECT count(*) AS recordCount FROM SampleTable",
          [],
          function(ignored, resultSet) {
            $("#result").text(
              "RECORD COUNT: " + resultSet.rows.item(0).recordCount
            );
          }
        );
      },
      function(error) {
        alert("SELECT count error: " + error.message);
      }
    );
  },

  addRecord() {
    database.transaction(
      function(transaction) {
        transaction.executeSql("INSERT INTO SampleTable VALUES (?,?)", [
          "User " + nextUser,
          nextUser,
        ]);
      },
      function(error) {
        alert("INSERT error: " + error.message);
      },
      function() {
        alert("INSERT OK");
        showCount();
        ++nextUser;
      }
    );
  },

  addJSONRecordsAfterDelay() {
    function getJSONObjectArray() {
      var COUNT = 100;
      var myArray = [];

      for (var i = 0; i < COUNT; ++i) {
        myArray.push({ name: "User " + nextUser, score: nextUser });
        ++nextUser;
      }

      return myArray;
    }

    function getJSONAfterDelay() {
      var MY_DELAY = 150;

      var d = $.Deferred();

      setTimeout(function() {
        d.resolve(getJSONObjectArray());
      }, MY_DELAY);

      return $.when(d);
    }

    // NOTE: This is similar to the case when an application
    // fetches the data over AJAX to populate the database.
    // IMPORTANT: The application MUST get the data before
    // starting the transaction.
    getJSONAfterDelay().then(function(jsonObjectArray) {
      database.transaction(
        function(transaction) {
          $.each(jsonObjectArray, function(index, recordValue) {
            transaction.executeSql("INSERT INTO SampleTable VALUES (?,?)", [
              recordValue.name,
              recordValue.score,
            ]);
          });
        },
        function(error) {
          alert("ADD records after delay ERROR");
        },
        function() {
          alert("ADD 100 records after delay OK");
          showCount();
        }
      );
    });
  },

  deleteRecords() {
    database.transaction(
      function(transaction) {
        transaction.executeSql("DELETE FROM SampleTable");
      },
      function(error) {
        alert("DELETE error: " + error.message);
      },
      function() {
        alert("DELETE OK");
        showCount();
        ++nextUser;
      }
    );
  },
};
