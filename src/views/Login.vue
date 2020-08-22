<template>
  <v-main id="loginPage">
    <ValidationObserver ref="observer">
      <form class="form">
        <v-container
          ><v-row no-gutters
            ><v-col class="btn-container__flex">
              <icon-btn-transition
                v-bind="backBtn"
              ></icon-btn-transition> </v-col></v-row
        ></v-container>
        <ValidationProvider
          v-slot="{ errors }"
          name="email"
          rules="required|email"
        >
          <v-text-field
            v-model.lazy="email"
            :error-messages="errors"
            label="E-mail"
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
            required
          ></v-text-field>
        </ValidationProvider>
        <v-container>
          <v-row>
            <!-- <v-col>
              <v-btn @click="submit">トップに戻る </v-btn>
            </v-col> -->
            <v-col class="btn-container">
              <v-btn @click="login">ログイン</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </form>
    </ValidationObserver>
  </v-main>
  <!-- <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn :href="source" icon large target="_blank" v-on="on">
                    <v-icon>mdi-code-tags</v-icon>
                  </v-btn>
                </template>
                <span>Source</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field label="Login" name="login" prepend-icon="mdi-account" type="text"></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main> -->
</template>

<script>
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
      email: "",
      password: "",
      showPassword: false,
    };
  },
  computed: {},
  methods: {
    login() {
      this.$refs.observer.validate();
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
  background-color: $title-page-bgcolor;
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
}
</style>
