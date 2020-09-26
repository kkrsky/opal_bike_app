<template>
  <div id="topSetting">
    <top-header
      :title="title"
      :left="leftBtn"
      :right="rightBtnList"
    ></top-header>
    <v-main>
      <v-container id="userIconComponent">
        <v-row no-gutters class="use-icon-container__row">
          <v-col class="use-icon-container">
            <v-icon class="material-icons">account_circle</v-icon>
          </v-col>
        </v-row>
        <v-row no-gutters class="use-info-container__row">
          <v-col class="use-info-container">
            <p class="user-name">test taro</p>
            <p class="user-status">ステータス:something</p>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <list-item :listItems="myBikeItems"></list-item>
        <div class="mt-5"></div>
        <list-item :listItems="userSettingItems"></list-item>
        <div class="mt-5"></div>
        <list-item :listItems="otherSettingItems"></list-item>
      </v-container>
      <div class="btn-logout-container">
        <v-btn class="btn-logout" outlined color="red" @click="logout"
          >ログアウト</v-btn
        >
      </div>

      <!-- <v-container class="user-setting-container__top">
        <v-row no-gutters class="user-setting-container__row">
          <v-col class="user-setting-container">
            <div class="title">title</div>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="other-container__top">
        <v-row no-gutters class="other-container__row">
          <v-col class="other-container">
            <div class="title">title</div>
          </v-col>
        </v-row>
      </v-container> -->
    </v-main>
    <top-footer></top-footer>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import TopFooter from "@/components/TopFooter.vue";
import ListItem from "@/components/ListItem.vue";
export default {
  data() {
    return {
      //component data
      title: "setting",
      rightBtnList: null,
      leftBtn: null,
      myBikeItems: [
        {
          //(*1):attribute=titleの時は無効
          id: 1,
          attribute: "title", //リストの属性
          title: "バイク情報", //表示するタイトル
          iconRight: null, //(*1)
          iconLeft: null, //(*1)
          pictureLeftSrc: null, //(*1) 左側にアイコン画像
          goto: null, //(*1)遷移先のページ(routerを使う場合はname,クリック時に実行する関数でも可能)
          propItems: null, //(*1) クリックした時に次のcomponentまたは関数に渡すアイテム(未実装)
          addCss: {}, //固有リストにCSSを適応
          active: false, //(*1) クリック時にactiveになる(未実装)
          subItems: null, //(*1) null以外はドロップダウン型のリストになる
        },
        {
          id: 2,
          attribute: "item",
          title: "走行モード変更",
          iconRight: "arrow_forward_ios",
          iconLeft: "flag",
          pictureLeftSrc: null,
          goto: null,
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
        },
        {
          id: 3,
          attribute: "item",
          title: "接続設定",
          iconRight: "arrow_forward_ios",
          iconLeft: "bluetooth",
          pictureLeftSrc: null,
          goto: null,
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
        },
        {
          id: 4,
          attribute: "item",
          title: "バイク情報",
          iconRight: "arrow_forward_ios",
          iconLeft: "info",
          pictureLeftSrc: null,
          goto: null,
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
        },
      ],
      userSettingItems: [
        {
          //(*1):attribute=titleの時は無効
          id: 1,
          attribute: "title", //リストの属性
          title: "ユーザー設定", //表示するタイトル
          iconRight: null, //(*1)
          iconLeft: null, //(*1)
          pictureLeftSrc: null, //(*1) 左側にアイコン画像
          goto: null, //(*1)遷移先のページ(routerを使う場合はname,クリック時に実行する関数でも可能)
          propItems: null, //(*1) クリックした時に次のcomponentまたは関数に渡すアイテム(未実装)
          addCss: {}, //固有リストにCSSを適応
          active: false, //(*1) クリック時にactiveになる(未実装)
          subItems: null, //(*1) null以外はドロップダウン型のリストになる
        },
        {
          id: 2,
          attribute: "item",
          title: "アプリケーション連携",
          iconRight: "arrow_forward_ios",
          iconLeft: "apps",
          pictureLeftSrc: null,
          goto: null,
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
        },
        {
          id: 3,
          attribute: "item",
          title: "パスワードを変更",
          iconRight: "arrow_forward_ios",
          iconLeft: "remove_red_eye",
          pictureLeftSrc: null,
          goto: null,
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
        },
        {
          id: 4,
          attribute: "item",
          title: "メールアドレスを変更",
          iconRight: "arrow_forward_ios",
          iconLeft: "email",
          pictureLeftSrc: null,
          goto: null,
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
        },
        {
          id: 5,
          attribute: "item",
          title: "ヘルプ",
          iconRight: "arrow_forward_ios",
          iconLeft: "help",
          pictureLeftSrc: null,
          goto: null,
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
        },
      ],
      otherSettingItems: [
        {
          //(*1):attribute=titleの時は無効
          id: 1,
          attribute: "title", //リストの属性
          title: "その他設定", //表示するタイトル
          iconRight: null, //(*1)
          iconLeft: null, //(*1)
          pictureLeftSrc: null, //(*1) 左側にアイコン画像
          goto: null, //(*1)遷移先のページ(routerを使う場合はname,クリック時に実行する関数でも可能)
          propItems: null, //(*1) クリックした時に次のcomponentまたは関数に渡すアイテム(未実装)
          addCss: {}, //固有リストにCSSを適応
          active: false, //(*1) クリック時にactiveになる(未実装)
          subItems: null, //(*1) null以外はドロップダウン型のリストになる
        },
        {
          id: 2,
          attribute: "item",
          title: "測定単位",
          iconRight: "arrow_forward_ios",
          iconLeft: "mdi-ruler",
          pictureLeftSrc: null,
          goto: null,
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
        },
        {
          id: 3,
          attribute: "item",
          title: "タイムライン設定",
          iconRight: "arrow_forward_ios",
          iconLeft: "settings",
          pictureLeftSrc: null,
          goto: null,
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
        },
        {
          id: 4,
          attribute: "item",
          title: "プライバシー情報公開設定",
          iconRight: "arrow_forward_ios",
          iconLeft: "privacy_tip",
          pictureLeftSrc: null,
          goto: null,
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
        },
        {
          id: 5,
          attribute: "item",
          title: "プッシュ通知",
          iconRight: "arrow_forward_ios",
          iconLeft: "notifications",
          pictureLeftSrc: null,
          goto: null,
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
        },
        {
          id: 6,
          attribute: "item",
          title: "メール通知",
          iconRight: "arrow_forward_ios",
          iconLeft: "mail",
          pictureLeftSrc: null,
          goto: null,
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
        },
        {
          id: 7,
          attribute: "item",
          title: "GPS使用許可",
          iconRight: "arrow_forward_ios",
          iconLeft: "location_pin",
          pictureLeftSrc: null,
          goto: null,
          propItems: null,
          addCss: {},
          active: false,
          subItems: null,
        },
      ],

      //methods data
    };
  },
  computed: {},
  methods: {
    logout() {
      if (window.confirm("ログアウトしますか？")) {
        this.$router.push({ name: "title" });
      }
    },
  },
  watch: {},
  beforeCreate() {},
  mounted() {},
  components: {
    TopHeader,
    TopFooter,
    ListItem,
  },
};
</script>

<style lang="scss">
#topSetting {
  overflow-y: scroll;

  .v-main {
    margin-top: $__header-tab-height;
    padding: 0 !important;
    height: calc(100vh - #{$__header-tab-height} - #{$__footer-tab-height});
    // height: 100vh;
    #userIconComponent {
      .use-icon-container__row {
        height: 30vw;
        .use-icon-container {
          display: flex;
          justify-content: center;
          align-content: center;
          .v-icon {
            font-size: 30vw;
          }
        }
      }
      .use-info-container__row {
        .use-info-container {
          display: grid;
          justify-content: center;
          align-content: center;
          p {
            margin: 0;
            text-align: center;
          }
          .user-name {
            font-size: 1.2rem;
            font-weight: bold;
          }
        }
      }
    }
  }
  .btn-logout-container {
    width: 100%;
    height: $__footer-tab-height;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn-logout {
      width: 80%;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
