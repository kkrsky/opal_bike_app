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
            description: "this is test picture 1",
            src: "https://picsum.photos/100",
            position: [134, 30],
          },
          {
            //写真にメモを付属できる
            pictureId: 2,
            title: "test2",
            description: "this is test picture 2",
            src: "https://picsum.photos/100",
            position: [134, 30],
          },
          {
            pictureId: 3,
            title: "test3",
            description: "this is test picture 3",
            src: "https://picsum.photos/100",
            position: [134, 30],
          },
          {
            pictureId: 4,
            title: "test4",
            description: "this is test picture 4",
            src: "https://picsum.photos/100",
            position: [134, 30],
          },
          {
            pictureId: 5,
            title: "test5",
            description: "this is test picture 5",
            src: "https://picsum.photos/100",
            position: [134, 30],
          },
          {
            pictureId: 6,
            title: "test6",
            description: "this is test picture 6",
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

          console.log(this.savePhotos.length);
          if (this.savePhotos.length <= 0) {
            this.$emit("empty-photo");
          }
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
  // height: $__uploaded-photo-container-height;
  height: 100%;

  display: grid;
  grid-template-rows: 10vh; //calc($__uploaded-photo-container-height - 5vh);
  grid-auto-columns: $photo-square-size;
  column-gap: 0.5vh;
  align-content: center;
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
