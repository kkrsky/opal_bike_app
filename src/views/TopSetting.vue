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
      <v-container class="my-bike-container__top">
        <v-row
          no-gutters
          class="my-bike-container__row"
          v-for="info in myBikeInfo"
          :key="info.id"
        >
          <v-col class="my-bike-container">
            <div class="title">{{ info.title }}</div>
          </v-col>
        </v-row>
      </v-container>
      <list-item></list-item>
      <v-container class="user-setting-container__top">
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
      </v-container>
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

      //methods data
      myBikeInfo: [
        {
          id: 1,
          attribute: "title",
          title: "バイク情報",
          icon: "info",
          goto: null,
          propItems: null,
          addCss: {},
        },
        {
          id: 2,
          attribute: "item",
          title: "バイク情報",
          icon: "info",
          goto: null,
          propItems: null,
          addCss: {},
        },
      ],
    };
  },
  computed: {},
  methods: {},
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
  .v-main {
    // margin-top: $__header-tab-height;
    // height: calc(100vh - #{$__header-tab-height} - #{$__footer-tab-height});
    height: 100vh;
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
}
</style>
