<template>
  <div id="signUpPage">
    <top-header :title="title" :right="right"></top-header>
    <v-main>
      <ValidationObserver ref="observer">
        <form class="form">
          <v-container>
            <v-row no-gutters>
              <v-col class="btn-container__flex">
                <icon-btn-transition v-bind="backBtn"></icon-btn-transition>
              </v-col>
            </v-row>
          </v-container>
          <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
            <v-text-field v-model.lazy="email" :error-messages="errors" label="E-mail" required></v-text-field>
          </ValidationProvider>

          <ValidationProvider v-slot="{ errors }" name="password" rules="required|min:8">
            <v-text-field
              v-model="password"
              :error-messages="errors"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              required
            ></v-text-field>
          </ValidationProvider>
          <v-container>
            <v-row>
              <v-col class="btn-container">
                <div class="agreement-container">
                  <div class="agreement-message">
                    <v-row class="kiyaku-container">
                      <v-switch :color="kiyakuAgreeBtnColor"></v-switch>
                      <a href="#">利用規約</a>
                      <span>に同意する</span>
                    </v-row>
                    <v-row class="privacy-policy-container">
                      <a href="#">Privacy Policy</a>
                      <span>を見る</span>
                    </v-row>
                  </div>
                </div>
                <v-btn @click="signup" :block="true">新規登録</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-btn @click="isValifiedEmail">メール有効確認(DEMO)</v-btn>
            </v-row>
          </v-container>
        </form>
      </ValidationObserver>
    </v-main>
  </div>
</template>

<script>
import firebase from "firebase";
import { authService } from "@/services/AuthService.js";
import TopHeader from "@/components/TopHeader.vue";
import { required, email, min, is } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";

extend("required", {
  ...required,
  message: "{_field_}は空白です。",
});

extend("min", {
  ...min,
  message: "{length}文字以下の{_field_} は無効です。 ",
});

extend("email", {
  ...email,
  message: "無効なメールアドレス",
});

export default {
  data() {
    return {
      /**
       * //component data
       */
      title: "メールアドレス登録",
      right: {},
      tes: "this is tes",
      kiyakuAgreeBtnColor: "success",
      /**
       * //methods data
       */
      email: "a@a.com",
      password: "password",
    };
  },
  computed: {},
  methods: {
    async signup() {
      //mailが既に登録されているかチェックする
      let isEmailValidated;
      const emailValidatedProviderList = await firebase
        .auth()
        .fetchSignInMethodsForEmail(this.email);
      if (emailValidatedProviderList === undefined)
        emailValidatedProviderList = ["none"];
      emailValidatedProviderList.some((provider) => {
        if (
          provider ===
          firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
        ) {
          isEmailValidated = true;
          return true;
        } else {
          isEmailValidated = false;
        }
      });
      console.log("isEmailValidated", isEmailValidated);

      if (isEmailValidated) {
        //既に登録されている
        console.log("emailValidatedProviderList", emailValidatedProviderList);
        emailValidatedProviderList.forEach((provider) => {
          if (provider === "none") {
            // window.alert("already registerd at:", provider);
          } else if (provider === "password") {
            window.alert("already registerd");
          } else {
            window.alert("already registerd at:", provider);
          }
        });
      } else {
        //新規ユーザー作成
        // const newUser = await firebase
        //   .auth()
        //   .signInWithEmailAndPassword(this.email, this.password);
        // console.log(newUser);
        const newUser = firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/weak-password") {
              alert("The password is too weak.");
            } else {
              alert(errorMessage);
            }
            console.log(error);
          });
        console.log("newUser", newUser);

        var user = firebase.auth().currentUser;

        user
          .sendEmailVerification()
          .then(function () {
            // Email sent.
            window.alert("send valification email");
          })
          .catch(function (error) {
            // An error happened.
            window.alert("error cannot send valification email");
            console.error(error);
          });
      }
    },
    async isValifiedEmail() {
      // var user = firebase.auth().currentUser;

      // if (user.emailVerified) {
      //   window.alert("valified");
      //   console.log("Email認証完了");
      // } else {
      //   window.alert("not valified");
      //   console.log("Email認証未完了");
      // }
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password);
      //状態チェック
      if (res.user.emailVerified) {
        window.alert("valified");

        console.log("Email認証完了");
      } else {
        window.alert("not valified");

        console.log("Email認証未完了");
      }
    },
  },
  watch: {},
  beforeCreate() {},
  mounted() {},
  components: {
    TopHeader,
    ValidationProvider,
    ValidationObserver,
  },
};
</script>

<style lang="scss">
#signUpPage {
  .v-main {
    position: relative;
    background-color: $title-page-bgcolor;
    .form {
      position: absolute;
      top: 30vh;
      left: 50%;
      width: 80%;
      transform: translate(-50%, -50%);
    }
    .btn-container {
      display: inline;
      text-align: center;
    }
    .btn-container__flex {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .v-messages__message {
      font-size: 0.7rem;
    }

    .privacy-policy-container {
      display: flex;
      justify-content: center;
      margin: 0px auto 3vh auto;
    }

    .kiyaku-container {
      display: flex;
      justify-content: center;

      > a,
      span {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
