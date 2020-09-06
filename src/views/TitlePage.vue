<template>
  <v-main id="titlePage" class="titlepage-container">
    <div class="title-image-container">
      <v-img src="../assets/logo-demo-v1.png" alt />
      <!-- <div class="title-image-description">this is img</div> -->
    </div>

    <v-container class="title-btn-container">
      <v-row no-gutters>
        <v-col :cols="12">
          <v-btn @click="tes1">Googleで新規登録</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col :cols="12">
          <v-btn :to="'signUp'">メールアドレスで新規登録</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col :cols="12">
          <v-btn :to="'login'">ログイン</v-btn>
          <!-- <v-btn @click="tes1">ログイン</v-btn> -->
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import TopFooter from "@/components/TopFooter.vue";
import firebase from "firebase";

export default {
  data() {
    return {
      /**
       * //component data
       */
      /**
       * //methods data
       */
    };
  },
  computed: {},
  methods: {
    tes1() {
      console.log("1");
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(function () {
          console.log("2");

          return firebase.auth().getRedirectResult();
        })
        .then(function (result) {
          console.log("3", result);

          // This gives you a Google Access Token.
          // You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        })
        .catch(function (error) {
          // Handle Errors here.
          console.log("4", error);

          var errorCode = error.code;
          var errorMessage = error.message;
        });
    },
  },
  watch: {},
  beforeCreate() {},
  mounted() {
    // window.document.addEventListener("deviceready", () => {
    //   var provider = new firebase.auth.GoogleAuthProvider();
    //   firebase
    //     .auth()
    //     .signInWithRedirect(provider)
    //     .then(function() {
    //       return firebase.auth().getRedirectResult();
    //     })
    //     .then(function(result) {
    //       // This gives you a Google Access Token.
    //       // You can use it to access the Google API.
    //       var token = result.credential.accessToken;
    //       // The signed-in user info.
    //       var user = result.user;
    //       // ...
    //     })
    //     .catch(function(error) {
    //       // Handle Errors here.
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //     });
    // });
  },

  components: {
    TopFooter,
  },
};
</script>

<style lang="scss">
#titlePage {
  $btn-height: 6vh;

  position: relative;
  background-image: url("../assets/titlepage-background-v2.png");
  background-size: 100%;
  background-color: $title-page-bgcolor;

  .title-btn-container {
    position: absolute;
    text-align: center;
    // display: flex;
    top: 60vh;
  }
  .v-btn {
    width: 100%;
    height: $btn-height;
    margin: 1vh 0px;
    text-transform: none;
  }

  .v-image {
    height: 50vh;
  }
  .v-image__image--cover {
    background-size: 50%;
  }

  .row {
    display: inline;
  }
}
</style>
