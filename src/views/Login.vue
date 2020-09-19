<template>
  <v-main id="loginPage">
    <ValidationObserver ref="observer">
      <form class="form">
        <v-container>
          <v-row no-gutters>
            <v-col class="btn-container__flex">
              <icon-btn-transition v-bind="backBtn"></icon-btn-transition>
            </v-col>
          </v-row>
        </v-container>
        <ValidationProvider
          v-slot="{ errors }"
          name="email"
          rules="required|email"
        >
          <v-text-field
            v-model.lazy="email"
            :error-messages="errors"
            label="E-mail"
            clearable
            required
          ></v-text-field>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="password"
          rules="required|min:8"
        >
          <v-text-field
            v-model="password"
            :error-messages="errors"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            required
          ></v-text-field>
        </ValidationProvider>
        <v-container>
          <v-row>
            <!-- <v-col>
              <v-btn @click="submit">トップに戻る </v-btn>
            </v-col>-->
            <v-col class="btn-container">
              <!-- <v-btn @click="login">ログイン</v-btn> -->
              <div class="forgot-container">
                パスワードを忘れた方は
                <a href="#">こちら</a>
              </div>
              <!-- <v-btn :to="'topHome'" block>ログイン</v-btn> -->
              <v-btn @click="login" block>ログイン</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </form>
    </ValidationObserver>
  </v-main>
</template>

<script>
import firebase from "firebase";
import IconBtnTransition from "@/components/IconBtnTransition.vue";
import { required, email, min } from "vee-validate/dist/rules";
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
      backBtn: {
        id: 1,
        title: "back",
        icon: "arrow_upward",
        goto: "back",
        propItems: "",
        addCss: { fontSize: "5rem" },
      },
      /**
       * //methods data
       */
      email: "a@a.com",
      password: "password",
      showPassword: false,
    };
  },
  computed: {},
  methods: {
    async login() {
      this.$refs.observer.validate();
      const singInRes = await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch((error) => {
          window.alert(error.message);
        });
      console.log("singInRes", singInRes);
      if (singInRes === undefined) {
        //ログイン失敗
      } else {
        //ログイン成功
        if (window.localStorage.getItem("USER_ID") === null) {
          window.localStorage.setItem("USER_ID", singInRes.user.uid);
        }
        this.$router.push("/");
      }
    },
    clear() {
      this.password = "";
      this.email = "";
      this.$refs.observer.reset();
    },
  },
  watch: {},
  beforeCreate() {},
  mounted() {},
  components: {
    IconBtnTransition,
    ValidationProvider,
    ValidationObserver,
  },
};
</script>

<style lang="scss">
#loginPage {
  position: relative;
  background-color: $__title-page-bgcolor;
  .form {
    position: absolute;
    top: 40%;
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

  .forgot-container {
    margin-bottom: 3vh;
  }
}
</style>
