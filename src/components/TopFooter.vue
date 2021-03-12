<template>
  <v-footer id="topFooter" app class="footer-tab-wrapper">
    <v-container class="footer-tab-container">
      <v-row no-gutters>
        <v-col
          class="footer-tab"
          v-for="footerTab in footerTabList"
          :key="footerTab.id"
        >
          <icon-btn-transition v-bind="footerTab"></icon-btn-transition>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import IconBtnTransition from "../components/IconBtnTransition.vue";
export default {
  data() {
    return {
      footerTabList: [
        // {
        //   id: 1,
        //   title: "home",
        //   icon: "home",
        //   goto: "topHome",
        //   propItems: null,
        //   addCss: {},
        // },
        {
          id: 2,
          title: "history",
          icon: "motorcycle",
          goto: "topBike",
          propItems: null,
          addCss: {},
        },
        {
          id: 3,
          title: "record",
          icon: "fiber_manual_record",
          goto: "topRecord",
          propItems: null,
          addCss: { color: "red" },
        },
        // {
        //   id: 4,
        //   title: "profile",
        //   icon: "perm_identity",
        //   goto: "topProfile",
        //   propItems: null,
        //   addCss: {},
        // },
        {
          id: 5,
          title: "setting",
          icon: "settings",
          goto: "topSetting",
          propItems: null,
          addCss: {},
        },
      ],
    };
  },
  components: {
    IconBtnTransition,
  },
};
</script>

<style lang="scss" scoped>
#topFooter {
  height: $__footer-tab-height;
  padding: 0px;
  .footer-tab-container {
    height: $__footer-tab-height;
    padding: 0px;
  }
  .footer-tab {
    height: $__footer-tab-height;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
