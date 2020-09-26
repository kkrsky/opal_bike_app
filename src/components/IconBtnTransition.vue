<template>
  <!-- ボタン遷移用（アイコン）のコンポーネント -->
  <div id="iconBtnTransition" class="btn" @click="gotoPage()">
    <v-icon class="material-icons icon-info" :style="addCss">{{ icon }}</v-icon>
  </div>
  <!-- <v-btn icon :ripple="false" class="btn" :disabled="true">
    <v-icon class="material-icons icon-info" :style="addCss">{{ icon }}</v-icon>
  </v-btn> -->
</template>

<script>
/**
 * 特記
 * goto:'back'の場合は１つ戻る処理を行う
 */
export default {
  props: {
    id: Number,
    title: String,
    icon: String,
    goto: [String, Function],
    propItems: [Object, String],
    addCss: Object,
  },
  data() {
    return {};
  },

  methods: {
    gotoPage() {
      // console.log(typeof this.goto);
      if (typeof this.goto === "function") {
        this.goto();
      } else if (this.goto.toLowerCase() === "back" && !this.clickFunction) {
        this.$router.go(-1);

        // } else if (this.clickFunction) {
        //   this.clickFunction();
      } else if (item.propItems === null) {
        this.$router.push({ name: this.goto });
      } else {
        this.$router.push({ name: this.goto, params: this.propItems });
      }
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
#iconBtnTransition {
  .icon-info {
    font-size: $__icon-size__square;
  }
}
</style>
