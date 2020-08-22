<template>
  <div>
    <top-header v-bind="tes"></top-header>
    <p>this is home</p>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
export default {
  data() {
    return {
      tes: {
        id: 1,
        title: "back",
        icon: "arrow_back_ios",
        goto: "back",
        propItems: {},
        addCss: {},
      },
    };
  },
  components: {
    TopHeader,
  },
};
</script>

<style>
</style>