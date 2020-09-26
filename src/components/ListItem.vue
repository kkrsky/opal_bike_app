<template>
  <v-container id="itemList">
    <v-row no-gutters v-for="item in listItem" :key="item.id">
      <v-col>{{ item.title }}</v-col>
    </v-row>
    <v-divider></v-divider>
    <!-- <v-row no-gutters v-for="item in listItem" :key="item.id"> -->
    <v-list
      subheader
      no-gutters
      v-for="item in listItem"
      :key="item.id"
      @click="clicked(item)"
    >
      <v-subheader v-if="item.attribute === 'title'">{{
        item.title
      }}</v-subheader>

      <v-list-item v-if="item.attribute !== 'title'">
        <v-list-item-avatar v-if="item.avatar !== 'none'">
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon v-if="item.icon !== 'none'">
          <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'"
            >chat_bubble</v-icon
          >
        </v-list-item-icon>
      </v-list-item>
    </v-list>
    <!-- </v-row> -->
    <v-divider></v-divider>
  </v-container>
</template>

<script>
export default {
  props: {
    listItem: {
      type: Object,
      default: () => {
        [
          {
            id: 1,
            attribute: "title",
            title: "this is TopTitle",
            icon: "info",
            avatar: null,
            goto: "notifications",
            propItems: null,
            addCss: {},
          },
          {
            id: 2,
            attribute: "item",
            title: "item1",
            icon: "settings",
            avatar: "none",
            goto: "topSetting",
            propItems: null,
            addCss: {},
          },
          {
            id: 3,
            attribute: "item",
            title: "item2",
            icon: "settings",
            avatar: null,
            goto: "topSetting",
            propItems: null,
            addCss: {},
          },
        ];
      },
    },
  },
  methodos: {
    clicked(item) {
      if (item.goto === null) {
        //none
      } else if (item.propItems === null) {
        this.$router.push({ name: this.goto });
      } else {
        this.$router.push({ name: this.goto, params: this.propItems });
      }
    },
  },
};
</script>

<style style="sass">
#itemList {
}
</style>
