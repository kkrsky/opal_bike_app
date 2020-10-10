<template>
  <div id="PhotoCarousel">
    <!-- <div class="test-photo-box">aa</div>
    <div class="test-photo-box">aa</div>
    <div class="test-photo-box">aa</div>
    <div class="test-photo-box">aa</div>
    <div class="test-photo-box">aa</div> -->
    <div v-for="(image, image_i) in savePhotos" :key="image_i">
      <v-img
        class="uploaded-photo"
        :src="image.src"
        @click="doActivity({ index: image_i, data: image })"
      ></v-img>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShowDetail: false,
    isDeletePhoto: false,
    savePhotos: {
      type: Array,
      default() {
        return [
          {
            //写真にメモを付属できる
            pictureId: 1,
            title: "test1",
            description: "this is test picture",
            src: "https://picsum.photos/400",
            position: [134, 30],
          },
          {
            //写真にメモを付属できる
            pictureId: 2,
            title: "test2",
            description: "this is test picture",
            src: "https://picsum.photos/100",
            position: [134, 30],
          },
          {
            //写真にメモを付属できる
            pictureId: 3,
            title: "test2",
            description: "this is test picture",
            src: "https://picsum.photos/100",
            position: [134, 30],
          },
        ];
      },
    },
  },
  methods: {
    doActivity(obj) {
      if (this.isShowDetail || this.isShowDetail === "") {
        window.alert(obj.data.description);
      }
      if (this.isDeletePhoto || this.isDeletePhoto === "") {
        if (window.confirm("削除しますか？")) {
          this.savePhotos.splice(obj.index, 1);
        }
      }
    },
  },
};
</script>

<style lang="scss">
#PhotoCarousel {
  $photo-square-size: 10vh;

  width: 100%;
  height: $__uploaded-photo-container-height;

  display: grid;
  grid-template-rows: $__uploaded-photo-container-height - 5;
  grid-auto-columns: $photo-square-size;
  column-gap: 1vh;
  align-items: center;
  overflow-x: scroll;
  * {
    grid-row: 1;
  }
  &::-webkit-scrollbar {
    /* Chrome, Safari 対応 */
    display: none;
  }

  //   .test-photo-box {
  //     width: $photo-square-size;
  //     height: $photo-square-size;
  //     background-color: #fcc;
  //   }
  .uploaded-photo {
    width: $photo-square-size;
    height: $photo-square-size;
  }
}
</style>